<script setup>
import { ref } from 'vue'

defineProps({
  generatedValue: {
    type: String,
    default: '',
  },

  hasResult: {
    type: Boolean,
    default: false,
  },

  codeType: {
    type: String,
    default: 'qr',
  },

  isFavorite: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'edit',
  'print',
  'toggle-favorite',
  'change-code-type',
  'open-print-profiles',
])

const settingsOpen = ref(false)

function toggleSettings() {
  settingsOpen.value = !settingsOpen.value
}

function closeSettings() {
  settingsOpen.value = false
}

function changeCodeType(type) {
  emit('change-code-type', type)
  closeSettings()
}

function openPrintProfiles() {
  emit('open-print-profiles')
  closeSettings()
}
</script>

<template>
  <div class="result-column">
    <!-- Result Area -->
    <div class="qr-stage">
      <!-- Empty state -->
      <div v-if="!hasResult" class="qr-placeholder" aria-hidden="true">
        <div class="placeholder-grid"></div>

        <span>Your code will appear here</span>
      </div>

      <!-- Generated result -->
      <div v-else class="qr-result">
        <!-- Settings -->
        <div class="code-settings">
          <button
            class="settings-button"
            type="button"
            aria-label="Code settings"
            :aria-expanded="settingsOpen"
            aria-controls="codeSettingsMenu"
            title="Code settings"
            @click="toggleSettings"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M19.14 12.94c.04-.31.06-.63.06-.94s-.02-.63-.07-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.61-.22l-2.39.96a7.2 7.2 0 0 0-1.62-.94L14.38 2.8a.49.49 0 0 0-.49-.4h-3.84a.49.49 0 0 0-.49.4L9.2 5.32c-.58.24-1.12.56-1.62.94L5.19 5.3a.49.49 0 0 0-.61.22L2.66 8.84a.5.5 0 0 0 .12.64l2.03 1.58c-.05.31-.08.65-.08.94 0 .31.03.63.08.94l-2.03 1.58a.5.5 0 0 0-.12.64l1.92 3.32c.12.22.38.31.61.22l2.39-.96c.5.38 1.04.7 1.62.94l.36 2.52c.04.24.24.4.49.4h3.84c.25 0 .45-.16.49-.4l.36-2.52c.58-.24 1.12-.56 1.62-.94l2.39.96c.23.09.49 0 .61-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.02-1.58ZM12 15.5A3.5 3.5 0 1 1 12 8a3.5 3.5 0 0 1 0 7.5Z"
              />
            </svg>
          </button>

          <div v-if="settingsOpen" id="codeSettingsMenu" class="code-settings-menu">
            <div class="settings-section" role="radiogroup" aria-label="Code type">
              <span class="settings-label">Code type</span>

              <button
                type="button"
                role="radio"
                :aria-checked="codeType === 'barcode'"
                :class="{ 'is-active': codeType === 'barcode' }"
                @click="changeCodeType('barcode')"
              >
                Barcode
              </button>

              <button
                type="button"
                role="radio"
                :aria-checked="codeType === 'qr'"
                :class="{ 'is-active': codeType === 'qr' }"
                @click="changeCodeType('qr')"
              >
                QR
              </button>
            </div>

            <button class="settings-link" type="button" @click="openPrintProfiles">
              Print profiles
            </button>
          </div>
        </div>

        <!-- Edit -->
        <button
          class="edit-code"
          type="button"
          aria-label="Edit generated text"
          title="Edit"
          @click="emit('edit')"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25Zm17.71-10.04a1.003 1.003 0 0 0 0-1.42l-2.5-2.5a1.003 1.003 0 0 0-1.42 0l-1.96 1.96 3.75 3.75 2.13-1.79Z"
            />
          </svg>
        </button>

        <!-- Generated value -->
        <p class="generated-value" aria-live="polite">
          {{ generatedValue }}
        </p>

        <!-- Code -->
        <div class="code-canvas" aria-label="Generated code">
          <!--
            Por ahora conservamos estos contenedores.
            Después conectaremos las librerías de QR y Barcode.
          -->

          <div v-show="codeType === 'qr'" id="qrCode" class="qr-code"></div>

          <svg
            v-show="codeType === 'barcode'"
            id="barcodeCode"
            class="barcode-code"
            role="img"
            aria-label="Generated barcode"
          ></svg>
        </div>

        <!-- Favorite -->
        <button
          class="favorite-toggle"
          type="button"
          :aria-pressed="isFavorite"
          @click="emit('toggle-favorite')"
        >
          <span aria-hidden="true">
            {{ isFavorite ? '★' : '☆' }}
          </span>

          <span>
            {{ isFavorite ? 'Saved to favorites' : 'Save to favorites' }}
          </span>
        </button>
      </div>
    </div>

    <!-- Print -->
    <div class="print-actions" aria-label="Print options">
      <button
        class="tool-button tool-button--primary print-main"
        type="button"
        :disabled="!hasResult"
        @click="emit('print')"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M19 8H5a3 3 0 0 0-3 3v5h4v4h12v-4h4v-5a3 3 0 0 0-3-3Zm-3 10H8v-5h8v5Zm3-5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM18 3H6v4h12V3Z"
          />
        </svg>

        <span>Print label</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.result-column {
  min-width: 0;

  display: flex;
  flex-direction: column;
}

