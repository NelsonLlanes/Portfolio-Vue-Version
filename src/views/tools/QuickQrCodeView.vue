<script setup>
import { ref } from 'vue'

import GeneratorSection from '@/components/QuickQrcode/GeneratorSection.vue'
import printProfilesModal from '@/components/QuickQrcode/printProfilesModal.vue'
import { printGenericLabel, printLabel } from '@/components/QuickQrcode/Printlabel'
import QuickQrHeader from '@/components/QuickQrcode/QuickQrHeader.vue'
import ResultSection from '@/components/QuickQrcode/ResultSection.vue'

const HISTORY_KEY = 'quickqr-history'
const FAVORITES_KEY = 'quickqr-favorites'
const QUICK_STARTS_KEY = 'quickqr-quick-starts'
const HISTORY_LIMIT = 10

const EXTENSION_ID = 'mkkpcaidnahcelelnecicpbeafikoogn'

const generatedValue = ref('')
const codeType = ref('barcode')
const hasResult = ref(false)
const isFavorite = ref(false)

const history = ref(loadStoredArray(HISTORY_KEY))
const favorites = ref(loadStoredArray(FAVORITES_KEY))
const quickStarts = ref(loadStoredArray(QUICK_STARTS_KEY))

const printProfilesOpen = ref(false)

const profilesVersion = ref(0)
const editVersion = ref(0)

// Storage

function loadStoredArray(key) {
  try {
    const saved = localStorage.getItem(key)

    if (!saved) {
      return []
    }

    const parsed = JSON.parse(saved)

    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error(`Could not load ${key}:`, error)
    return []
  }
}

function saveHistory() {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.value))
  } catch (error) {
    console.error('Could not save history:', error)
  }
}

function saveFavorites() {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites.value))
  } catch (error) {
    console.error('Could not save favorites:', error)
  }
}

function saveQuickStarts() {
  try {
    localStorage.setItem(QUICK_STARTS_KEY, JSON.stringify(quickStarts.value))
  } catch (error) {
    console.error('Could not save quick starts:', error)
  }
}

// History

function addToHistory(value, type) {
  const cleanValue = String(value ?? '').trim()

  if (!cleanValue) {
    return
  }

  history.value = history.value.filter((item) => !(item.value === cleanValue && item.type === type))

  history.value.unshift({
    value: cleanValue,
    type,
  })

  history.value = history.value.slice(0, HISTORY_LIMIT)

  saveHistory()
}

function handleClearHistory() {
  history.value = []
  saveHistory()
}

// Favorites

function checkFavorite(value = generatedValue.value, type = codeType.value) {
  return favorites.value.some((item) => item.value === value && item.type === type)
}

function syncCurrentFavorite() {
  if (!hasResult.value) {
    isFavorite.value = false
    return
  }

  isFavorite.value = checkFavorite()
}

function handleToggleFavorite() {
  if (!hasResult.value || !generatedValue.value) {
    return
  }

  const value = generatedValue.value
  const type = codeType.value

  if (checkFavorite(value, type)) {
    favorites.value = favorites.value.filter(
      (item) => !(item.value === value && item.type === type),
    )
  } else {
    favorites.value.unshift({
      value,
      type,
    })
  }

  saveFavorites()
  syncCurrentFavorite()
}

function handleRemoveFavorite(item) {
  if (!item) {
    return
  }

  favorites.value = favorites.value.filter(
    (favorite) => !(favorite.value === item.value && favorite.type === item.type),
  )

  saveFavorites()
  syncCurrentFavorite()
}

// Quick starts

function handleAddQuickStart(payload) {
  if (!payload) {
    return
  }

  const value = String(payload.value ?? '').trim()
  const type = payload.type === 'qr' ? 'qr' : 'barcode'

  if (!value) {
    return
  }

  const exists = quickStarts.value.some((item) => item.value === value && item.type === type)

  if (exists) {
    return
  }

  quickStarts.value.push({
    value,
    type,
  })

  saveQuickStarts()
}

function handleRemoveQuickStart(item) {
  if (!item) {
    return
  }

  quickStarts.value = quickStarts.value.filter(
    (quickStart) => !(quickStart.value === item.value && quickStart.type === item.type),
  )

  saveQuickStarts()
}

// Generate

