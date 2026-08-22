<script setup>
const demoVideo = 'https://www.youtube.com/embed/ch8EWIE6nlw'

const githubRepo = 'https://github.com/NelsonLlanes/Portfolio-Vue-Version'

const quickQrUrl = '/tools/Quick-qr-code'
</script>

<template>
  <main class="project-page">
    <div class="project-container">
      <!-- Navigation -->

      <RouterLink class="back-link" to="/#projects"> ← Back to projects </RouterLink>

      <!-- Header -->

      <header class="project-hero">
        <h1>Quick QR</h1>

        <p class="project-subtitle">Vue · JavaScript · QR · CODE 128 · LocalStorage</p>
      </header>

      <!-- Project Layout -->

      <section class="project-layout">
        <!-- Content -->

        <div class="project-content">
          <!-- Overview -->

          <section class="project-section">
            <h2>Overview</h2>

            <p>
              Quick QR is a lightweight QR code and barcode generator designed to make repetitive
              warehouse labeling workflows faster and easier.
            </p>

            <p>
              The application allows users to generate QR codes and CODE 128 barcodes from SKUs or
              text, reuse previously generated values, organize frequently used codes, and print
              labels using configurable print profiles.
            </p>
          </section>

          <!-- Key Features -->

          <section class="project-section">
            <h2>Key Features</h2>

            <ul>
              <li>QR code generation</li>

              <li>CODE 128 barcode generation</li>

              <li>Recent generation history</li>

              <li>Favorite codes for frequently used values</li>

              <li>Quick Starts for reusable codes and templates</li>

              <li>Edit previously generated values</li>

              <li>Custom print profiles</li>

              <li>Portrait and landscape label layouts</li>

              <li>QR and barcode print modes</li>

              <li>Responsive interface for desktop and mobile</li>
            </ul>
          </section>

          <!-- Printing -->

          <section class="project-section">
            <h2>Label Printing</h2>

            <p>
              Quick QR includes a configurable printing system designed for different label sizes
              and orientations. Print profiles allow commonly used configurations to be saved and
              reused instead of rebuilding a label layout each time.
            </p>

            <ul>
              <li>Reusable print profiles</li>

              <li>Portrait and landscape orientation</li>

              <li>QR or CODE 128 output</li>

              <li>Adjustable code and text positioning</li>

              <li>Proportional layout handling between orientations</li>

              <li>Generic printing without requiring a saved profile</li>
            </ul>
          </section>

          <!-- Saved Data -->

          <section class="project-section">
            <h2>Saved Workflows</h2>

            <p>
              The application stores commonly used information directly in the browser so repetitive
              labeling tasks can be completed with fewer steps.
            </p>

            <ul>
              <li>History keeps recently generated codes available for reuse</li>

              <li>Favorites provide quick access to frequently used codes</li>

              <li>Quick Starts provide reusable values for repetitive workflows</li>

              <li>Print profiles preserve commonly used label configurations</li>
            </ul>
          </section>

          <!-- Technical Stack -->

          <section class="project-section">
            <h2>Technical Stack</h2>

            <ul class="tech-list">
              <li>Vue</li>
              <li>Vite</li>
              <li>JavaScript</li>
              <li>HTML5</li>
              <li>CSS3</li>
              <li>LocalStorage</li>
              <li>QR Codes</li>
              <li>CODE 128</li>
            </ul>
          </section>

          <!-- Architecture -->

          <section class="project-section">
            <h2>Architecture & Practices</h2>

            <ul>
              <li>Component-based Vue architecture</li>

              <li>Reusable UI components</li>

              <li>Reactive application state</li>

              <li>Persistent browser storage</li>

              <li>Responsive desktop and mobile layouts</li>

              <li>Separated generation and printing logic</li>

              <li>Reusable print configuration system</li>
            </ul>
          </section>

          <!-- Challenges -->

          <section class="project-section">
            <h2>Development Challenges</h2>

            <p>
              A significant part of the project involved making the same workflow behave
              consistently across desktop, mobile, and printed output.
            </p>

            <ul>
              <li>
                Maintaining QR and barcode proportions when switching between portrait and landscape
                labels
              </li>

              <li>Keeping print positioning independent from the responsive screen layout</li>

              <li>Managing mobile keyboard focus and automatic scrolling</li>

              <li>
                Coordinating generated codes, history, favorites, Quick Starts, editing, and
                printing across components
              </li>

              <li>
                Keeping saved-code actions independent from the generator input when appropriate
              </li>
            </ul>
          </section>

          <!-- Why -->

          <section class="project-section">
            <h2>Why This Project Matters</h2>

            <p>
              Quick QR was created around a practical labeling workflow rather than as a purely
              visual demonstration. The project evolved as new workflow requirements appeared,
              turning a simple code generator into a reusable tool for generating, organizing,
              editing, and printing warehouse labels.
            </p>

            <p>
              It demonstrates the ability to identify repetitive tasks and translate them into a
              focused web application while balancing usability, responsive design, persistent
              state, and print-specific requirements.
            </p>
          </section>

          <!-- Project Links -->

          <section class="project-section project-links">
            <h2>Project Links</h2>

            <div class="project-actions">
              <RouterLink :to="quickQrUrl" class="btn btn-primary">
                <i class="fa-solid fa-qrcode" aria-hidden="true"></i>
                Open Quick QR
              </RouterLink>

              <a
                v-if="githubRepo"
                :href="githubRepo"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-secondary"
              >
                <i class="fa-brands fa-github" aria-hidden="true"></i>
                View GitHub Repository
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
                title="Quick QR project demo"
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
