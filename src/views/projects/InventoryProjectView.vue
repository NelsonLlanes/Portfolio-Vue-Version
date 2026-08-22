<script setup>
const demoVideo = 'https://www.youtube.com/embed/34Zijwx6wg4?rel=0&modestbranding=1'

const frontendRepo = 'https://github.com/NelsonLlanes/inventory-procurement-spa'
const backendRepo = 'https://github.com/NelsonLlanes/inventory-app-php'
</script>

<template>
  <main class="project-page">
    <div class="project-container">
      <!-- Navigation -->

      <RouterLink class="back-link" to="/#projects"> ← Back to projects </RouterLink>

      <!-- Header -->

      <header class="project-hero">
        <h1>Inventory & Procurement</h1>

        <p class="project-subtitle">React · Vite · PHP · MySQL · REST API</p>
      </header>

      <!-- Project Layout -->

      <section class="project-layout">
        <!-- Content -->

        <div class="project-content">
          <!-- Overview -->

          <section class="project-section">
            <h2>Overview</h2>

            <p>
              A full-stack Inventory & Procurement system designed to manage suppliers, products,
              and purchase orders through a modern responsive interface backed by a RESTful API.
            </p>

            <p>
              The project combines a React Single Page Application with a PHP and MySQL backend,
              connecting frontend workflows with structured API endpoints and persistent relational
              data.
            </p>
          </section>

          <!-- Frontend -->

          <section class="project-section">
            <h2>Frontend SPA</h2>

            <p>
              The frontend was built with React and Vite to prototype the inventory and procurement
              workflow through a responsive Single Page Application.
            </p>

            <ul>
              <li>Multi-page SPA with client-side routing</li>

              <li>Inventory workflows for products, suppliers, and purchase orders</li>

              <li>Full CRUD operations using mocked/local data</li>

              <li>Centralized state management</li>

              <li>Responsive UI for desktop and mobile</li>

              <li>Mocked authentication flow</li>

              <li>Error handling and loading states</li>
            </ul>
          </section>

          <!-- Backend -->

          <section class="project-section">
            <h2>Backend API</h2>

            <p>
              The backend was built in PHP as a RESTful API designed to support the frontend
              application and provide persistent inventory data through MySQL.
            </p>

            <ul>
              <li>REST-style endpoints for Products, Suppliers, and Purchase Orders</li>

              <li>Full CRUD operations with structured JSON responses</li>

              <li>Normalized MySQL schema with foreign key relationships</li>

              <li>Secure database access using prepared statements with PDO</li>

              <li>Input validation and sanitization</li>

              <li>Centralized routing with an MVC-inspired structure</li>

              <li>Server-side logging system</li>
            </ul>
          </section>

          <!-- Technical Stack -->

          <section class="project-section">
            <h2>Technical Stack</h2>

            <ul class="tech-list">
              <li>React</li>
              <li>Vite</li>
              <li>JavaScript</li>
              <li>HTML5</li>
              <li>CSS / Tailwind CSS</li>
              <li>PHP</li>
              <li>MySQL</li>
              <li>PDO</li>
              <li>phpMyAdmin</li>
              <li>Postman / Thunder Client</li>
            </ul>
          </section>

          <!-- Architecture -->

          <section class="project-section">
            <h2>Architecture & Practices</h2>

            <ul>
              <li>Component-based frontend architecture</li>
              <li>Modular folder structure</li>
              <li>Client-side routing</li>
              <li>RESTful frontend/backend communication</li>
              <li>Relational database design</li>
              <li>Prepared SQL statements</li>
              <li>API-ready frontend design</li>
              <li>Scrum workflow with iterative delivery</li>
            </ul>
          </section>

          <!-- Why -->

          <section class="project-section">
            <h2>Why This Project Matters</h2>

            <p>
              This project demonstrates the ability to translate business requirements into a usable
              frontend while also designing the backend architecture, API structure, and relational
              database required to support real inventory and procurement workflows.
            </p>
          </section>

          <!-- Repositories -->

          <section class="project-section project-links">
            <h2>Project Repositories</h2>

            <div class="project-actions">
              <a
                :href="frontendRepo"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary"
              >
                <i class="fa-brands fa-github" aria-hidden="true"></i>
                Frontend Repository
              </a>

              <a
                :href="backendRepo"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-secondary"
              >
                <i class="fa-brands fa-github" aria-hidden="true"></i>
                Backend Repository
              </a>
            </div>
          </section>
        </div>

        <!-- Media -->

        <aside class="project-media">
          <div class="video-card">
            <div class="video-wrap">
              <iframe
                :src="demoVideo"
                title="Inventory and Procurement project demo"
                frameborder="0"
                allow="
                  accelerometer;
                  autoplay;
                  clipboard-write;
                  encrypted-media;
                  gyroscope;
                  picture-in-picture;
                  web-share;
                "
                allowfullscreen
              ></iframe>
            </div>

            <div class="video-meta">
              <div>
                <div class="video-title">Demo Walkthrough</div>
                <div class="video-sub">YouTube</div>
              </div>

              <i class="fa-brands fa-youtube video-icon" aria-hidden="true"></i>
            </div>
          </div>
        </aside>
      </section>
    </div>
  </main>
</template>

<style scoped>
.project-page {
  min-height: 100vh;

  padding: 44px 0 90px;

  color: #e9eefc;

  background:
    radial-gradient(900px 520px at 85% 5%, rgba(255, 93, 74, 0.07), transparent 62%), #070b14;
}

