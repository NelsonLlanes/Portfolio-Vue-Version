<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'profiles-updated'])

const STORAGE_KEY = 'quickqr-print-profiles'
const activeView = ref('profiles')
const activeProfileId = ref(null)
const activeLayoutMode = ref('barcode')

const selectedLayoutElement = ref(null)
const paperPreviewRef = ref(null)

const dragState = ref({
  dragging: false,
  elementName: null,
  offsetX: 0,
  offsetY: 0,
})

const resizeState = ref({
  resizing: false,
  elementName: null,
  startX: 0,
  startY: 0,
  startWidth: 0,
  startHeight: 0,
})

const profiles = ref([
  {
    id: 1,
    name: 'Profile 1',
    enabled: false,
    paper: {
      width: 100,
      height: 150,
      unit: 'mm',
      orientation: 'portrait',
    },
    layout: {
      barcode: {
        text: {
          x: 8,
          y: 8,
          width: 84,
          height: 18,
        },
        code: {
          x: 8,
          y: 34,
          width: 84,
          height: 45,
        },
      },
      qr: {
        text: {
          x: 8,
          y: 8,
          width: 84,
          height: 18,
        },
        code: {
          x: 20,
          y: 34,
          width: 60,
          height: 40,
        },
      },
    },
  },
  {
    id: 2,
    name: 'Profile 2',
    enabled: false,
    paper: {
      width: 100,
      height: 150,
      unit: 'mm',
      orientation: 'portrait',
    },
    layout: {
      barcode: {
        text: {
          x: 8,
          y: 8,
          width: 84,
          height: 18,
        },
        code: {
          x: 8,
          y: 34,
          width: 84,
          height: 45,
        },
      },
      qr: {
        text: {
          x: 8,
          y: 8,
          width: 84,
          height: 18,
        },
        code: {
          x: 20,
          y: 34,
          width: 60,
          height: 40,
        },
      },
    },
  },
  {
    id: 3,
    name: 'Profile 3',
    enabled: false,
    paper: {
      width: 100,
      height: 150,
      unit: 'mm',
      orientation: 'portrait',
    },
    layout: {
      barcode: {
        text: {
          x: 8,
          y: 8,
          width: 84,
          height: 18,
        },
        code: {
          x: 8,
          y: 34,
          width: 84,
          height: 45,
        },
      },
      qr: {
        text: {
          x: 8,
          y: 8,
          width: 84,
          height: 18,
        },
        code: {
          x: 20,
          y: 34,
          width: 60,
          height: 40,
        },
      },
    },
  },
])

const activeProfile = computed(() => {
  return profiles.value.find((profile) => profile.id === activeProfileId.value)
})

const activeLayout = computed(() => {
  if (!activeProfile.value) {
    return null
  }

  return activeProfile.value.layout[activeLayoutMode.value]
})

const activePaperDimensions = computed(() => {
  if (!activeProfile.value) {
    return null
  }

  const { width, height, orientation } = activeProfile.value.paper

  return {
    width: orientation === 'portrait' ? width : height,
    height: orientation === 'portrait' ? height : width,
  }
})

const previewPaperStyle = computed(() => {
  if (!activeProfile.value) {
    return {}
  }

  const { width, height, orientation } = activeProfile.value.paper

  const paperWidth = orientation === 'portrait' ? width : height

  const paperHeight = orientation === 'portrait' ? height : width

  return {
    aspectRatio: `${paperWidth} / ${paperHeight}`,
  }
})

function getLayoutStyle(element) {
  return {
    left: `${element.x}%`,
    top: `${element.y}%`,
    width: `${element.width}%`,
    height: `${element.height}%`,
  }
}

/* ---------------------------------------------------------
   ORIENTATION
--------------------------------------------------------- */

function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max))
}

