<script setup>
import { ref } from 'vue'

const props = defineProps({
  codeType: {
    type: String,
    default: 'barcode',
  },
  generatedValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['generate', 'change-code-type'])

const inputValue = ref('')
const errorMessage = ref('')
const openMenu = ref(null)

const history = ref([])
const favorites = ref([])
const templates = ref([])

function isValidCode128(value) {
  return /^[\x20-\x7E]+$/.test(value)
}

function selectCodeType(type) {
  const value = inputValue.value.trim()

  if (type === 'barcode' && value && !isValidCode128(value)) {
    errorMessage.value = 'This text is not valid for barcode.'
    return
  }

  errorMessage.value = ''
  emit('change-code-type', type)
}

function generateCode() {
  const value = inputValue.value.trim()

  if (!value) {
    errorMessage.value = 'Enter a SKU or text.'
    return
  }

  errorMessage.value = ''

  if (props.codeType === 'barcode' && !isValidCode128(value)) {
    emit('change-code-type', 'qr')
    emit('generate', {
      value,
      type: 'qr',
    })
    return
  }

  emit('generate', {
    value,
    type: props.codeType,
  })
}

function toggleMenu(menu) {
  openMenu.value = openMenu.value === menu ? null : menu
}

function clearHistory() {
  history.value = []

  if (openMenu.value === 'history') {
    openMenu.value = null
  }
}

function createTemplate() {
  // La funcionalidad real se agregará cuando migremos templates.
}
</script>

<template>
  <section class="input-column" aria-labelledby="toolTitle">
    <!-- Intro -->

    <div class="generator-intro">
      <p class="tool-eyebrow">ENTER OR PASTE</p>
      <h1 id="toolTitle">Generate a code</h1>
    </div>

    <!-- Code type -->

    <div class="code-type" role="radiogroup" aria-label="Code type">
      <button
        class="code-type__button"
        :class="{ 'is-active': props.codeType === 'barcode' }"
        type="button"
        role="radio"
        :aria-checked="props.codeType === 'barcode'"
        @click="selectCodeType('barcode')"
      >
        Barcode
      </button>

      <button
        class="code-type__button"
        :class="{ 'is-active': props.codeType === 'qr' }"
        type="button"
        role="radio"
        :aria-checked="props.codeType === 'qr'"
        @click="selectCodeType('qr')"
      >
        QR
      </button>
    </div>

    <!-- Generator form -->

    <form class="sku-form" novalidate @submit.prevent="generateCode">
      <label class="sr-only" for="skuInput">SKU or text</label>

      <div class="sku-row">
        <input
          id="skuInput"
          v-model="inputValue"
          class="tool-field sku-input"
          name="sku"
          type="text"
          maxlength="120"
          autocomplete="off"
          autocapitalize="characters"
          spellcheck="false"
          placeholder="SKU or text"
          required
        />

        <button class="tool-button tool-button--primary generate-button" type="submit">
          Generate
        </button>
      </div>

      <p class="field-message" role="alert">
        {{ errorMessage }}
      </p>
    </form>

    <!-- Quick menus -->

    <section class="quick-menus" aria-label="Saved codes and templates">
      <!-- History -->

      <div class="menu-control">
        <button
          class="menu-trigger"
          type="button"
          :aria-expanded="openMenu === 'history'"
          @click="toggleMenu('history')"
        >
          <span>
            <small>Recent history</small>
            <strong>{{ history.length ? history.length : 'Empty' }}</strong>
          </span>

          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m7 10 5 5 5-5H7Z" />
          </svg>
        </button>

        <div v-if="openMenu === 'history'" class="dropdown-menu">
          <div class="dropdown-list">
            <p v-if="!history.length" class="dropdown-empty">No recent codes</p>
          </div>

          <button v-if="history.length" class="dropdown-footer" type="button" @click="clearHistory">
            Clear history
          </button>
        </div>
      </div>

      <!-- Favorites -->

      <div class="menu-control">
        <button
          class="menu-trigger"
          type="button"
          :aria-expanded="openMenu === 'favorites'"
          @click="toggleMenu('favorites')"
        >
          <span>
            <small>Favorites</small>
            <strong>{{ favorites.length ? favorites.length : 'Empty' }}</strong>
          </span>

          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m7 10 5 5 5-5H7Z" />
          </svg>
        </button>

        <div v-if="openMenu === 'favorites'" class="dropdown-menu">
          <div class="dropdown-list">
            <p v-if="!favorites.length" class="dropdown-empty">No favorites</p>
          </div>
        </div>
      </div>

      <!-- Templates -->

      <div class="menu-control">
        <button
          class="menu-trigger"
          type="button"
          :aria-expanded="openMenu === 'templates'"
          @click="toggleMenu('templates')"
        >
          <span>
            <small>Quick starts</small>
            <strong>{{ templates.length ? templates.length : 'Empty' }}</strong>
          </span>

          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m7 10 5 5 5-5H7Z" />
          </svg>
        </button>

        <div v-if="openMenu === 'templates'" class="dropdown-menu dropdown-menu--right">
          <div class="dropdown-list">
            <p v-if="!templates.length" class="dropdown-empty">No quick starts</p>
          </div>

          <button
            class="dropdown-footer dropdown-footer--primary"
            type="button"
            @click="createTemplate"
          >
            Create template
          </button>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped>
.input-column {
  min-width: 0;
}

/* =========================
   Intro
========================= */

.generator-intro {
  text-align: left;
}

.generator-intro h1 {
  margin: 5px 0 0;

  font-size: clamp(27px, 4vw, 38px);
  letter-spacing: -0.045em;
}

/* =========================
   Code type
========================= */

.code-type {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;

  margin-top: 22px;
  padding: 4px;

  border: 1px solid var(--tool-border);
  border-radius: 14px;

  background: var(--tool-surface-soft);
}

.code-type__button {
  min-height: 44px;

  border: 0;
  border-radius: 10px;

  background: transparent;
  color: var(--tool-text-muted);

  font: inherit;
  font-size: 13px;
  font-weight: 700;

  cursor: pointer;
}

.code-type__button.is-active {
  background: var(--tool-surface);
  color: var(--tool-primary);

  box-shadow: var(--tool-shadow-sm);
}

/* =========================
   Form
========================= */

.sku-form {
  margin-top: 14px;
}

.sku-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 9px;
}

