<script setup>
import MainNavbar from '@/components/MainNavbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import TickerSection from '@/components/TickerSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import SkillSection from '@/components/SkillSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import ContactSection from '@/components/ContactSection.vue'
</script>

<template>
  <div class="home">
    <MainNavbar />
    <main>
      <HeroSection />
      <TickerSection />
      <AboutSection />
      <TickerSection />
      <SkillSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;

  background:
    radial-gradient(1200px 700px at 20% 10%, rgba(255, 93, 74, 0.08), transparent 60%),
    radial-gradient(900px 600px at 80% 30%, rgba(255, 93, 74, 0.06), transparent 55%),
    linear-gradient(180deg, rgba(7, 11, 20, 0.92), rgba(7, 11, 20, 0.72));
}
</style>