.project-container {
  width: min(1120px, calc(100% - 40px));
  margin: 0 auto;
}

/* Navigation */

.back-link {
  display: inline-flex;
  align-items: center;

  margin-bottom: 52px;

  color: rgba(233, 238, 252, 0.62);

  font-size: 13px;
  font-weight: 700;

  text-decoration: none;

  transition: color 160ms ease;
}

.back-link:hover {
  color: var(--color-primary);
}

/* Hero */

.project-hero {
  margin-bottom: 50px;
}

.project-hero h1 {
  max-width: 850px;

  margin: 0;

  color: #fff;

  font-size: clamp(40px, 6vw, 64px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.045em;
}

.project-subtitle {
  margin: 17px 0 0;

  color: var(--color-primary);

  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.03em;
}

/* Layout */

.project-layout {
  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    minmax(320px, 0.82fr);

  align-items: start;

  gap: clamp(42px, 7vw, 88px);
}

/* Content */

.project-content {
  min-width: 0;
}

.project-section {
  padding-bottom: 34px;
  margin-bottom: 34px;

  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.project-section:last-child {
  margin-bottom: 0;

  border-bottom: 0;
}

.project-section h2 {
  position: relative;

  margin: 0 0 17px;
  padding-bottom: 12px;

  color: #fff;

  font-size: 20px;
  font-weight: 750;
  letter-spacing: -0.025em;
}

.project-section h2::after {
  content: '';

  position: absolute;
  bottom: 0;
  left: 0;

  width: 38px;
  height: 2px;

  border-radius: 999px;

  background: var(--color-primary);
}

.project-section p {
  margin: 0 0 14px;

  color: rgba(233, 238, 252, 0.68);

  font-size: 13px;
  line-height: 1.8;
}

.project-section p:last-child {
  margin-bottom: 0;
}

/* Lists */

.project-section ul {
  display: grid;
  gap: 9px;

  margin: 0;
  padding: 0;

  list-style: none;
}

.project-section ul:not(.tech-list) li {
  position: relative;

  padding-left: 19px;

  color: rgba(233, 238, 252, 0.7);

  font-size: 13px;
  line-height: 1.65;
}

.project-section ul:not(.tech-list) li::before {
  content: '';

  position: absolute;
  top: 0.67em;
  left: 2px;

  width: 5px;
  height: 5px;

  border-radius: 50%;

  background: var(--color-primary);
}

/* Tech */

.tech-list {
  display: flex !important;
  flex-wrap: wrap;
  gap: 8px !important;
}

.tech-list li {
  padding: 7px 10px;

  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 8px;

  background: rgba(255, 255, 255, 0.04);

  color: rgba(233, 238, 252, 0.78);

  font-size: 11px;
  font-weight: 650;
}

/* Project links */

.project-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  min-height: 43px;

  padding: 0 15px;

  border: 1px solid transparent;
  border-radius: 10px;

  font-size: 12px;
  font-weight: 750;

  text-decoration: none;

  transition:
    transform 160ms ease,
    border-color 160ms ease,
    background 160ms ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn-primary {
  border-color: var(--color-primary);

  background: var(--color-primary);
  color: #080b11;
}

.btn-secondary {
  border-color: rgba(255, 255, 255, 0.12);

  background: rgba(255, 255, 255, 0.04);
  color: #fff;
}

.btn-secondary:hover {
  border-color: rgba(255, 93, 74, 0.4);
  background: rgba(255, 93, 74, 0.08);
}

/* Media */

.project-media {
  position: sticky;
  top: 30px;

  min-width: 0;
}

.video-card {
  overflow: hidden;

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;

  background: rgba(255, 255, 255, 0.03);

  box-shadow: 0 22px 60px rgba(0, 0, 0, 0.25);
}

.video-wrap {
  position: relative;

  width: 100%;
  aspect-ratio: 16 / 9;

  overflow: hidden;

  background: #000;
}

.video-wrap iframe {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  border: 0;
}

.video-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;

  padding: 16px 18px;
}

.video-title {
  color: #fff;

  font-size: 13px;
  font-weight: 700;
}

.video-sub {
  margin-top: 3px;

  color: rgba(233, 238, 252, 0.45);

  font-size: 11px;
}

.video-icon {
  color: var(--color-primary);

  font-size: 19px;
}

/* Tablet */

@media (max-width: 850px) {
  .project-layout {
    grid-template-columns: 1fr;
    gap: 42px;
  }

  .project-media {
    position: static;

    grid-row: 1;

    width: min(100%, 700px);
  }
}

/* Mobile */

@media (max-width: 600px) {
  .project-page {
    padding: 26px 0 65px;
  }

  .project-container {
    width: min(100% - 28px, 1120px);
  }

  .back-link {
    margin-bottom: 38px;
  }

  .project-hero {
    margin-bottom: 36px;
  }

  .project-hero h1 {
    font-size: 38px;
    line-height: 1.05;
  }

  .project-subtitle {
    font-size: 12px;
    line-height: 1.6;
  }

  .project-section {
    padding-bottom: 29px;
    margin-bottom: 29px;
  }

  .project-section h2 {
    font-size: 19px;
  }

  .project-actions {
    display: grid;
    grid-template-columns: 1fr;
  }

  .btn {
    width: 100%;
  }

  .video-card {
    border-radius: 14px;
  }
}
</style>
