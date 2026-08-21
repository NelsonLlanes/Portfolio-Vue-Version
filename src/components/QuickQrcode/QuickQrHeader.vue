<script setup>
import { ref } from 'vue'

const downloadModalOpen = ref(false)

function openDownloadModal() {
  downloadModalOpen.value = true
}

function closeDownloadModal() {
  downloadModalOpen.value = false
}
</script>

<template>
  <header class="tool-header">
    <div class="tool-container tool-header__inner">
      <RouterLink class="tool-brand" to="/" aria-label="Return to portfolio">
        <span class="tool-brand__mark">NT</span>

        <span class="tool-brand__copy">
          Quick QR Code
          <small>Nelson Tools</small>
        </span>
      </RouterLink>

      <div class="tool-header__actions">
        <button class="extension-button" type="button" @click="openDownloadModal">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 3v10.17l3.59-3.58L17 11l-5 5-5-5 1.41-1.41L11 13.17V3h1ZM5 19h14v2H5v-2Z"
            />
          </svg>

          <span>Download extension</span>
        </button>

        <RouterLink
          class="tool-header__close"
          to="/"
          aria-label="Close tool and return to portfolio"
          title="Return to portfolio"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4l-6.3 6.31-1.42-1.42L9.17 12l-6.3-6.29 1.42-1.42 6.3 6.31 6.3-6.31 1.41 1.42Z"
            />
          </svg>
        </RouterLink>
      </div>
    </div>
  </header>

  <Teleport to="body">
    <div
      v-if="downloadModalOpen"
      class="extension-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="extensionModalTitle"
    >
      <button
        class="extension-modal__backdrop"
        type="button"
        aria-label="Close extension download"
        @click="closeDownloadModal"
      ></button>

      <section class="extension-modal__card">
        <button
          class="extension-modal__close"
          type="button"
          aria-label="Close"
          @click="closeDownloadModal"
        >
          ×
        </button>

        <div class="extension-modal__icon">
          <span>NT</span>
        </div>

        <div class="extension-modal__content">
          <p class="extension-modal__eyebrow">QUICK QR FOR CHROME</p>

          <h2 id="extensionModalTitle">Download our extension</h2>

          <p>
            Generate and print QR codes and barcodes directly from your browser with your Quick QR
            print profiles.
          </p>
        </div>

        <a class="extension-modal__download" href="/downloads/quick-qr-extension.zip" download>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 3v10.17l3.59-3.58L17 11l-5 5-5-5 1.41-1.41L11 13.17V3h1ZM5 19h14v2H5v-2Z"
            />
          </svg>

          Download extension
        </a>

        <p class="extension-modal__note">Chrome Web Store version coming soon.</p>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.tool-header {
  width: 100%;

  background: var(--tool-surface);

  border-bottom: 1px solid var(--tool-border);
}

.tool-header__inner {
  min-height: 72px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 1rem;
}

/* Brand */

.tool-brand {
  display: flex;
  align-items: center;

  gap: 0.75rem;

  color: var(--tool-text);

  text-decoration: none;
}

