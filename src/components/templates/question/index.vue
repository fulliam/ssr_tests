<template>
  <div class="question">
    <h2 v-html="question"></h2>
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

const emit = defineEmits([
  'nextStep'
]);

const store = useStore();

const updateSwitch = (answerIndex: number, value: boolean) => {
  store.updateAnswer(props.questionIndex, answerIndex, value);
  emit('nextStep');
};
</script>

<style scoped lang="scss">
.question {
  display: flex;
  flex-direction: column;
  gap: 40px;
  height: 85vh;

  h2 {
    display: flex;
    flex-direction: column;
    background: #00a485;
    padding: 10px;
    border: 2px solid black;
    border: dashed;
    margin: 20px;
    box-shadow: 10px 10px 0px black;
    letter-spacing: 5px;
    @include Halvar-Breit(500, 32, $black);
  }

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