.sku-input {
  text-transform: none;
}

.generate-button {
  min-width: 126px;
}

.field-message {
  min-height: 19px;
  margin: 7px 2px 0;

  color: var(--tool-danger);

  font-size: 11px;
}

/* =========================
   Quick menus
========================= */

.quick-menus {
  position: relative;
  z-index: 20;

  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 4px;

  margin-top: 14px;
}

.menu-control {
  position: relative;
}

.menu-trigger {
  width: 100%;
  min-height: 65px;

  padding: 10px 12px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid var(--tool-border);
  border-radius: 15px;

  background: var(--tool-surface);
  color: var(--tool-text);

  box-shadow: var(--tool-shadow-sm);

  text-align: left;

  cursor: pointer;
}

.menu-trigger:hover,
.menu-trigger[aria-expanded='true'] {
  border-color: #b9c9e4;
  background: #fbfdff;
}

.menu-trigger span {
  display: grid;
  gap: 4px;

  min-width: 0;
}

.menu-trigger small {
  color: var(--tool-text-muted);

  font-size: 10px;
  font-weight: 600;
}

.menu-trigger strong {
  overflow: hidden;

  font-size: 12px;

  text-overflow: ellipsis;
  white-space: nowrap;
}

.menu-trigger svg {
  flex: 0 0 auto;

  width: 19px;

  fill: var(--tool-text-muted);

  transition: transform 0.16s ease;
}

.menu-trigger[aria-expanded='true'] svg {
  transform: rotate(180deg);
}

/* =========================
   Dropdowns
========================= */

.dropdown-menu {
  position: absolute;

  top: calc(100% + 8px);
  left: 0;

  width: min(350px, calc(100vw - 44px));
  max-height: 360px;

  overflow: auto;

  padding: 8px;

  border: 1px solid var(--tool-border);
  border-radius: 15px;

  background: var(--tool-surface);

  box-shadow: var(--tool-shadow-md);
}

.dropdown-menu--right {
  right: 0;
  left: auto;
}

.dropdown-list {
  display: grid;
  gap: 4px;
}

.dropdown-empty {
  padding: 24px 12px;
  margin: 0;

  color: var(--tool-text-muted);

  font-size: 12px;
  text-align: center;
}

.dropdown-footer {
  width: 100%;

  margin-top: 6px;
  padding: 10px;

  border: 0;
  border-top: 1px solid var(--tool-border);

  background: transparent;
  color: var(--tool-danger);

  font-size: 11px;
  font-weight: 700;

  cursor: pointer;
}

.dropdown-footer--primary {
  color: var(--tool-primary);
}

/* =========================
   Accessibility
========================= */

.sr-only {
  position: absolute;

  width: 1px;
  height: 1px;

  padding: 0;
  margin: -1px;

  overflow: hidden;

  clip: rect(0, 0, 0, 0);

  white-space: nowrap;

  border: 0;
}

/* =========================
   Mobile
========================= */

@media (max-width: 590px) {
  .code-type {
    display: none;
  }

  .generator-intro h1 {
    font-size: 28px;
  }

  .sku-row {
    grid-template-columns: 1fr;
  }

  .generate-button {
    width: 100%;
    min-height: 48px;
  }

  .quick-menus {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 6px;
  }

  .menu-trigger {
    min-height: 58px;
    padding: 8px;
  }

  .menu-trigger small {
    font-size: 8.5px;
  }

  .menu-trigger strong {
    font-size: 10.5px;
  }

  .menu-trigger svg {
    width: 16px;
  }

  .dropdown-menu {
    position: fixed;

    top: 238px;
    right: 10px;
    left: 10px;

    width: auto;
    max-height: 52dvh;
  }
}
</style>