function convertElementForOrientation(
  element,
  oldPaperWidth,
  oldPaperHeight,
  newPaperWidth,
  newPaperHeight,
) {
  let physicalY = (element.y / 100) * oldPaperHeight

  let physicalWidth = (element.width / 100) * oldPaperWidth

  let physicalHeight = (element.height / 100) * oldPaperHeight

  const scale = Math.min(1, newPaperWidth / physicalWidth, newPaperHeight / physicalHeight)

  physicalWidth *= scale
  physicalHeight *= scale

  const maxPhysicalY = Math.max(0, newPaperHeight - physicalHeight)

  const physicalX = (newPaperWidth - physicalWidth) / 2

  physicalY = clamp(physicalY, 0, maxPhysicalY)

  element.x = Number(((physicalX / newPaperWidth) * 100).toFixed(2))

  element.y = Number(((physicalY / newPaperHeight) * 100).toFixed(2))

  element.width = Number(((physicalWidth / newPaperWidth) * 100).toFixed(2))

  element.height = Number(((physicalHeight / newPaperHeight) * 100).toFixed(2))
}

function setOrientation(newOrientation) {
  if (!activeProfile.value) {
    return
  }

  const profile = activeProfile.value
  const oldOrientation = profile.paper.orientation

  if (oldOrientation === newOrientation) {
    return
  }

  const paperWidth = Number(profile.paper.width)
  const paperHeight = Number(profile.paper.height)

  if (
    !Number.isFinite(paperWidth) ||
    !Number.isFinite(paperHeight) ||
    paperWidth <= 0 ||
    paperHeight <= 0
  ) {
    return
  }

  /*
   * Dimensions BEFORE changing orientation.
   */
  const oldPaperWidth = oldOrientation === 'portrait' ? paperWidth : paperHeight

  const oldPaperHeight = oldOrientation === 'portrait' ? paperHeight : paperWidth

  /*
   * Dimensions AFTER changing orientation.
   */
  const newPaperWidth = newOrientation === 'portrait' ? paperWidth : paperHeight

  const newPaperHeight = newOrientation === 'portrait' ? paperHeight : paperWidth

  /*
   * Convert both layouts.
   *
   * This means changing orientation while looking at QR
   * also updates Barcode, and vice versa.
   */
  for (const mode of ['barcode', 'qr']) {
    const layout = profile.layout[mode]

    convertElementForOrientation(
      layout.text,
      oldPaperWidth,
      oldPaperHeight,
      newPaperWidth,
      newPaperHeight,
    )

    convertElementForOrientation(
      layout.code,
      oldPaperWidth,
      oldPaperHeight,
      newPaperWidth,
      newPaperHeight,
    )
  }

  profile.paper.orientation = newOrientation
  selectedLayoutElement.value = null
}

/* ---------------------------------------------------------
   LAYOUT MODE
--------------------------------------------------------- */

function setLayoutMode(mode) {
  activeLayoutMode.value = mode
  selectedLayoutElement.value = null
}

function selectLayoutElement(elementName) {
  selectedLayoutElement.value = elementName
}

function centerLayoutHorizontally() {
  if (!activeLayout.value) {
    return
  }

  const { text, code } = activeLayout.value

  text.x = Number(((100 - text.width) / 2).toFixed(2))
  code.x = Number(((100 - code.width) / 2).toFixed(2))

  selectedLayoutElement.value = null
}

function centerLayoutVertically() {
  if (!activeLayout.value) {
    return
  }

  const { text, code } = activeLayout.value

  // Calculate the complete height occupied by TEXT + CODE.
  const groupTop = Math.min(text.y, code.y)
  const groupBottom = Math.max(text.y + text.height, code.y + code.height)

  const groupHeight = groupBottom - groupTop

  // Position the entire group in the vertical center of the paper.
  const targetTop = (100 - groupHeight) / 2
  const offsetY = targetTop - groupTop

  // Apply exactly the same movement to both elements.
  // Their sizes and the distance between them remain unchanged.
  text.y = Number((text.y + offsetY).toFixed(2))
  code.y = Number((code.y + offsetY).toFixed(2))

  selectedLayoutElement.value = null
}

/* ---------------------------------------------------------
   DRAG
--------------------------------------------------------- */

function startDrag(event, elementName) {
  if (!activeLayout.value || !paperPreviewRef.value) {
    return
  }

  event.preventDefault()

  selectedLayoutElement.value = elementName

  const paperRect = paperPreviewRef.value.getBoundingClientRect()

  const element = activeLayout.value[elementName]

  const elementLeft = paperRect.left + (element.x / 100) * paperRect.width

  const elementTop = paperRect.top + (element.y / 100) * paperRect.height

  dragState.value = {
    dragging: true,
    elementName,
    offsetX: event.clientX - elementLeft,
    offsetY: event.clientY - elementTop,
  }

  window.addEventListener('pointermove', handleDrag)

  window.addEventListener('pointerup', stopDrag)
}

