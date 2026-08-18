<script setup>
import quickQrImage from '@/assets/images/Quick-qr-code.png'
import inventoryImage from '@/assets/images/inventory-api-demo.png'
import expenseTrackerImage from '@/assets/images/expensetracker-demo.png'
</script>

<template>
  <section id="projects" class="section container">
    <div class="section-head center">
      <h2 class="section-title center">Projects</h2>
      <div class="underline"></div>

      <p class="projects-intro">
        A selection of applications built around practical problems, usability, and maintainable
        solutions.
      </p>
    </div>

    <div class="projects-grid">
      <!-- Quick QR -->
      <article class="project-card project-card--featured">
        <div class="project-media">
          <a href="/tools/quick-qr" target="_blank" rel="noopener noreferrer">
            <img loading="lazy" decoding="async" :src="quickQrImage" alt="Quick QR application" />
          </a>

          <span class="project-featured">Featured Project</span>

          <a
            class="project-link"
            href="/tools/quick-qr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Quick QR"
          >
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>

        <div class="project-body">
          <h3 class="project-title">Quick QR</h3>

          <p class="project-description">
            A lightweight QR and barcode generator designed to make warehouse labeling faster and
            easier, with quick generation, history, favorites, editing, and print-ready output.
          </p>

          <div class="project-tech">
            <span>JavaScript</span>
            <span>QR</span>
            <span>CODE 128</span>
            <span>Responsive UI</span>
          </div>
        </div>
      </article>

      <!-- Inventory & Procurement -->
      <article class="project-card">
        <div class="project-media">
          <a href="projects/inventory-spa.html" target="_blank" rel="noopener noreferrer">
            <img
              loading="lazy"
              decoding="async"
              :src="inventoryImage"
              alt="Inventory and Procurement application"
            />
          </a>

          <a
            class="project-link"
            href="projects/inventory-spa.html"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Inventory and Procurement project"
          >
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>

        <div class="project-body">
          <h3 class="project-title">Inventory & Procurement</h3>

          <p class="project-description">
            A full-stack inventory system for organizing products, suppliers, and purchasing
            workflows through a structured frontend and RESTful backend.
          </p>

          <div class="project-tech">
            <span>React</span>
            <span>PHP</span>
            <span>MySQL</span>
            <span>REST API</span>
          </div>
        </div>
      </article>

      <!-- Expense Tracker -->
      <article class="project-card">
        <div class="project-media">
          <a href="projects/expense-tracker.html" target="_blank" rel="noopener noreferrer">
            <img
              loading="lazy"
              decoding="async"
              :src="expenseTrackerImage"
              alt="Expense Tracker application"
            />
          </a>

          <a
            class="project-link"
            href="projects/expense-tracker.html"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Expense Tracker project"
          >
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>

        <div class="project-body">
          <h3 class="project-title">Expense Tracker</h3>

          <p class="project-description">
            A browser-based application for recording expenses, organizing transactions by category,
            and keeping financial data available between sessions.
          </p>

          <div class="project-tech">
            <span>JavaScript</span>
            <span>LocalStorage</span>
            <span>Responsive UI</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.projects-intro {
  max-width: 620px;
  margin: 18px auto 0;
  color: rgba(233, 238, 252, 0.62);
  font-size: 14px;
  line-height: 1.7;
  text-align: center;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
}

.project-card {
  overflow: hidden;
  position: relative;

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;

  background: rgba(255, 255, 255, 0.03);

  transition:
    transform 180ms ease,
    border-color 180ms ease;
}

.project-card:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 93, 74, 0.3);
}

/* Featured project */
.project-card--featured {
  grid-column: 1 / -1;
}

.project-media {
  position: relative;
  overflow: hidden;
}

.project-media > a:first-child {
  display: block;
}

.project-media img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;

  transition: transform 250ms ease;
}

.project-card--featured .project-media img {
  aspect-ratio: 16 / 7;
}

.project-card:hover .project-media img {
  transform: scale(1.015);
}

.project-featured {
  position: absolute;
  top: 16px;
  left: 16px;

  padding: 7px 12px;

  border: 1px solid rgba(255, 93, 74, 0.3);
  border-radius: 999px;

  background: rgba(7, 11, 20, 0.88);
  color: var(--color-primary);

  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;

  backdrop-filter: blur(8px);
}

.project-link {
  position: absolute;
  top: 16px;
  right: 16px;

  width: 40px;
  height: 40px;

  display: grid;
  place-items: center;

  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;

  background: rgba(7, 11, 20, 0.88);
  color: var(--color-primary);

  backdrop-filter: blur(8px);

  transition:
    border-color 160ms ease,
    background 160ms ease;
}

.project-link:hover {
  border-color: rgba(255, 93, 74, 0.4);
  background: rgba(255, 93, 74, 0.1);
}

.project-body {
  padding: 22px;
}

.project-title {
  margin: 0 0 10px;

  font-size: 18px;
  font-weight: 700;
}

.project-description {
  margin: 0;

  color: rgba(233, 238, 252, 0.68);

  font-size: 13px;
  line-height: 1.7;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  margin-top: 18px;
}

.project-tech span {
  padding: 6px 10px;

  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;

  background: rgba(255, 255, 255, 0.04);
  color: rgba(233, 238, 252, 0.78);

  font-size: 11px;
  font-weight: 600;
}

/* Tablet / Mobile */
@media (max-width: 800px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }

  .project-card--featured {
    grid-column: auto;
  }

  .project-card--featured .project-media img {
    aspect-ratio: 16 / 9;
  }
}

@media (max-width: 600px) {
  .project-body {
    padding: 18px;
  }

  .projects-intro {
    font-size: 13px;
  }
}
</style>
