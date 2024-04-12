<template>
  <button class="theme-switcher" @click="handleThemeSwitcher">
    <el-icon v-show="currentTheme === 'dark'" :size="32"><Moon /></el-icon>
    <el-icon v-show="currentTheme === 'light'" :size="32"><Sunny /></el-icon>
  </button>
  <div class="container">
    <router-view v-slot="{ Component }">
      <Suspense>
        <component :is="Component" />
      </Suspense>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

let currentTheme = ref('light');

const handleThemeSwitcher = () => {
  const root = document.documentElement;
  let theme = getComputedStyle(root).getPropertyValue('color-scheme').trim();

  if (theme === 'dark') {
    root.style.setProperty('color-scheme', 'light');
    currentTheme.value = 'light';
  } else {
    root.style.setProperty('color-scheme', 'dark');
    currentTheme.value = 'dark';
  }
};

onMounted(() => {
  const root = document.documentElement;
  currentTheme.value = getComputedStyle(root).getPropertyValue('color-scheme').trim();
});
</script>

<style scoped lang="scss">
@import './assets/styles/index.scss';

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
  position: absolute;
  right: 5px;
  top: 5px;
  background: #f8b1ff;
  border: 5px solid $violet;
  padding: 5px;
  height: 42px;
  width: 42px;
  min-width: 42px;
  min-height: 42px;
  border-radius: 6px;
  cursor: pointer;
  transition: color 0.3s, background 0.3s;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: white;
    background: darken(#f8b1ff, 20%);
  }
}
</style>