function handleDrag(event) {
  if (
    !dragState.value.dragging ||
    !dragState.value.elementName ||
    !activeLayout.value ||
    !paperPreviewRef.value
  ) {
    return
  }

  const paperRect = paperPreviewRef.value.getBoundingClientRect()

  const element = activeLayout.value[dragState.value.elementName]

  const pointerX = event.clientX - paperRect.left - dragState.value.offsetX

  const pointerY = event.clientY - paperRect.top - dragState.value.offsetY

  let x = (pointerX / paperRect.width) * 100

  let y = (pointerY / paperRect.height) * 100

  const maxX = 100 - element.width

  const maxY = 100 - element.height

  x = Math.max(0, Math.min(x, maxX))

  y = Math.max(0, Math.min(y, maxY))

  element.x = Number(x.toFixed(2))

  element.y = Number(y.toFixed(2))
}

function stopDrag() {
  dragState.value.dragging = false
  dragState.value.elementName = null

  window.removeEventListener('pointermove', handleDrag)

  window.removeEventListener('pointerup', stopDrag)
}

/* ---------------------------------------------------------
   RESIZE
--------------------------------------------------------- */

function startResize(event, elementName) {
  if (!activeLayout.value || !paperPreviewRef.value) {
    return
  }

  event.preventDefault()
  event.stopPropagation()

  selectedLayoutElement.value = elementName

  const element = activeLayout.value[elementName]

  resizeState.value = {
    resizing: true,
    elementName,
    startX: event.clientX,
    startY: event.clientY,
    startWidth: element.width,
    startHeight: element.height,
  }

  window.addEventListener('pointermove', handleResize)

  window.addEventListener('pointerup', stopResize)
}

function handleResize(event) {
  if (
    !resizeState.value.resizing ||
    !resizeState.value.elementName ||
    !activeLayout.value ||
    !paperPreviewRef.value
  ) {
    return
  }

  const paperRect = paperPreviewRef.value.getBoundingClientRect()

  const elementName = resizeState.value.elementName

  const element = activeLayout.value[elementName]

  const deltaX = ((event.clientX - resizeState.value.startX) / paperRect.width) * 100

  const deltaY = ((event.clientY - resizeState.value.startY) / paperRect.height) * 100

  /*
   * QR CODE
   *
   * Keep it physically square regardless of whether
   * the paper is portrait or landscape.
   */
  if (elementName === 'code' && activeLayoutMode.value === 'qr' && activePaperDimensions.value) {
    const paperWidth = activePaperDimensions.value.width

    const paperHeight = activePaperDimensions.value.height

    const startPhysicalWidth = (resizeState.value.startWidth / 100) * paperWidth

    const startPhysicalHeight = (resizeState.value.startHeight / 100) * paperHeight

    const deltaPhysicalX = (deltaX / 100) * paperWidth

    const deltaPhysicalY = (deltaY / 100) * paperHeight

    const startSize = Math.min(startPhysicalWidth, startPhysicalHeight)

    const dominantDelta =
      Math.abs(deltaPhysicalX) >= Math.abs(deltaPhysicalY) ? deltaPhysicalX : deltaPhysicalY

    let newPhysicalSize = startSize + dominantDelta

    const availablePhysicalWidth = ((100 - element.x) / 100) * paperWidth

    const availablePhysicalHeight = ((100 - element.y) / 100) * paperHeight

    const maxPhysicalSize = Math.min(availablePhysicalWidth, availablePhysicalHeight)

    const minPhysicalSize = Math.min(paperWidth, paperHeight) * 0.08

    newPhysicalSize = Math.max(minPhysicalSize, Math.min(newPhysicalSize, maxPhysicalSize))

    element.width = Number(((newPhysicalSize / paperWidth) * 100).toFixed(2))

    element.height = Number(((newPhysicalSize / paperHeight) * 100).toFixed(2))

    return
  }

  /*
   * TEXT / BARCODE
   *
   * These can resize freely.
   */
  const minWidth = 8
  const minHeight = 6

  const maxWidth = 100 - element.x

  const maxHeight = 100 - element.y

  let newWidth = resizeState.value.startWidth + deltaX

  let newHeight = resizeState.value.startHeight + deltaY

  newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth))

  newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight))

  element.width = Number(newWidth.toFixed(2))

  element.height = Number(newHeight.toFixed(2))
}

