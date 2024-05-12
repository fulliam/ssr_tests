<template>
  <section>
    <Sex
      v-if="!store.sex"
    />
    <Age
      v-if="!store.age && store.sex"
    />
    <Quiz
      v-if="!showResults && (store.sex && store.age)"
      :questions="questions"
      @finished="handleQuizFinish"
    />
    <Results
      v-if="showResults && (store.sex && store.age)"
      :result="results"
      @reset="showResults = false"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Sex from '@/components/templates/sex/index.vue';
import Age from '@/components/templates/age/index.vue';
import Quiz from '@/components/templates/quiz/index.vue';
import Results from '@/components/templates/result/index.vue';
import { useStore } from '@/store/quiz';

const store = useStore();

const questions = ref([]);
const showResults = ref(false);

const results = computed(() => {
  return showResults.value ? store.result : '';
});

const handleQuizFinish = async (isFinish: boolean) => {
  if (isFinish && questions.value.length > 0) {
    await store.getResults().then(() => {
      showResults.value = true;
    });
  }
};

const handleGetQuestions = async () => {
  await store.getQuestions().then(() => {
    questions.value = store.questions;
    showResults.value = false;
  });
};

onMounted(() => {
  handleGetQuestions();
});
</script>

<style scoped lang="scss">
section {
  display: flex;
  flex-direction: row;
  gap: 40px;
  width: 100%;
  height: 90vh;
}
</style>