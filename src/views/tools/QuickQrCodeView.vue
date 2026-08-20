<script setup>
import { ref } from 'vue'

import GeneratorSection from '@/components/QuickQrcode/GeneratorSection.vue'
import QuickQrHeader from '@/components/QuickQrcode/QuickQrHeader.vue'
import ResultSection from '@/components/QuickQrcode/ResultSection.vue'
import printProfilesModal from '@/components/QuickQrcode/printProfilesModal.vue'
import { printGenericLabel, printLabel } from '@/components/QuickQrcode/Printlabel'

const generatedValue = ref('')
const codeType = ref('barcode')
const hasResult = ref(false)
const isFavorite = ref(false)

const printProfilesOpen = ref(false)
const profilesVersion = ref(0)

function handleProfilesUpdated() {
  profilesVersion.value++
}

function handleGenerate(payload) {
  generatedValue.value = payload.value
  codeType.value = payload.type
  hasResult.value = true
  isFavorite.value = false
}

function handleCodeTypeChange(type) {
  codeType.value = type
}

function handleEdit() {
  hasResult.value = false
}

function handleToggleFavorite() {
  isFavorite.value = !isFavorite.value
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

function handleOpenPrintProfiles() {
  printProfilesOpen.value = true
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
          @generate="handleGenerate"
          @change-code-type="handleCodeTypeChange"
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
        />
      </section>
    </main>

    <PrintModal
      :open="printModalOpen"
      @close="printModalOpen = false"
      @select="handlePrintSelection"
    />

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