function stopResize() {
  resizeState.value.resizing = false
  resizeState.value.elementName = null

  window.removeEventListener('pointermove', handleResize)

  window.removeEventListener('pointerup', stopResize)
}

/* ---------------------------------------------------------
   PROFILE ACTIONS
--------------------------------------------------------- */

function toggleProfile(profile) {
  profile.enabled = !profile.enabled
  saveProfiles()
}

function saveProfiles() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles.value))

    syncProfilesWithExtension()

    emit('profiles-updated')

    return true
  } catch (error) {
    console.error('Could not save print profiles:', error)
    return false
  }
}

function syncProfilesWithExtension() {
  const cleanProfiles = JSON.parse(JSON.stringify(profiles.value))

  window.postMessage(
    {
      source: 'quick-qr-web',
      type: 'QUICK_QR_SYNC',
      profiles: cleanProfiles,
    },
    window.location.origin,
  )
}

function saveActiveProfile() {
  if (!activeProfile.value) {
    return
  }

  stopDrag()
  stopResize()

  const saved = saveProfiles()

  if (!saved) {
    return
  }

  backToProfiles()
}

function editProfile(profile) {
  activeProfileId.value = profile.id
  activeLayoutMode.value = 'barcode'
  activeView.value = 'editor'
  selectedLayoutElement.value = null
}

function backToProfiles() {
  stopDrag()
  stopResize()

  activeView.value = 'profiles'
  activeProfileId.value = null
  selectedLayoutElement.value = null
}

function closeModal() {
  stopDrag()
  stopResize()

  activeView.value = 'profiles'
  activeProfileId.value = null
  selectedLayoutElement.value = null

  emit('close')
}

