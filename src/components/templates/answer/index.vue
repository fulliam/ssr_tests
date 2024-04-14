<template>
  <button @click="handleChange">
    <h3>
      <span :style="{ color: titleColors[text] }">
        {{ text }}
      </span>
    </h3>
    <p>
      {{ description }}
    </p>
  </button>
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

const handleChange = () => {
  emit('update:modelValue', true);
};

const titleColors = ref({
  'Red': '#ff0063',
  'Green': '#50b2ea',
  'Blue': '#50ea53',
  'Yes' : '#2bb116',
  'No': '#bc7912'
});
</script>

<style scoped lang="scss">
button {
  --el-color-black: black;
    display: flex;
    flex-direction: column;
    padding: 25px;
    background: #a607e099;
    border: none;
    border-radius: 12px;
    position: relative;
    z-index: 2;
    animation: showIn 0.5s forwards;
    cursor: pointer;
    width: 100%;
    gap: 20px;
    transition: scale 0.4s;

    @include phone {
        margin: 0;
        white-space: nowrap;
    }

    &:active {
      scale: 0.95;
    }

    h3 {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 0;
    }

    span {
        @include Irish-Grover(400, 34, $black, 1.5);
    }

    p {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      @include Irish-Grover(400, 28, $black, 1.5);

      @include phone {
          @include Irish-Grover(400, 14, $black, 1.5);
      }
    }
}
</style>