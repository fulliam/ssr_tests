<template>
  <div class="age">
    <h1>Ваш возраст?</h1>
    <div class="age__select">
      <div v-for="age in ages" :key="age">
        <button @click="setUserAge(age)">
          <span v-if="age === 27">Мне больше 27</span>
          <span v-else>Мне меньше 27</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/quiz';

const ages = ref([
  26,
  27
]);

const store = useStore();

const setUserAge = (value: number) => {
  store.setUserAge(value);
};
</script>

<style scoped lang="scss">
.age {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    animation: showIn 0.5s forwards;

    &__select {
        display: flex;
        flex-direction: column;;
        gap: 40px;
    }
}

h1 {
    background-color: #03BA7B75;
    border-radius: 20px;
    padding: 15px;
    user-select: none;
    @include Halvar-Breit(700, 56, #fff);
}

button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 20px;
    padding: 10px;
    cursor: pointer;
    box-shadow: 0 10px 20px #00000030;
    transition: all .6s;
    background-color: #f0f8ffa3;

    span {
        padding: 10px;
        @include Halvar-Breit(700, 32, $black);
    }

    &:hover {
        scale: 0.9;
        box-shadow: none;
    }
}
</style>