/* ---------------------------------------------------------
   CLEANUP
--------------------------------------------------------- */
onMounted(() => {
  try {
    const savedProfiles = localStorage.getItem(STORAGE_KEY)

    if (!savedProfiles) {
      return
    }

    const parsedProfiles = JSON.parse(savedProfiles)

    if (!Array.isArray(parsedProfiles)) {
      return
    }

    profiles.value = parsedProfiles
  } catch (error) {
    console.error('Could not load print profiles:', error)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', handleDrag)

  window.removeEventListener('pointerup', stopDrag)

  window.removeEventListener('pointermove', handleResize)

  window.removeEventListener('pointerup', stopResize)
})
</script>

<template>
  <div v-if="open" class="profile-modal">
    <button
      class="profile-modal__backdrop"
      type="button"
      aria-label="Close print profiles"
      @click="closeModal"
    ></button>

    <section
      class="profile-modal__dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="printProfilesTitle"
    >
      <!-- PROFILE LIST -->

      <template v-if="activeView === 'profiles'">
        <header class="profile-modal__header">
          <div>
            <p class="tool-eyebrow">PRINT SETTINGS</p>

            <h2 id="printProfilesTitle">Print profiles</h2>
          </div>

          <button class="profile-modal__close" type="button" aria-label="Close" @click="closeModal">
            ×
          </button>
        </header>

        <div class="profiles-list">
          <!-- Generic -->

          <article class="profile-card profile-card--generic">
            <div class="profile-card__info">
              <span class="profile-card__eyebrow"> DEFAULT </span>

              <strong> Generic </strong>

              <p>Use the browser's standard print settings without a custom label profile.</p>
            </div>

            <span class="profile-status profile-status--default"> Always available </span>
          </article>

          <!-- Custom profiles -->

          <article
            v-for="profile in profiles"
            :key="profile.id"
            class="profile-card"
            :class="{
              'is-enabled': profile.enabled,
            }"
          >
            <div class="profile-card__info">
              <span class="profile-card__eyebrow"> CUSTOM PROFILE </span>

              <strong>
                {{ profile.name }}
              </strong>

              <p>
                {{
                  profile.enabled
                    ? 'Ready to use for printing.'
                    : 'Enable this profile to configure and use it.'
                }}
              </p>
            </div>

            <div class="profile-card__actions">
              <button
                class="profile-toggle"
                type="button"
                :class="{
                  'is-enabled': profile.enabled,
                }"
                :aria-pressed="profile.enabled"
                @click="toggleProfile(profile)"
              >
                <span class="profile-toggle__track">
                  <span class="profile-toggle__thumb"></span>
                </span>

                <span>
                  {{ profile.enabled ? 'Enabled' : 'Disabled' }}
                </span>
              </button>

              <button
                class="tool-button profile-edit"
                type="button"
                :disabled="!profile.enabled"
                @click="editProfile(profile)"
              >
                Edit
              </button>
            </div>
          </article>
        </div>

        <footer class="profile-modal__footer">
          <button class="tool-button" type="button" @click="closeModal">Close</button>
        </footer>
      </template>

      <!-- INDIVIDUAL PROFILE EDITOR -->

      <template v-else>
        <header class="profile-modal__header profile-modal__header--editor">
          <button
            class="profile-back"
            type="button"
            aria-label="Back to profiles"
            @click="backToProfiles"
          >
            ←
          </button>

          <div>
            <p class="tool-eyebrow">PRINT PROFILE</p>

            <h2>
              {{ activeProfile?.name }}
            </h2>
          </div>

          <button class="profile-modal__close" type="button" aria-label="Close" @click="closeModal">
            ×
          </button>
        </header>

        <div v-if="activeProfile" class="profile-editor">
          <!-- SETTINGS -->

          <div class="profile-editor__settings">
            <!-- Name -->

            <label class="profile-field">
              <span> Profile name </span>

              <input
                v-model.trim="activeProfile.name"
                class="tool-field"
                type="text"
                maxlength="30"
                placeholder="Profile name"
              />
            </label>

            <!-- Paper -->

            <div class="paper-settings">
              <span class="profile-field__title"> Paper size </span>

              <div class="paper-size-row">
                <label class="profile-field">
                  <span> Width </span>

                  <input
                    v-model.number="activeProfile.paper.width"
                    class="tool-field"
                    type="number"
                    min="1"
                    step="0.1"
                  />
                </label>

                <label class="profile-field">
                  <span> Height </span>

                  <input
                    v-model.number="activeProfile.paper.height"
                    class="tool-field"
                    type="number"
                    min="1"
                    step="0.1"
                  />
                </label>

                <label class="profile-field">
                  <span> Unit </span>

                  <select v-model="activeProfile.paper.unit" class="tool-field">
                    <option value="mm">mm</option>

                    <option value="in">in</option>
                  </select>
                </label>
              </div>
            </div>

            <!-- Orientation -->

            <div class="orientation-setting">
              <span class="profile-field__title"> Orientation </span>

              <div class="orientation-options">
                <button
                  type="button"
                  :class="{
                    'is-active': activeProfile.paper.orientation === 'portrait',
                  }"
                  @click="setOrientation('portrait')"
                >
                  Portrait
                </button>

                <button
                  type="button"
                  :class="{
                    'is-active': activeProfile.paper.orientation === 'landscape',
                  }"
                  @click="setOrientation('landscape')"
                >
                  Landscape
                </button>
              </div>
            </div>
          </div>

          <!-- LAYOUT -->

          <div class="layout-editor">
            <div class="layout-editor__header">
              <div>
                <span class="profile-field__title">Layout</span>
                <small>
                  {{ activeProfile.paper.width }}
                  ×
                  {{ activeProfile.paper.height }}
                  {{ activeProfile.paper.unit }}
                </small>
              </div>

              <div class="layout-mode" role="radiogroup" aria-label="Layout type">
                <button
                  type="button"
                  role="radio"
                  :aria-checked="activeLayoutMode === 'barcode'"
                  :class="{
                    'is-active': activeLayoutMode === 'barcode',
                  }"
                  @click="setLayoutMode('barcode')"
                >
                  Barcode
                </button>

                <button
                  type="button"
                  role="radio"
                  :aria-checked="activeLayoutMode === 'qr'"
                  :class="{
                    'is-active': activeLayoutMode === 'qr',
                  }"
                  @click="setLayoutMode('qr')"
                >
                  QR Code
                </button>
              </div>
            </div>

            <div class="layout-actions">
              <button
                class="layout-action"
                type="button"
                title="Center text and code horizontally"
                @click="centerLayoutHorizontally"
              >
                ↔
                <span>Center horizontally</span>
              </button>

              <button
                class="layout-action"
                type="button"
                title="Center the complete layout vertically"
                @click="centerLayoutVertically"
              >
                ↕
                <span>Center layout vertically</span>
              </button>
            </div>

            <div class="paper-preview-area">
              <div
                v-if="activeLayout"
                ref="paperPreviewRef"
                class="paper-preview"
                :style="previewPaperStyle"
              >
                <!-- TEXT -->

                <button
                  class="layout-box layout-box--text"
                  :class="{
                    'is-selected': selectedLayoutElement === 'text',
                  }"
                  type="button"
                  :style="getLayoutStyle(activeLayout.text)"
                  @pointerdown="startDrag($event, 'text')"
                  @click="selectLayoutElement('text')"
                >
                  <span> TEXT </span>

                  <span
                    v-if="selectedLayoutElement === 'text'"
                    class="resize-handle"
                    @pointerdown="startResize($event, 'text')"
                  ></span>
                </button>

                <!-- CODE -->

                <button
                  class="layout-box layout-box--code"
                  :class="{
                    'is-selected': selectedLayoutElement === 'code',
                  }"
                  type="button"
                  :style="getLayoutStyle(activeLayout.code)"
                  @pointerdown="startDrag($event, 'code')"
                  @click="selectLayoutElement('code')"
                >
                  <span>
                    {{ activeLayoutMode === 'barcode' ? 'BARCODE' : 'QR CODE' }}
                  </span>

                  <span
                    v-if="selectedLayoutElement === 'code'"
                    class="resize-handle"
                    @pointerdown="startResize($event, 'code')"
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <footer class="profile-modal__footer">
          <button class="tool-button" type="button" @click="backToProfiles">Back</button>

          <button class="tool-button tool-button--primary" type="button" @click="saveActiveProfile">
            Save profile
          </button>
        </footer>
      </template>
    </section>
  </div>
