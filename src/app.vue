<template>
  <button class="theme-switcher" @click="handleThemeSwitcher">
    <el-icon v-show="currentTheme.name === 'dark'" :size="32"><Moon /></el-icon>
    <el-icon v-show="currentTheme.name === 'light'" :size="32"><Sunny /></el-icon>
    <el-icon v-show="currentTheme.name === 'green'" :size="32"><Cloudy /></el-icon>
    <el-icon v-show="currentTheme.name === 'purple'" :size="32"><Key /></el-icon>
  </button>
  <div class="container">
    <router-view v-slot="{ Component }">
      <Suspense>
        <component :is="Component" />
      </Suspense>
    </router-view>
  </div>
  <div class="lamp">
    <div class="lava">
      <div class="blob"></div>
      <div class="blob"></div>
      <div class="blob"></div>
      <div class="blob"></div>
      <div class="blob"></div>
      <div class="blob"></div>
      <div class="blob"></div>
      <div class="blob"></div>
      <div class="blob top"></div>
      <div class="blob bottom"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
// TODO: add pagination && uuid && DB for routing ssr on swiper lists after change
const themes = [
  { name: 'light', background: '#dab30f' },
  { name: 'dark', background: '#C55353' },
  { name: 'green', background: '#228B22' },
  { name: 'purple', background: '#800080' }
];

let currentThemeIndex = ref(0);
let currentTheme = ref(themes[currentThemeIndex.value]);

const handleThemeSwitcher = () => {
  const root = document.documentElement;

  currentThemeIndex.value = (currentThemeIndex.value + 1) % themes.length;

  currentTheme.value = themes[currentThemeIndex.value];
  root.style.setProperty('color-scheme', currentTheme.value.name);
  root.style.background = currentTheme.value.background;
};

onMounted(() => {
  const root = document.documentElement;

  root.style.setProperty('color-scheme', currentTheme.value.name);
  root.style.background = currentTheme.value.background;
});

</script>

<style scoped lang="scss">
@import './assets/styles/index.scss';

// :root {
//   overflow: scroll;
//   scroll-behavior: smooth;
//   scrollbar-base-color: #f8b1ff;
//   scrollbar-track-color: aqua;
//   ::-webkit-scrollbar,
//   ::-webkit-scrollbar-button,
//   ::-webkit-scrollbar-track,
//   ::-webkit-scrollbar-track-piece,
//   ::-webkit-scrollbar-thumb,
//   ::-webkit-scrollbar-corner,
//   ::-webkit-resizer {
//     background: lighten($violet, 10%);

//     &:hover{
//       background: lighten($violet, 10%);
//     }
//   }

//   ::-webkit-scrollbar-thumb {
//     background: $violet;
//   }

//   ::-webkit-scrollbar-thumb:hover {
//     background: darken($violet, 20%);
//   }
// }

ul {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;

  li {
    display: flex;
    border-radius: 50%;
    height: 42px;
    width: 42px;
    border: 2px solid white;
  }
}

h3 {
  color: white;
}

.theme-switcher {
  position: fixed;
  right: 5px;
  top: 10px;
  background: $violet;
  border: 2px solid $violet;
  padding: 5px;
  height: 42px;
  width: 42px;
  border-radius: 6px;
  cursor: pointer;
  transition: color 0.3s, background 0.3s;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: white;
    background: #00a485;
  }
}
</style>
