<script setup></script>

<template>
  <section id="skills" class="section container">
    <div class="section-head center">
      <h2 class="section-title center">Skills</h2>
      <div class="underline"></div>
    </div>

    <div class="skills-grid">
      <!-- Frontend -->
      <article class="skill-card">
        <div class="skill-header">
          <div class="skill-ic">
            <i class="fa-solid fa-code"></i>
          </div>

          <div>
            <h3 class="skill-title">Frontend Development</h3>
            <p class="skill-subtitle">Interfaces & component architecture</p>
          </div>
        </div>

        <div class="skill-tech">
          <span><i class="fa-brands fa-vuejs"></i> Vue.js</span>
          <span><i class="fa-brands fa-js"></i> JavaScript</span>
          <span><i class="fa-brands fa-html5"></i> HTML</span>
          <span><i class="fa-brands fa-css3-alt"></i> CSS</span>
        </div>

        <p class="skill-description">
          Responsive interfaces, reusable components, and maintainable UI structures focused on
          clarity and usability.
        </p>
      </article>

      <!-- Backend -->
      <article class="skill-card">
        <div class="skill-header">
          <div class="skill-ic">
            <i class="fa-solid fa-server"></i>
          </div>

          <div>
            <h3 class="skill-title">Backend & Logic</h3>
            <p class="skill-subtitle">Application functionality</p>
          </div>
        </div>

        <div class="skill-tech">
          <span><i class="fa-brands fa-php"></i> PHP</span>
          <span><i class="fa-brands fa-python"></i> Python</span>
          <span><i class="fa-solid fa-database"></i> SQL</span>
        </div>

        <p class="skill-description">
          Server-side functionality, application logic, data handling, and communication between
          frontend and backend systems.
        </p>
      </article>

      <!-- Tools -->
      <article class="skill-card">
        <div class="skill-header">
          <div class="skill-ic">
            <i class="fa-solid fa-screwdriver-wrench"></i>
          </div>

          <div>
            <h3 class="skill-title">Development Tools</h3>
            <p class="skill-subtitle">Workflow & integration</p>
          </div>
        </div>

        <div class="skill-tech">
          <span><i class="fa-brands fa-git-alt"></i> Git</span>
          <span><i class="fa-brands fa-github"></i> GitHub</span>
          <span><i class="fa-solid fa-plug"></i> REST APIs</span>
        </div>

        <p class="skill-description">
          Version control, project organization, API integration, and structured development
          workflows.
        </p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.skill-card {
  padding: 24px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  position: relative;
  overflow: hidden;
  transition:
    transform 160ms ease,
    border-color 160ms ease;
}

.skill-card::before {
  content: '';
  position: absolute;
  inset: -50px -50px auto auto;
  width: 180px;
  height: 180px;
  background: radial-gradient(circle, rgba(255, 93, 74, 0.14), transparent 60%);
}

.skill-card:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 93, 74, 0.3);
}

.skill-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
}

.skill-ic {
  width: 46px;
  height: 46px;
  flex-shrink: 0;
  border-radius: 14px;
  display: grid;
  place-items: center;
  color: var(--color-primary);
  background: rgba(255, 93, 74, 0.1);
  border: 1px solid rgba(255, 93, 74, 0.18);
  font-size: 18px;
}

.skill-title {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
}

.skill-subtitle {
  margin: 3px 0 0;
  font-size: 12px;
  color: rgba(233, 238, 252, 0.55);
}

.skill-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.skill-tech span {
  display: flex;
  align-items: center;
  gap: 7px;

  padding: 7px 11px;
  border-radius: 8px;

  font-size: 12px;
  font-weight: 600;

  color: rgba(233, 238, 252, 0.85);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.skill-tech i {
  color: var(--color-primary);
}

.skill-description {
  margin: 0;
  color: rgba(233, 238, 252, 0.68);
  font-size: 13px;
  line-height: 1.7;
}

/* Tablet */
@media (max-width: 900px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .skill-card {
    padding: 20px;
  }
}
</style>