</template>

<style scoped>
.profile-modal {
  position: fixed;
  inset: 0;

  z-index: 1000;

  display: grid;
  place-items: center;

  padding: 20px;
}

.profile-modal__backdrop {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  padding: 0;
  border: 0;

  background: rgba(15, 23, 42, 0.42);
  backdrop-filter: blur(4px);

  cursor: default;
}

.profile-modal__dialog {
  position: relative;
  z-index: 1;

  width: min(920px, 100%);
  max-height: min(780px, calc(100dvh - 40px));

  display: flex;
  flex-direction: column;

  overflow: hidden;

  border: 1px solid var(--tool-border);
  border-radius: 22px;

  background: var(--tool-surface);
  box-shadow: var(--tool-shadow);
}

.profile-modal__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;

  padding: 22px 22px 18px;

  border-bottom: 1px solid var(--tool-border);
}

.profile-modal__header h2 {
  margin: 4px 0 0;

  color: var(--tool-text);

  font-size: clamp(22px, 4vw, 30px);
}

.profile-modal__close,
.profile-back {
  flex: 0 0 auto;

  width: 38px;
  height: 38px;

  display: grid;
  place-items: center;

  padding: 0;

  border: 1px solid var(--tool-border);
  border-radius: 11px;

  background: var(--tool-surface);
  color: var(--tool-text);

  font: inherit;
  font-size: 22px;

  cursor: pointer;
}

.profile-modal__header--editor {
  align-items: center;
}

.profile-modal__header--editor > div {
  flex: 1;
}

.profile-back {
  font-size: 17px;
}

/* PROFILE LIST */

.profiles-list {
  display: grid;
  gap: 10px;

  padding: 18px 22px;

  overflow-y: auto;
}

.profile-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;

  align-items: center;

  gap: 18px;

  padding: 16px;

  border: 1px solid var(--tool-border);
  border-radius: 16px;

  background: var(--tool-surface);
}

.profile-card.is-enabled {
  border-color: #b8ccec;
  background: var(--tool-surface-soft);
}

.profile-card--generic {
  background: var(--tool-surface-soft);
}

.profile-card__info {
  min-width: 0;
}

