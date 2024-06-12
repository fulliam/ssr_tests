<template>
  <!-- <img class="question-img" v-if="props.src" :src="props.src" :alt="props.alt" /> -->

  <div class="question">
    <h2 v-html="props.question"></h2>

    <article>
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
        <!-- :style="{ backgroundImage: `url(${props.src})`}" -->
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import Answer from '@/components/templates/answer/index.vue';
import { useStore } from '@/store/quiz';
// import chechik from '@/assets/images/chechick.jpg';

const props = defineProps({
  // src: {
  //   type: String,
  //   default: chechik
  // },
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
  width: 100%;
  // height: 100vh;
  gap: 20px;

  @include phone {
      gap: 0;
      height: 100%;
  }

  article {
    min-height: 400px;
    // max-height: 70vh;
    height: 65vh;
    width: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @include phone {
      gap: 0;
    }
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
    text-align: center;
    background: #00a485;
    max-height: 80px;
    min-height: 80px;
    padding: 10px;
    border-radius: 12px;
    position: relative;
    // letter-spacing: 5px;
    user-select: none;
    @include Halvar-Breit(500, 34, #fff);

    @include smallDesktop {
      @include Halvar-Breit(500, 26, #fff);
    }

    @include tablet {
      @include Halvar-Breit(500, 24, #fff);
    }

    @include phone {
      margin: 0;
      margin-bottom: 20px;

      @include Halvar-Breit(400, 20, #fff);
    }
  }

  .answers {
    transition: opacity 0.5s;
    animation: showIn 0.5s forwards;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    .active {
      background-color: #00a485;
    }
  }
}
</style>
