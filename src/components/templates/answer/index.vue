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

const titleColors = {
  'Red': '#ff0063',
  'Green': '#50b2ea',
  'Blue': '#50ea53',
  'Yes' : '#2bb116',
  'No': '#bc7912'
};
</script>

<style scoped lang="scss">
button {
  --el-color-black: black;
    display: flex;
    flex-direction: column;
    // border-radius: 10px;
    padding: 20px;
    background: rgba(206, 206, 186, 0.075);
    border: 2px solid --el-color-black;
    box-shadow: 15px 15px 0px #9721c2;
    position: relative;
    z-index: 2;
    animation: slideAnimation-473dba16 3s forwards;
    cursor: pointer;
    width: 90%;
    height: 20%;
    transition: background 0.4s, color 0.4s;
    left: -2%;

    @include phone {
        margin: 0;
        padding: 40px;
        white-space: nowrap;
    }

    &:hover {
      background-color: lighten($violet, 20%);
    }

    &:active {
      background-color: lighten($green, 20%);
    }

    @keyframes slideAnimation {
      0% {
        transform: translateX(-110%);
        box-shadow: 350vw 15px 0px $violet;
      }
      100% {
        transform: translateX(0);
        box-shadow: 15px -15px 0px $violet;
      }
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