.profile-card__eyebrow {
  display: block;

  margin-bottom: 3px;

  color: var(--tool-text-muted);

  font-size: 9px;
  font-weight: 700;

  letter-spacing: 0.08em;
}

.profile-card__info strong {
  display: block;

  color: var(--tool-text);

  font-size: 15px;
}

.profile-card__info p {
  margin: 4px 0 0;

  color: var(--tool-text-muted);

  font-size: 11px;
  line-height: 1.5;
}

.profile-card__actions {
  display: flex;
  align-items: center;

  gap: 10px;
}

.profile-status {
  color: var(--tool-text-muted);

  font-size: 11px;
  font-weight: 700;
}

/* LAYOUT MODE */

.layout-mode {
  display: flex;
  align-items: center;

  padding: 3px;

  border: 1px solid var(--tool-border);
  border-radius: 10px;

  background: var(--tool-surface);
}

.layout-mode button {
  min-height: 32px;

  padding: 0 12px;

  border: 0;
  border-radius: 7px;

  background: transparent;
  color: var(--tool-text-muted);

  font: inherit;
  font-size: 10px;
  font-weight: 700;

  cursor: pointer;
}

.layout-mode button.is-active {
  background: var(--tool-primary);
  color: #fff;
}

/* TOGGLE */

.profile-toggle {
  display: flex;
  align-items: center;

  gap: 7px;

  padding: 0;
  border: 0;

  background: transparent;
  color: var(--tool-text-muted);

  font: inherit;
  font-size: 10px;
  font-weight: 700;

  cursor: pointer;
}

.profile-toggle.is-enabled {
  color: var(--tool-primary);
}

.profile-toggle__track {
  position: relative;

  width: 36px;
  height: 20px;

  display: block;

  border-radius: 999px;

  background: #d7dee9;

  transition: background 0.18s ease;
}

.profile-toggle__thumb {
  position: absolute;

  top: 3px;
  left: 3px;

  width: 14px;
  height: 14px;

  border-radius: 50%;

  background: white;

  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.2);

  transition: transform 0.18s ease;
}

.profile-toggle.is-enabled .profile-toggle__track {
  background: var(--tool-primary);
}

.profile-toggle.is-enabled .profile-toggle__thumb {
  transform: translateX(16px);
}

.profile-edit {
  min-height: 38px;

  padding-inline: 15px;
}

.profile-edit:disabled {
  opacity: 0.4;

  cursor: not-allowed;
}

/* FOOTER */

.profile-modal__footer {
  display: flex;
  justify-content: flex-end;

  gap: 9px;

  padding: 16px 22px;

  border-top: 1px solid var(--tool-border);

  background: var(--tool-surface);
}

/* EDITOR */

.profile-editor {
  min-height: 0;

  display: grid;
  grid-template-columns:
    300px
    minmax(420px, 1fr);

  overflow-y: auto;
}

.profile-editor__settings {
  display: flex;
  flex-direction: column;

  gap: 20px;

  padding: 22px;

  border-right: 1px solid var(--tool-border);
}

.profile-field {
  display: grid;

  gap: 6px;
}

.profile-field span,
.profile-field__title {
  color: var(--tool-text-muted);

  font-size: 10px;
  font-weight: 700;

  letter-spacing: 0.04em;

  text-transform: uppercase;
}

.paper-settings,
.orientation-setting {
  display: grid;

  gap: 9px;
}

.paper-size-row {
  display: grid;

  grid-template-columns:
    minmax(90px, 1fr)
    minmax(90px, 1fr)
    72px;

  gap: 8px;
}

.paper-size-row .profile-field:last-child {
  grid-column: auto;
}

.paper-size-row .tool-field {
  width: 100%;
  min-width: 0;

  box-sizing: border-box;
}

.paper-size-row input.tool-field {
  padding-inline: 12px;
}

.tool-field[type='number'] {
  appearance: textfield;
  -moz-appearance: textfield;
}

.tool-field[type='number'] ::-webkit-inner-spin-button,
.tool-field[type='number'] ::-webkit-outer-spin-button {
  margin: 0;

  appearance: none;
  -webkit-appearance: none;
}

/* ORIENTATION */

.orientation-options {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 6px;
}

