<template>
  <span class="questions-counter">
    {{ currentQuestion + 1 }}/{{ questions.length }}
  </span>

  <div v-if="questions && questions.length > 0" class="quiz">
    <Question
      :src="questions[currentQuestion].src"
      :alt="questions[currentQuestion].alt"

      :question="questions[currentQuestion].question"
      :answers="questions[currentQuestion].answers"
      :question-index="currentQuestion"
      @next-step="nextQuestion"
    />

    <div class="controls">
      <el-button
        type="primary"
        default
        :class="{ 'disabled': currentQuestion === 0 }"
        :disabled="currentQuestion === 0"
        @click="prevQuestion"
      >
        Предыдущий
      </el-button>

      <el-button
        type="primary"
        default
        :class="{ 'disabled': currentQuestion === questions.length - 1 }"
        :disabled="currentQuestion === questions.length - 1"
        @click="nextQuestion"
      >
        Следующий
      </el-button>
    </div>

    <div class="progress-dots">
      <div
        v-for="(question, index) in questions"
        :key="index"
        class="dot"
        :class="{
          'active': index === currentQuestion,
          'checked': question.answers.some((answer: any) => answer.value === true),
          'active-checked': (index === currentQuestion && question.answers.some((answer: any) => answer.value === true))
        }"
        @click="jumpToQuestion(index)"
      >
      </div>
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

const jumpToQuestion = (index: number) => {
  currentQuestion.value = index;
};

const emit = defineEmits(['finished']);

watchEffect(() => {
  const allAnswered = props.questions.every(
    (question) => question.answers.some((answer) => answer.value === true)
  );

  if (allAnswered) {
    emit('finished', true);
  } else {
    emit('finished', false);
  }
});
</script>

<style scoped lang="scss">
.questions-counter {
  position: fixed;
  right: 5px;
  top: 60px;
  background: $violet;
  border: 2px solid $violet;
  // padding: 5px;
  height: 38px;
  width: 38px;
  border-radius: 6px;
  cursor: pointer;
  transition: color 0.3s, background 0.3s;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  @include Halvar-Breit(700, 12, $white);
}

.quiz {
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100%;
  min-width: 90vw;
  // position: relative;
  // padding: 28px;
  // padding-top: 0;

  @include phone {
      margin: 0;
      padding: 30px 15px 30px 0px;
      padding-top: 0;
  }

  .controls {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    width: 100%;

    button {
      background-color: $blue;
      border-radius: 10px;
      border: none;
      width: 100%;
      height: 45px;
      cursor: pointer;
      user-select: none;
      transition: background-color 0.3s, scale 0.3s; //, box-shadow 0.3s;
      @include Halvar-Breit(700, 16, $white);

      &:hover {
        background-color: darken($blue, 10%);
      }

      &:active {
        // box-shadow: none;
        scale: 0.95;
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

    @include phone {
      gap: 6px;
    }

    .dot {
      width: 24px;
      height: 24px;
      border-radius: 4px;
      background-color: $grey;
      cursor: pointer;

      @include phone {
        width: 16px;
        height: 16px;
      }
    }

    .active {
      background-color: $violet;
    }

    .checked {
      background-color: #00a485;
    }

    .active-checked {
      background-color: #00a485;
      box-shadow: inset 2px 0px 0px $violet, inset 0px 2px 0px $violet, inset -2px 0px 0px $violet, inset 0px -2px 0px $violet,;
    }
  }
}
</style>