/* =========================
   RESULT STAGE
========================= */

.qr-stage {
  position: relative;

  flex: 1;

  min-height: 460px;

  display: grid;
  place-items: center;

  padding: 22px;

  border: 1px solid var(--nt-border);
  border-radius: 20px;

  background: linear-gradient(145deg, #fbfcfe, #f2f6fb);

  overflow: hidden;
}

/* =========================
   EMPTY PLACEHOLDER
========================= */

.qr-placeholder {
  display: grid;
  place-items: center;

  gap: 4px;

  color: #8c98aa;

  font-size: 12px;
}

.placeholder-grid {
  width: 190px;
  aspect-ratio: 1;

  border: 2px dashed #ccd6e4;
  border-radius: 14px;

  background:
    linear-gradient(90deg, transparent 48%, rgba(196, 207, 222, 0.25) 50%, transparent 52%),
    linear-gradient(0deg, transparent 48%, rgba(196, 207, 222, 0.25) 50%, transparent 52%);

  background-size: 38px 38px;
}

/* =========================
   GENERATED RESULT
========================= */

.qr-result {
  position: relative;

  width: 100%;

  display: grid;
  place-items: center;

  gap: 13px;
}

/* =========================
   GENERATED VALUE
========================= */

.generated-value {
  max-width: calc(100% - 104px);

  margin: 0;

  padding: 8px 14px;

  border: 1px solid var(--nt-border);
  border-radius: 999px;

  background: var(--nt-surface);

  color: var(--nt-text);

  font-size: clamp(14px, 2vw, 19px);
  font-weight: 700;
  line-height: 1.25;

  text-align: center;

  overflow-wrap: anywhere;

  box-shadow: var(--nt-shadow-soft);
}

/* =========================
   CODE CANVAS
========================= */

.code-canvas {
  width: 100%;
  min-height: 300px;

  display: grid;
  place-items: center;
}

.qr-code {
  width: min(32vw, 350px);
  aspect-ratio: 1;

  padding: 12px;

  border: 1px solid #edf0f4;
  border-radius: 15px;

  background: #fff;
}

.qr-code img {
  display: none !important;
}

.qr-code canvas {
  display: block !important;

  width: 100% !important;
  height: 100% !important;
}

.barcode-code {
  width: min(100%, 520px);
  height: auto;

  max-height: 280px;

  background: #fff;
}

/* =========================
   SETTINGS
========================= */

.code-settings {
  display: block;

  position: absolute;

  left: 0;
  top: 0;

  z-index: 5;
}

.settings-button,
.edit-code {
  top: 0;

  width: 40px;
  height: 40px;

  padding: 0;

  border: 1px solid var(--nt-border);
  border-radius: 12px;

  background: var(--nt-surface);

  box-shadow: var(--nt-shadow-soft);
}

.settings-button {
  display: grid;
  place-items: center;

  color: var(--nt-primary);

  cursor: pointer;
}

.settings-button svg {
  width: 19px;
  height: 19px;

  fill: currentColor;
}

.code-settings-menu {
  position: absolute;

  left: 0;
  top: 46px;

  min-width: 170px;

  padding: 7px;

  border: 1px solid var(--nt-border);
  border-radius: 13px;

  background: var(--nt-surface);

  box-shadow: var(--nt-shadow);

  z-index: 8;
}

.settings-section {
  display: grid;

  gap: 3px;
}

.settings-label {
  padding: 5px 8px 3px;

  color: var(--nt-muted);

  font-size: 9px;
  font-weight: 700;

  text-transform: uppercase;

  letter-spacing: 0.08em;
}

.code-settings-menu button {
  display: block;

  width: 100%;

  padding: 9px 11px;

  border: 0;
  border-radius: 8px;

  background: transparent;

  color: var(--nt-text);

  font: inherit;
  font-size: 12px;
  font-weight: 700;

  text-align: left;

  cursor: pointer;
}

.code-settings-menu button.is-active {
  background: var(--nt-surface-soft);

  color: var(--nt-primary);
}

.settings-link {
  margin-top: 6px !important;
  padding-top: 10px !important;

  border-top: 1px solid var(--nt-border) !important;

  color: var(--nt-primary) !important;
}

/* =========================
   EDIT
========================= */

.edit-code {
  position: absolute;

  right: 0;

  display: grid;
  place-items: center;

  cursor: pointer;
}

.edit-code svg {
  width: 18px;

  fill: var(--nt-primary);
}

/* =========================
   FAVORITE
========================= */

.favorite-toggle {
  display: flex;
  align-items: center;

  gap: 4px;

  padding: 7px 12px;

  border: 0;
  border-radius: 999px;

  background: transparent;

  color: var(--nt-muted);

  font-size: 11px;
  font-weight: 700;

  cursor: pointer;
}

.favorite-toggle[aria-pressed='true'] {
  color: #d58c00;
}

.favorite-toggle span:first-child {
  font-size: 18px;
}

/* =========================
   PRINT
========================= */

.print-actions {
  width: 100%;

  display: grid;

  gap: 8px;

  margin-top: 14px;
}

.print-main {
  width: 100%;

  min-height: 52px;
  margin-top: 0;
}

.print-main svg {
  width: 20px;

  fill: currentColor;
}

/* =========================
   TABLET
========================= */

@media (max-width: 850px) {
  .result-column {
    min-height: 0;
  }

  .qr-stage {
    min-height: 390px;
  }

  .qr-code {
    width: min(72vw, 345px);
  }
}

/* =========================
   MOBILE
========================= */

@media (max-width: 590px) {
  .result-column {
    scroll-margin-top: 86px;
  }

  .qr-stage {
    min-height: 0;

    padding: 12px;
  }

  .qr-result {
    gap: 9px;
  }

  .generated-value {
    max-width: calc(100% - 96px);

    padding: 6px 10px;

    font-size: 14px;
  }

  .code-canvas {
    min-height: 260px;
  }

  .qr-code {
    width: min(76vw, calc(100dvh - 290px), 320px);

    min-width: 210px;

    padding: 10px;
  }

  .barcode-code {
    width: 100%;

    max-height: 230px;
  }

  .settings-button,
  .edit-code {
    top: 0;

    width: 38px;
    height: 38px;
  }

  .settings-button svg {
    width: 18px;
    height: 18px;
  }

  .code-settings-menu {
    top: 44px;
  }

  .favorite-toggle {
    padding: 5px 10px;
  }

  .print-main {
    min-height: 50px;
  }
}
</style>
