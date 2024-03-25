<template>
  <div class="results">
    <h2>Your Results</h2>
    <p>{{ result }}</p>
    <button @click="reset">Refresh</button>
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
</script>

<style scoped lang="scss">
.results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 20px;
}
</style>