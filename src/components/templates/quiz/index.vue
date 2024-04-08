<template>
  <div v-if="questions && questions.length > 0" class="quiz">
    <Question
      :question="questions[currentQuestion].question"
      :answers="questions[currentQuestion].answers"
      :question-index="currentQuestion"
    />

    <div class="progress-dots">
      <div
        v-for="(question, index) in questions"
        :key="index"
        class="dot"
        :class="{ 'active-dot': index === currentQuestion }"
      >
      </div>
    </div>

    <div class="controls">
      <el-button
        type="primary"
        default
        :class="{ 'disabled': currentQuestion === 0 }"
        :disabled="currentQuestion === 0"
        @click="prevQuestion"
      >
        Prev
      </el-button>

      <el-button
        type="primary"
        default
        :class="{ 'disabled': currentQuestion === questions.length - 1 }"
        :disabled="currentQuestion === questions.length - 1"
        @click="nextQuestion"
      >
        Next
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Question from '@/components/templates/question/index.vue';

import { ref, defineProps } from 'vue';

const props = defineProps({
  questions: {
    type: Array,
    default: () => []
  }
});

let currentQuestion = ref(0);

const nextQuestion = () => {
  if (currentQuestion.value < props.questions.length - 1) {
    currentQuestion.value++;
  }
};

const prevQuestion = () => {
  if (currentQuestion.value > 0) {
    currentQuestion.value--;
  }
};

const emit = defineEmits(['finished']);

watchEffect(() => {
  const allAnswered = props.questions.every(
    (question) => question.answers.some((answer) => answer.value === true)
  );

  if (allAnswered) {
    emit('finished');
  }
});
</script>

<style scoped lang="scss">
.quiz {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  position: relative;

  .controls {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    width: 100%;

    button {
      background-color: $blue;
      border: none;
      border-radius: 10px;
      width: 100%;
      height: 45px;
      cursor: pointer;
      @include Halvar-Breit(700, 24, $white);
      transition: background-color 0.3s, scale 0.3s;

      &:hover {
        background-color: darken($blue, 10%);
      }

      &:active {
        scale: 0.85;
      }
    }

    .disabled {
      pointer-events: none;
      background-color: $grey;

      &:hover {
        background-color: $grey;
      }
    }
  }

  .progress-dots {
    display: flex;
    justify-content: center;
    gap: 10px;

    .dot {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background-color: $grey;
    }

    .active-dot {
      background-color: #21c2c2;
    }
  }
}
</style>