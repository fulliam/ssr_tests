<template>
  <div class="question">
    <h2>{{ question }}</h2>
    <div
      v-for="(answer, index) in answers"
      :key="index"
      class="answers"
    >
      <Answer
        :text="answer.text"
        :description="answer.description"
        :model-value="answer.value"
        @update:model-value="updateSwitch(index, $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import Answer from '@/components/templates/answer/index.vue';
import { useStore } from '@/store/quiz';

const props = defineProps({
  question: {
    type: String,
    default: ''
  },
  answers: {
    type: Array,
    default: () => []
  },
  questionIndex: {
    type: Number,
    default: 0
  }
});

const store = useStore();

const updateSwitch = (answerIndex: number, value: boolean) => {
  store.updateAnswer(props.questionIndex, answerIndex, value);
};
</script>

<style scoped lang="scss">
.question {
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 80vh;

  .answers {
    transition: opacity 0.5s;
    animation: showIn 0.5s forwards;
  }

  @keyframes showIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
