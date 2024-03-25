<template>
  <article>
    <h3>
      <span>{{ text }}</span>
      <el-switch
        v-model="isActive"
        size="large"
        active-color="#12cc49"
        inactive-color="#ea5670"
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
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    padding: 0 10px 0 10px;
    background-color: $violet;
    border: 2px solid $black;

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