.tool-brand__mark {
  width: 42px;
  aspect-ratio: 1;

  display: grid;
  place-items: center;

  background: var(--tool-primary);
  color: #ffffff;

  border-radius: var(--tool-radius);

  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.tool-brand__copy {
  display: flex;
  flex-direction: column;

  font-size: 1rem;
  font-weight: 700;
  line-height: 1.15;
}

.tool-brand__copy small {
  margin-top: 0.2rem;

  color: var(--tool-text-muted);

  font-size: 0.75rem;
  font-weight: 500;
}

/* Actions */

.tool-header__actions {
  display: flex;
  align-items: center;

  gap: 0.65rem;
}

.extension-button {
  min-height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 0.45rem;

  padding: 0 14px;

  border: 1px solid var(--tool-border);
  border-radius: 999px;

  background: var(--tool-surface);
  color: var(--tool-primary);

  font: inherit;
  font-size: 0.78rem;
  font-weight: 700;

  cursor: pointer;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.extension-button:hover {
  background: var(--tool-surface-soft);

  transform: translateY(-1px);
}

.extension-button svg {
  width: 17px;
  height: 17px;

  fill: currentColor;
}

/* Close */

.tool-header__close {
  width: 42px;
  aspect-ratio: 1;

  display: grid;
  place-items: center;

  color: var(--tool-text);

  border: 1px solid var(--tool-border);
  border-radius: 50%;

  transition:
    background 0.2s ease,
    transform 0.2s ease;
}

.tool-header__close:hover {
  background: var(--tool-surface-soft);

  transform: scale(1.05);
}

.tool-header__close svg {
  width: 20px;
  height: 20px;

  fill: currentColor;
}

/* Modal */

.extension-modal {
  position: fixed;
  inset: 0;

  z-index: 2000;

  display: grid;
  place-items: center;

  padding: 20px;
}

.extension-modal__backdrop {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  padding: 0;
  border: 0;

  background: rgba(15, 23, 42, 0.62);

  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);

  cursor: default;
}

.extension-modal__card {
  position: relative;

  z-index: 1;

  width: min(100%, 430px);

  padding: 34px;

  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 22px;

  background: #ffffff;
  color: #111827;

  text-align: center;

  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.3),
    0 8px 24px rgba(0, 0, 0, 0.14);
}

.extension-modal__close {
  position: absolute;

  top: 14px;
  right: 14px;

  width: 34px;
  height: 34px;

  display: grid;
  place-items: center;

  padding: 0;

  border: 0;
  border-radius: 50%;

  background: transparent;
  color: #64748b;

  font-size: 1.4rem;
  line-height: 1;

  cursor: pointer;

  transition:
    background 0.2s ease,
    color 0.2s ease;
}

.extension-modal__close:hover {
  background: #f1f5f9;
  color: #111827;
}

.extension-modal__icon {
  width: 64px;
  aspect-ratio: 1;

  display: grid;
  place-items: center;

  margin: 0 auto 20px;

  border-radius: 18px;

  background: #3274dc;
  color: #ffffff;

  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.05em;

  box-shadow: 0 10px 24px rgba(50, 116, 220, 0.3);
}

.extension-modal__eyebrow {
  margin: 0 0 7px;

  color: #3274dc;

  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.extension-modal__content h2 {
  margin: 0;

  color: #111827;

  font-size: clamp(1.35rem, 4vw, 1.7rem);
}

.extension-modal__content > p:last-child {
  max-width: 340px;

  margin: 12px auto 0;

  color: #64748b;

  font-size: 0.88rem;
  line-height: 1.55;
}

.extension-modal__download {
  width: 100%;
  min-height: 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  margin-top: 24px;
  padding: 0 18px;

  border-radius: 12px;

  background: #3274dc;
  color: #ffffff;

  font-size: 0.85rem;
  font-weight: 700;

  text-decoration: none;

  box-shadow: 0 8px 20px rgba(50, 116, 220, 0.24);

  transition:
    transform 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease;
}

.extension-modal__download:hover {
  background: #2865c5;

  transform: translateY(-1px);

  box-shadow: 0 10px 24px rgba(50, 116, 220, 0.3);
}

.extension-modal__download svg {
  width: 18px;
  height: 18px;

  fill: currentColor;
}

.extension-modal__note {
  margin: 12px 0 0;

  color: #64748b;

  font-size: 0.7rem;
}

/* Mobile */

@media (max-width: 768px) {
  .tool-header__inner {
    min-height: 64px;
  }

  .tool-brand__mark {
    width: 38px;
  }

  .tool-header__close {
    width: 38px;
  }

  .extension-button {
    width: 38px;
    min-height: 38px;

    padding: 0;

    border-radius: 50%;
  }

  .extension-button span {
    display: none;
  }

  .extension-modal {
    padding: 16px;
  }

  .extension-modal__card {
    padding: 30px 22px 24px;
  }

  .extension-modal__icon {
    width: 58px;

    margin-bottom: 17px;

    border-radius: 16px;
  }
}
</style>