.orientation-options button {
  min-height: 40px;

  border: 1px solid var(--tool-border);
  border-radius: 10px;

  background: var(--tool-surface);
  color: var(--tool-text);

  font: inherit;
  font-size: 11px;
  font-weight: 700;

  cursor: pointer;
}

.orientation-options button.is-active {
  border-color: var(--tool-primary);

  background: var(--tool-surface-soft);

  color: var(--tool-primary);
}

/* LAYOUT */

.layout-editor {
  min-width: 0;

  display: flex;
  flex-direction: column;

  padding: 22px;

  background: var(--tool-surface-soft);
}

.layout-editor__header {
  display: flex;

  justify-content: space-between;
  align-items: center;

  margin-bottom: 14px;
}

.layout-editor__header > div {
  display: grid;

  gap: 2px;
}

.layout-editor__header small {
  color: var(--tool-text-muted);

  font-size: 10px;
}

.layout-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.layout-action {
  min-height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  padding: 0 11px;

  border: 1px solid var(--tool-border);
  border-radius: 9px;

  background: var(--tool-surface);
  color: var(--tool-text-muted);

  font: inherit;
  font-size: 10px;
  font-weight: 700;

  cursor: pointer;

  transition:
    border-color 0.15s ease,
    background 0.15s ease,
    color 0.15s ease;
}

.layout-action:hover {
  border-color: var(--tool-primary);
  background: var(--tool-surface-soft);
  color: var(--tool-primary);
}

.layout-action:active {
  transform: translateY(1px);
}

/* PAPER */

.paper-preview-area {
  flex: 1;

  min-height: 360px;

  display: grid;
  place-items: center;

  padding: 24px;

  border: 1px dashed var(--tool-border);
  border-radius: 16px;

  overflow: hidden;
}

.paper-preview {
  position: relative;

  width: min(100%, 380px);
  max-height: 460px;

  border: 1px solid #cbd5e1;

  background: #fff;

  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.1);
}

/* LAYOUT BOXES */

.layout-box {
  position: absolute;

  display: grid;
  place-items: center;

  padding: 0;

  border: 1.5px dashed #94a3b8;
  border-radius: 6px;

  background: rgba(241, 245, 249, 0.65);

  color: #64748b;

  font: inherit;
  font-size: 10px;
  font-weight: 800;

  letter-spacing: 0.08em;

  cursor: pointer;

  overflow: visible;

  touch-action: none;
  user-select: none;

  transition:
    border-color 0.15s ease,
    background 0.15s ease;
}

.layout-box:hover {
  border-color: var(--tool-primary);

  background: rgba(239, 246, 255, 0.9);
}

.layout-box.is-selected {
  border-style: solid;

  border-color: var(--tool-primary);

  background: rgba(239, 246, 255, 0.95);

  color: var(--tool-primary);

  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.12);
}

.layout-box:active {
  cursor: grabbing;
}

.layout-box--text {
  z-index: 2;
}

.layout-box--code {
  z-index: 1;
}

.resize-handle {
  position: absolute;

  right: -5px;
  bottom: -5px;

  width: 11px;
  height: 11px;

  border: 2px solid #fff;
  border-radius: 3px;

  background: var(--tool-primary);

  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.25);

  cursor: nwse-resize;

  touch-action: none;
}

/* MOBILE */

@media (max-width: 590px) {
  .profile-modal {
    align-items: end;

    padding: 0;
  }

  .profile-modal__dialog {
    width: 100%;
    max-height: 92dvh;

    border-radius: 22px 22px 0 0;
  }

  .profile-editor {
    grid-template-columns: 1fr;
  }

  .profile-editor__settings {
    border-right: 0;

    border-bottom: 1px solid var(--tool-border);
  }

  .paper-size-row {
    grid-template-columns: 1fr 1fr;
  }

  .paper-size-row .profile-field:last-child {
    grid-column: 1 / -1;
  }

  .paper-preview-area {
    min-height: 330px;
  }

  .paper-preview {
    width: min(100%, 280px);
  }

  .profile-card {
    grid-template-columns: 1fr;

    gap: 12px;
  }

  .profile-card__actions {
    justify-content: space-between;
  }

  .profile-modal__footer {
    padding-bottom: max(16px, env(safe-area-inset-bottom));
  }
}
</style>
