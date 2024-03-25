<template>
  <button @click="handleThemeSwitcher">
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

button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
