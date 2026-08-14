<script setup></script>

<template>
  <section class="ticker">
    <div class="ticker-inner">
      <span>HTML5</span>
      <span>CSS</span>
      <span>JAVASCRIPT</span>
      <span>Python</span>
      <span>GIT</span>
      <span>php</span>
      <span>React</span>
      <span>Django</span>
      <span>Vue</span>
      <span>Tailwind Css</span>
      <span>bootstrap</span>
      <span>JQuery</span>
      <span>MySQL</span>
      <span>GITHUB</span>
      <span>VS Code</span>
      <span>PhpMyAdmin</span>
      <span>HTML5</span>
      <span>CSS</span>
      <span>JAVASCRIPT</span>
      <span>Python</span>
      <span>GIT</span>
      <span>php</span>
      <span>React</span>
      <span>Django</span>
      <span>Vue</span>
      <span>Tailwind Css</span>
      <span>bootstrap</span>
      <span>JQuery</span>
      <span>MySQL</span>
      <span>GITHUB</span>
      <span>VS Code</span>
      <span>PhpMyAdmin</span>
    </div>
  </section>
</template>

<style scoped>
.ticker {
  margin-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(7, 11, 20, 0.55);
  overflow: hidden;
}

.ticker-inner {
  display: inline-flex;
  gap: 56px;
  padding: 16px 24px;
  white-space: nowrap;
  animation: ticker 18s linear infinite;
  opacity: 0.9;
}

.ticker-inner span {
  font-size: 12px;
  letter-spacing: 3px;
  color: rgba(233, 238, 252, 0.65);
  text-transform: uppercase;
}

@keyframes ticker {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
</style>
