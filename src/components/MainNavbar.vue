<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)
const emit = defineEmits(['open-tools'])

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <header class="nav-wrap">
    <nav class="nav container">
      <a class="brand" href="#home">Nelson Llanes</a>

      <button
        class="nav-toggle"
        aria-label="Open menu"
        :aria-expanded="menuOpen"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="nav-links" data-menu :class="{ open: menuOpen }">
        <a class="nav-link active" href="#about" @click="closeMenu">About</a>
        <a class="nav-link" href="#skills" @click="closeMenu">Skills</a>
        <a class="nav-link" href="#projects" @click="closeMenu">Projects</a>
        <a class="nav-link" href="#contact" @click="closeMenu">Contact</a>
        <a class="btn btn-primary" href="#contact" @click="closeMenu">Hire Me</a>
        <button
          class="tools-trigger"
          type="button"
          data-tools-open
          aria-haspopup="dialog"
          aria-controls="toolsDialog"
          @click="emit('open-tools')"
        >
          <i class="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i>
          <span>Tools</span>
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.nav-wrap {
  position: sticky;
  top: 0;
  z-index: 50;

  background: linear-gradient(180deg, rgba(7, 11, 20, 0.92), rgba(7, 11, 20, 0.72));

  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.nav {
  height: 78px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.brand {
  font-weight: 700;
  letter-spacing: 0.2px;
  font-size: 20px;
}

/* =========================
   NAV LINKS
   ========================= */

.nav-links {
  display: flex;
  align-items: center;
  gap: 26px;
}

.nav-link {
  position: relative;

  padding: 6px 2px;

  font-size: 14px;
  color: rgba(233, 238, 252, 0.78);
}

.nav-link:hover {
  color: rgba(233, 238, 252, 0.95);
}

.nav-link.active::after {
  content: '';

  position: absolute;
  left: 0;
  bottom: -6px;

  width: 100%;
  height: 2px;

  background: var(--color-primary);
  border-radius: 999px;
}

/* =========================
   MOBILE MENU BUTTON
   ========================= */

.nav-toggle {
  display: none;

  width: 44px;
  height: 38px;

  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;

  cursor: pointer;
}

.nav-toggle span {
  display: block;

  width: 4px;
  height: 4px;

  margin: 3px auto;

  background: rgba(233, 238, 252, 0.9);
  border-radius: 50%;
}

/* =========================
   TOOLS BUTTON
   ========================= */

.tools-trigger {
  display: inline-flex;
  align-items: center;

  gap: 8px;

  min-height: 44px;
  padding: 0 4px;

  border: 0;
  background: transparent;

  color: rgba(233, 238, 252, 0.78);

  font: inherit;
  font-size: 14px;

  cursor: pointer;
}

.tools-trigger:hover,
.tools-trigger:focus-visible {
  color: var(--color-text);
}

.tools-trigger i {
  color: var(--color-primary);
}

/* =========================
   MOBILE
   ========================= */

@media (max-width: 760px) {
  .nav-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .nav-links {
    position: absolute;

    top: 78px;
    left: 0;
    right: 0;

    display: grid;
    gap: 12px;

    padding: 18px 24px 22px;

    background: rgba(7, 11, 20, 0.98);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);

    transform: translateY(-6px);

    opacity: 0;
    pointer-events: none;

    transition:
      opacity 160ms ease,
      transform 160ms ease;
  }

  .nav-links.open {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
}
</style>
