import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode'

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

// Code

function createBarcode(value) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

  JsBarcode(svg, value, {
    format: 'CODE128',
    displayValue: false,
    margin: 0,
    height: 120,
  })

  svg.removeAttribute('width')
  svg.removeAttribute('height')

  return new XMLSerializer().serializeToString(svg)
}

async function createQrCode(value) {
  return QRCode.toDataURL(value, {
    width: 1000,
    margin: 0,
    errorCorrectionLevel: 'M',
  })
}

// Paper

function getPaperSettings(profile) {
  const width = Number(profile.paper.width)
  const height = Number(profile.paper.height)
  const orientation = profile.paper.orientation === 'landscape' ? 'landscape' : 'portrait'
  const unit = profile.paper.unit === 'in' ? 'in' : 'mm'

  return {
    width,
    height,
    unit,
    orientation,
    pageWidth: orientation === 'portrait' ? width : height,
    pageHeight: orientation === 'portrait' ? height : width,
  }
}

function createPrintWindow() {
  return window.open('', '_blank', 'width=900,height=700')
}

function getAutoPrintScript() {
  return `
    <script>
      window.addEventListener('load', function () {
        setTimeout(function () {
          window.focus()
          window.print()
        }, 200)
      })

      window.addEventListener('afterprint', function () {
        window.close()
      })
    </script>
  `
}

// Generic print

export async function printGenericLabel({ value, codeType }) {
  if (!value) {
    return
  }

  const printWindow = createPrintWindow()

  if (!printWindow) {
    console.error('Could not open print window.')
    return
  }

  let codeMarkup

  if (codeType === 'barcode') {
    codeMarkup = createBarcode(value)
  } else {
    const qrDataUrl = await createQrCode(value)
    codeMarkup = `<img src="${qrDataUrl}" alt="" />`
  }

  const safeValue = escapeHtml(value)

  printWindow.document.open()

  printWindow.document.write(`
    <!doctype html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Print label</title>

        <style>
          @page {
            margin: 0;
          }

          * {
            box-sizing: border-box;
          }

          html,
          body {
            margin: 0;
            padding: 0;

            background: #fff;
          }

          body {
            font-family:
              Arial,
              Helvetica,
              sans-serif;
          }

          .label {
            width: 100%;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;

            gap: 14px;

            padding: 18px;

            background: #fff;
          }

          .label-text {
            width: 100%;

            color: #000;

            font-size: 20px;
            font-weight: 700;
            line-height: 1.15;

            text-align: center;
            overflow-wrap: anywhere;
          }

          .label-code {
            width: 100%;

            display: flex;
            align-items: center;
            justify-content: center;
          }

          .label-code svg {
            display: block;

            width: 100%;
            max-width: 520px;
            height: auto;
          }

          .label-code img {
            display: block;

            width: min(100%, 320px);
            height: auto;

            object-fit: contain;
          }

          @media print {
            .label {
              break-inside: avoid;
              page-break-inside: avoid;
            }
          }
        </style>
      </head>

      <body>
        <main class="label">
          <div class="label-text">
            ${safeValue}
          </div>

          <div class="label-code">
            ${codeMarkup}
          </div>
        </main>

        ${getAutoPrintScript()}
      </body>
    </html>
  `)

  printWindow.document.close()
}

// Profile print

export async function printLabel({ value, codeType, profile }) {
  if (!value || !profile) {
    return
  }

  const printWindow = createPrintWindow()

  if (!printWindow) {
    console.error('Could not open print window.')
    return
  }

  const layout = profile.layout?.[codeType]

  if (!layout) {
    printWindow.close()
    console.error(`No ${codeType} layout found for this profile.`)
    return
  }

  const paper = getPaperSettings(profile)

  if (
    !Number.isFinite(paper.width) ||
    !Number.isFinite(paper.height) ||
    paper.width <= 0 ||
    paper.height <= 0
  ) {
    printWindow.close()
    console.error('Invalid paper dimensions.')
    return
  }

  let codeMarkup

  if (codeType === 'barcode') {
    codeMarkup = createBarcode(value)
  } else {
    const qrDataUrl = await createQrCode(value)
    codeMarkup = `<img src="${qrDataUrl}" alt="" />`
  }

  const safeValue = escapeHtml(value)

  printWindow.document.open()

  printWindow.document.write(`
    <!doctype html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Print label</title>

        <style>
          @page {
            size: ${paper.pageWidth}${paper.unit} ${paper.pageHeight}${paper.unit};
            margin: 0;
          }

          * {
            box-sizing: border-box;
          }

          html,
          body {
            margin: 0;
            padding: 0;

            background: #fff;
          }

          body {
            font-family:
              Arial,
              Helvetica,
              sans-serif;
          }

          .label {
            position: relative;

            width: ${paper.pageWidth}${paper.unit};
            height: ${paper.pageHeight}${paper.unit};

            margin: 0;
            padding: 0;

            overflow: hidden;

            background: #fff;
          }

          .label-text {
            position: absolute;

            left: ${layout.text.x}%;
            top: ${layout.text.y}%;

            width: ${layout.text.width}%;
            height: ${layout.text.height}%;

            display: flex;
            align-items: center;
            justify-content: center;

            margin: 0;
            padding: 0;

            overflow: hidden;

            color: #000;

            font-size: clamp(10px, 5vw, 32px);
            font-weight: 700;
            line-height: 1;

            text-align: center;
            overflow-wrap: anywhere;
          }

          .label-code {
            position: absolute;

            left: ${layout.code.x}%;
            top: ${layout.code.y}%;

            width: ${layout.code.width}%;
            height: ${layout.code.height}%;

            display: flex;
            align-items: center;
            justify-content: center;

            margin: 0;
            padding: 0;

            overflow: hidden;
          }

          .label-code svg {
            display: block;

            width: 100%;
            height: 100%;

            max-width: 100%;
            max-height: 100%;
          }

          .label-code img {
            display: block;

            width: 100%;
            height: 100%;

            max-width: 100%;
            max-height: 100%;

            object-fit: contain;
          }

          @media print {
            html,
            body {
              width: ${paper.pageWidth}${paper.unit};
              height: ${paper.pageHeight}${paper.unit};

              margin: 0 !important;
              padding: 0 !important;

              overflow: hidden;
            }

            .label {
              width: ${paper.pageWidth}${paper.unit};
              height: ${paper.pageHeight}${paper.unit};

              margin: 0 !important;
              padding: 0 !important;
            }
          }
        </style>
      </head>

      <body>
        <main class="label">
          <div class="label-text">
            ${safeValue}
          </div>

          <div class="label-code">
            ${codeMarkup}
          </div>
        </main>

        ${getAutoPrintScript()}
      </body>
    </html>
  `)

  printWindow.document.close()
}
