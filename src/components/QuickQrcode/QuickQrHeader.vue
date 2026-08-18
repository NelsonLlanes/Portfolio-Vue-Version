<script setup></script>

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
  </header>
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
}
</style>
