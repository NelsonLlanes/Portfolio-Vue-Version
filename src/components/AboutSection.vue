<script setup></script>

<template>
  <section id="about" class="section container">
    <div class="about-grid">
      <div class="about-left">
        <div class="section-mark">
          <span class="dot top"></span>
          <span class="line"></span>
          <span class="dot bottom"></span>
        </div>

        <div class="about-content">
          <h2 class="section-title">About me</h2>
          <p class="muted">
            I’m an entry-level Full-Stack Developer focused on building practical, user-centered web
            applications. I enjoy transforming ideas into functional solutions by writing clean,
            readable code and breaking down problems into manageable steps.
          </p>
          <p>
            I come from an operations and inventory background, which has shaped my structured,
            detail-oriented approach to software development. I value clarity, organization, and
            continuous learning, and I’m comfortable working both independently and in collaborative
            environments.
          </p>
          <div class="social">
            <a
              href="https://github.com/NelsonLlanes"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
              ><i class="fa-brands fa-github"></i
            ></a>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=nelsoncanada23@gmail.com"
              aria-label="Email"
              target="_blank"
              rel="noopener noreferrer"
              ><i class="fa-regular fa-envelope"></i
            ></a>
          </div>
        </div>
      </div>

      <div class="about-cards">
        <article class="about-card">
          <div class="about-card__icon">
            <!-- Card icon -->
            <i class="fa-solid fa-bullseye"></i>
          </div>
          <h3 class="about-card__title">Current Focus</h3>
          <p class="about-card__text">
            Building small full-stack projects, improving problem-solving, and strengthening
            fundamentals.
          </p>
        </article>

        <article class="about-card">
          <div class="about-card__icon">
            <!-- Card icon -->
            <i class="fa-solid fa-rocket"></i>
          </div>
          <h3 class="about-card__title">Next Goals</h3>
          <p class="about-card__text">
            Gain real-world experience, collaborate on projects, and move into a junior developer
            role.
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 46px;
  align-items: start;
}

.about-left {
  display: grid;
  grid-template-columns: 26px 1fr;
  gap: 18px;
  align-items: stretch;
}

.section-mark {
  position: relative;
  width: 26px;
  display: flex;
  justify-content: center;
}
.section-mark .line {
  width: 2px;
  height: 100%;
  background: rgba(255, 93, 74, 0.55);
  border-radius: 999px;
}
.section-mark .dot {
  position: absolute;
  width: 10px;
  height: 10px;
  background: var(--color-primary);
  border-radius: 50%;
  left: 50%;
  transform: translateX(-50%);
}
.section-mark .dot.top {
  top: 6px;
}
.section-mark .dot.bottom {
  bottom: 6px;
  opacity: 0.95;
}

.about-content .section-title {
  margin-top: 4px;
}

.social {
  display: flex;
  gap: 18px;
  margin-top: 20px;
  color: rgba(233, 238, 252, 0.78);
}
.social a {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(233, 238, 252, 0.12);
  background: rgba(255, 255, 255, 0.02);
}
.social a:hover {
  border-color: rgba(255, 93, 74, 0.35);
  color: rgba(233, 238, 252, 0.92);
}

.about-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  padding-top: 14px;
}

.stat-num {
  font-size: 44px;
  font-weight: 800;
  color: var(--color-primary);
  letter-spacing: -0.6px;
  line-height: 1.05;
}
.stat-label {
  margin-top: 8px;
  font-size: 12px;
  letter-spacing: 2px;
  color: rgba(233, 238, 252, 0.7);
  text-transform: uppercase;
}
.plus,
.pct {
  font-size: 26px;
  font-weight: 800;
}

.about-cards {
  display: grid;
  gap: 16px;
}

.about-card {
  padding: 18px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.about-card::before {
  content: '';
  position: absolute;
  inset: -40px -40px auto auto;
  width: 160px;
  height: 160px;
  background: radial-gradient(circle, rgba(255, 93, 74, 0.18), transparent 60%);
  filter: blur(2px);
}

.about-card__icon {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  color: var(--color-primary);
  background: rgba(255, 93, 74, 0.1);
  border: 1px solid rgba(255, 93, 74, 0.18);
  margin-bottom: 10px;
}

.about-card__title {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 700;
}

.about-card__text {
  margin: 0;
  color: rgba(233, 238, 252, 0.72);
  line-height: 1.7;
}

.about-card:hover {
  border-color: rgba(255, 93, 74, 0.22);
  transform: translateY(-1px);
  transition:
    transform 160ms ease,
    border-color 160ms ease;
}
</style>
