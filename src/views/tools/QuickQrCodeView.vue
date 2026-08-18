<script setup>
import { ref } from 'vue'

import GeneratorSection from '@/components/QuickQrcode/GeneratorSection.vue'
import QuickQrHeader from '@/components/QuickQrcode/QuickQrHeader.vue'
import ResultSection from '@/components/QuickQrcode/ResultSection.vue'

const generatedValue = ref('')
const codeType = ref('barcode')
const hasResult = ref(false)
const isFavorite = ref(false)

function handleGenerate(value) {
  generatedValue.value = value
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

function handlePrint() {
  window.print()
}

function handleOpenPrintProfiles() {
  console.log('Open print profiles')
}
</script>

<template>
  <div class="tools-page quick-qr-page">
    <QuickQrHeader />

    <main class="qr-app">
      <section class="generator-panel">
        <GeneratorSection
          :code-type="codeType"
          @generate="handleGenerate"
          @change-code-type="handleCodeTypeChange"
        />

        <ResultSection
          :generated-value="generatedValue"
          :code-type="codeType"
          :has-result="hasResult"
          :is-favorite="isFavorite"
          @edit="handleEdit"
          @print="handlePrint"
          @toggle-favorite="handleToggleFavorite"
          @change-code-type="handleCodeTypeChange"
          @open-print-profiles="handleOpenPrintProfiles"
        />
      </section>
    </main>
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
