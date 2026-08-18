<script setup>
import { onBeforeUnmount, onMounted } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])

function closeModal() {
  emit('close')
}

function handleKeydown(event) {
  if (event.key === 'Escape' && props.open) {
    closeModal()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="tools-modal">
      <div class="tools-backdrop" @click="closeModal"></div>

      <section class="tools-panel" role="dialog" aria-modal="true" aria-labelledby="tools-title">
        <div class="tools-header">
          <div>
            <p class="tools-eyebrow">QUICK ACCESS</p>
            <h2 id="tools-title">Tools</h2>
          </div>

          <button
            class="tools-close"
            type="button"
            aria-label="Close tools menu"
            @click="closeModal"
          >
            <i class="fa-solid fa-xmark" aria-hidden="true"></i>
          </button>
        </div>

        <div class="tools-list">
          <a class="tool-item" href="/tools/quick-qr-code/">
            <span class="tool-icon">
              <i class="fa-solid fa-qrcode" aria-hidden="true"></i>
            </span>

            <span class="tool-item-copy">
              <strong>Quick QR</strong>
              <small>Create and print SKU labels</small>
            </span>

            <i class="fa-solid fa-arrow-right tool-item-arrow" aria-hidden="true"></i>
          </a>
        </div>

        <p class="tools-empty-note">
          New utilities will appear here and will open directly, without adding sections to the
          landing page.
        </p>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.tools-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 1.5rem;
}

.tools-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(3, 7, 15, 0.78);
  backdrop-filter: blur(8px);
}

.tools-panel {
  position: relative;
  z-index: 1;

  width: min(100%, 520px);
  max-height: calc(100vh - 3rem);
  overflow-y: auto;

  padding: 1.5rem;

  background: #111722;
  border: 1px solid #2d3440;
  border-radius: 20px;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.45);
}

.tools-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.tools-eyebrow {
  margin: 0 0 0.35rem;
  color: #ff5b4d;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.tools-header h2 {
  margin: 0;
  font-size: 1.7rem;
  color: #fff;
}

.tools-close {
  display: grid;
  place-items: center;

  width: 38px;
  height: 38px;

  color: #fff;
  background: #181f2b;
  border: 1px solid #303744;
  border-radius: 10px;

  cursor: pointer;
}

.tools-close:hover {
  border-color: #ff5b4d;
  color: #ff5b4d;
}

.tools-list {
  display: grid;
  gap: 0.75rem;
}

.tool-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1rem;

  padding: 1rem;

  color: #fff;
  text-decoration: none;

  background: #0d131d;
  border: 1px solid #2b323e;
  border-radius: 14px;

  transition:
    transform 0.2s ease,
    border-color 0.2s ease;
}

.tool-item:hover {
  transform: translateY(-2px);
  border-color: #ff5b4d;
}

.tool-icon {
  display: grid;
  place-items: center;

  width: 44px;
  height: 44px;

  color: #ff5b4d;
  background: rgba(255, 91, 77, 0.1);
  border: 1px solid rgba(255, 91, 77, 0.35);
  border-radius: 12px;
}

.tool-item-copy {
  display: grid;
  gap: 0.2rem;
  min-width: 0;
}

.tool-item-copy strong {
  font-size: 0.95rem;
}

.tool-item-copy small {
  color: #aeb7c8;
  font-size: 0.78rem;
}

.tool-item-arrow {
  color: #7d8797;
}

.tools-empty-note {
  margin: 1.25rem 0 0;
  color: #7f8998;
  font-size: 0.78rem;
  line-height: 1.6;
}

@media (max-width: 480px) {
  .tools-modal {
    padding: 1rem;
    align-items: end;
  }

  .tools-panel {
    width: 100%;
    padding: 1.25rem;
    border-radius: 18px;
  }

  .tool-item {
    gap: 0.75rem;
    padding: 0.9rem;
  }

  .tool-icon {
    width: 40px;
    height: 40px;
  }
}
</style>
