<template>
  <article>
    <h3>
      <span>{{ text }}</span>
      <el-switch
        v-model="isActive"
        size="large"
        active-color="#00a485"
        inactive-color="#21c2c2"
        @change="handleChange"
      />
    </h3>
    <p>
      {{ description }}
      <!-- <el-rate v-model="rate" :colors="colors" /> -->
    </p>
  </article>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  }
});

const emit = defineEmits([
  'update:modelValue'
]);

let isActive = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    isActive.value = newValue;
  },
  { immediate: true }
);

const handleChange = (value: boolean) => {
  emit('update:modelValue', value);
};

// const rate = ref(0);

// const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900']);
</script>

<style scoped lang="scss">
article {
    --el-color-black: black;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 0 10px 0 10px;
    background: $yellow;
    border: 2px solid black;
    box-shadow: 15px 15px 0px $violet;
    position: relative;
    z-index: 2;
    animation: slideAnimation 3s forwards;

    @keyframes slideAnimation {
      0% {
        transform: translateX(-110%);
        box-shadow: 350vw 15px 0px $violet;
      }
      100% {
        transform: translateX(0);
        box-shadow: 15px -15px 0px $violet;
      }
      // 75% {
      //   transform: translateX(0);
      //   box-shadow: 15px -15px 0px $violet;
      // }
      // 100% {
      //   transform: translateX(110%);
      //   box-shadow: -350vw 15px 0px $violet;
      // }
    }

    .el-switch {
      transform: scale(2);
      margin-top: 15px;
      margin-right: 40px;
    }

    h3 {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 0;
    }

    span {
        @include Halvar-Breit(500, 36, $black);
    }

    p {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      @include Golos-Text(400, 24, $black);
    }
}
</style>