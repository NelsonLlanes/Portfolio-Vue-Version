<script setup></script>

<template>
  <section class="hero container">
    <div class="hero-left">
      <p class="hero-kicker">Hello.</p>

      <h1 class="hero-title">
        I’m <br />
        <span class="hero-title-strong">Nelson Llanes</span><br />
        <span class="hero-accent">Web</span><br />
        <span class="hero-accent">Developer</span>
      </h1>
      <p class="hero-kicker">Full Stack</p>

      <div class="hero-cta">
        <a class="btn btn-primary" href="#contact">Got a project?</a>
        <a
          class="btn btn-ghost"
          href="../assets/files/CV-Nelson-Esteban-Llanes-Suarez.pdf"
          download
        >
          My resume
        </a>
      </div>
    </div>

    <div class="hero-right">
      <div class="avatar-ring">
        <!-- Profile image -->
        <img src="../assets/images/profile-pic.png" alt="Nelson Llanes" width="430" height="430" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: calc(100vh - 78px);
  padding: 56px 0 24px;

  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 60px;
}

.hero-kicker {
  margin: 0 0 10px;
  color: rgba(233, 238, 252, 0.82);
  font-weight: 500;
}

.hero-title {
  margin: 0;
  font-size: clamp(42px, 4.8vw, 72px);
  line-height: 1.05;
  letter-spacing: -0.6px;
}

.hero-title-strong {
  color: rgba(233, 238, 252, 0.95);
}

.hero-accent {
  color: var(--color-primary);
}

.hero-cta {
  margin-top: 26px;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.avatar-ring {
  width: min(430px, 86vw);
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  padding: 22px;
  background: radial-gradient(circle at 50% 50%, rgba(255, 93, 74, 0.08), rgba(255, 93, 74, 0) 60%);
}

.avatar-ring::before,
.avatar-ring::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid rgba(255, 93, 74, 0.25);
  transform: scale(1.12);
}

.avatar-ring::after {
  transform: scale(1.28);
  opacity: 0.55;
}

.avatar-ring img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 20%;
  border-radius: 50%;
  border: 10px solid rgba(0, 0, 0, 0.35);
  box-shadow: var(--shadow-default);
  filter: saturate(0.95) contrast(1.05);
  transform: translateX(-5%);
}

.btn-ghost {
  background: transparent;
  border-color: rgba(233, 238, 252, 0.18);
  color: rgba(233, 238, 252, 0.9);
}

.btn-ghost:hover {
  border-color: rgba(233, 238, 252, 0.32);
  transform: translateY(-1px);
}

@media (min-width: 768px) {
  .hero {
    grid-template-columns: 1.15fr 0.85fr;
  }
}
</style>
