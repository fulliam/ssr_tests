<template>
  <section>
    <Quiz
      v-if="!showResults"
      :questions="questions"
      @finished="handleQuizFinish"
    />

    <Results
      v-else
      :result="results"
      @reset="showResults = false"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Quiz from '@/components/templates/quiz/index.vue';
import Results from '@/components/templates/result/index.vue';
import { useStore } from '@/store/quiz';

const store = useStore();

let questions = store.questions;
let showResults = ref(false);

const results = computed(() => {
  return showResults.value ? store.result : '';
});

const handleQuizFinish = async () => {
  await store.getResults();
  showResults.value = true;
};
</script>

<style scoped lang="scss">
section {
  display: flex;
  flex-direction: row;
  gap: 40px;
  width: 100%;
}
</style>