function showCode(value, type, addHistory = true) {
  const cleanValue = String(value ?? '').trim()

  if (!cleanValue) {
    return
  }

  generatedValue.value = cleanValue
  codeType.value = type
  hasResult.value = true

  if (addHistory) {
    addToHistory(cleanValue, type)
  }

  syncCurrentFavorite()
}

function handleGenerate(payload) {
  showCode(payload.value, payload.type)
}

function handleCodeTypeChange(type) {
  codeType.value = type
  syncCurrentFavorite()
}

function handleEdit() {
  hasResult.value = false
  isFavorite.value = false
  editVersion.value++
}

function handleSelectSavedCode(item) {
  if (!item) {
    return
  }

  showCode(item.value, item.type, false)
}

// Print profiles

function handleProfilesUpdated() {
  profilesVersion.value++
}

function handleOpenPrintProfiles() {
  printProfilesOpen.value = true
}

// Shortcut

function handleChangeShortcut() {
  if (!window.chrome?.runtime?.sendMessage) {
    console.error('Chrome extension messaging is not available.')
    return
  }

  chrome.runtime.sendMessage(
    EXTENSION_ID,
    {
      type: 'QUICK_QR_OPEN_SHORTCUTS',
    },
    (response) => {
      if (chrome.runtime.lastError) {
        console.error('Could not contact Quick QR extension:', chrome.runtime.lastError.message)
        return
      }

      if (!response?.ok) {
        console.error(response?.error || 'Could not open extension shortcut settings.')
      }
    },
  )
}

// Print

async function handlePrint(selection) {
  if (!selection) {
    return
  }

  if (selection.type === 'generic') {
    await printGenericLabel({
      value: generatedValue.value,
      codeType: codeType.value,
    })

    return
  }

  if (selection.type === 'profile' && selection.profile) {
    await printLabel({
      value: generatedValue.value,
      codeType: codeType.value,
      profile: selection.profile,
    })
  }
}
</script>

<template>
  <div class="tools-page quick-qr-page">
    <QuickQrHeader />

    <main class="qr-app">
      <section class="generator-panel">
        <GeneratorSection
          :code-type="codeType"
          :generated-value="generatedValue"
          :history="history"
          :favorites="favorites"
          :quick-starts="quickStarts"
          :edit-version="editVersion"
          @generate="handleGenerate"
          @change-code-type="handleCodeTypeChange"
          @select-saved-code="handleSelectSavedCode"
          @clear-history="handleClearHistory"
          @add-quick-start="handleAddQuickStart"
          @remove-quick-start="handleRemoveQuickStart"
          @remove-favorite="handleRemoveFavorite"
        />

        <ResultSection
          :generated-value="generatedValue"
          :code-type="codeType"
          :has-result="hasResult"
          :is-favorite="isFavorite"
          :profiles-version="profilesVersion"
          @edit="handleEdit"
          @print="handlePrint"
          @toggle-favorite="handleToggleFavorite"
          @change-code-type="handleCodeTypeChange"
          @open-print-profiles="handleOpenPrintProfiles"
          @change-shortcut="handleChangeShortcut"
        />
      </section>
    </main>

    <printProfilesModal
      :open="printProfilesOpen"
      @close="printProfilesOpen = false"
      @profiles-updated="handleProfilesUpdated"
    />
  </div>
</template>

<style scoped>
.quick-qr-page {
  min-height: 100vh;
}

.qr-app {
  width: min(1160px, calc(100% - 28px));
  margin: 0 auto;
  padding: 24px 0 max(42px, env(safe-area-inset-bottom));
}

.generator-panel {
  display: grid;
  grid-template-columns:
    minmax(0, 0.92fr)
    minmax(420px, 1.08fr);

  gap: 4px;

  padding: clamp(20px, 3vw, 34px);

  border: 1px solid var(--nt-border);
  border-radius: 24px;

  background: rgba(255, 255, 255, 0.94);

  box-shadow: var(--nt-shadow);
}

/* Tablet */

@media (max-width: 850px) {
  .generator-panel {
    grid-template-columns: 1fr;
    gap: 18px;
  }
}

/* Mobile */

@media (max-width: 590px) {
  .qr-app {
    width: min(100% - 20px, 760px);
    padding-top: 12px;
  }

  .generator-panel {
    display: flex;
    flex-direction: column;

    padding: 17px 14px;

    border-radius: 21px;
  }
}
</style>
