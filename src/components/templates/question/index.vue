<template>
  <!-- <img class="question-img" v-if="props.src" :src="props.src" :alt="props.alt" /> -->

  <div class="question">
    <h2 v-html="props.question"></h2>
    <div
      v-for="(answer, index) in props.answers"
      :key="index"
      class="answers"
    >
      <Answer
        :text="answer.text"
        :description="answer.description"
        :model-value="answer.value"
        :class="{
          'active': answer.value,
        }"
        @update:model-value="updateSwitch(index, $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import Answer from '@/components/templates/answer/index.vue';
import { useStore } from '@/store/quiz';
import chechik from '@/assets/images/chechick.jpg';

const props = defineProps({
  src: {
    type: String,
    default: chechik
  },
  alt: {
    type: String,
    default: 'test from fu11i@m'
  },
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
  width: 95%;

  @include phone {
      gap: 00px;
      height: 100%;
  }

  &-img {
    height: 50%;
    width: 95%;
    display: flex;
    object-fit: contain;
  }

  h2 {
    display: flex;
    align-items: center;
    // flex-direction: column;
    background: #00a485;
    max-height: 80px;
    min-height: 80px;
    padding: 10px;
    border-radius: 12px;
    position: relative;
    letter-spacing: 5px;
    @include Halvar-Breit(500, 32, $black);

    @include smallDesktop {
      @include Halvar-Breit(500, 24, $black);
    }

    @include tablet {
      @include Halvar-Breit(500, 18, $black);
    }

    @include phone {
      margin: 0;
      margin-bottom: 20px;

      @include Halvar-Breit(400, 18, $black);
    }
  }

  .answers {
    transition: opacity 0.5s;
    animation: showIn 0.5s forwards;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    max-height: 100px;
    min-height: 100px;

    .active {
      background-color: #00a485;
    }
  }
}
</style>
