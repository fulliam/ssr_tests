<template>
  <div class="results">
    <h2>Вы — {{ result }}</h2>
    <button @click="reset">
      <el-icon :size="126" :color="'white'"><Refresh /></el-icon>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/quiz';

const store = useStore();

defineProps({
  result: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['reset']);

const reset = () => {
  store.resetState();
  emit('reset');
};

const createConfetti = () => {
  window.confetti({
    angle: 90, spread: 75,
    particleCount: 100,
    origin: { x: Math.random(), y: Math.random() }
  });
};

const generateConfetti = () => {
  for (let i = 0; i < 10; i++) {
    createConfetti();
  }
};

onBeforeMount(() => {
  generateConfetti();
});
</script>

<style scoped lang="scss">
.results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 20px;
  @include Halvar-Breit(700, 48, $black);
}

h2 {
  text-align: center;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  transition: all 1.6s;

  &:hover {
    rotate: -1080deg;
  }
}
</style>