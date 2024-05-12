<template>
  <div class="sex">
    <h1>Ваш пол?</h1>
    <div class="sex__select">
      <div v-for="sex in sexs" :key="sex">
        <button :class="sex" @click="setUserSex(sex)">
          <el-icon v-if="sex === 'женщина'" :size="120" :color="'#f6baff'"><Female /></el-icon>
          <el-icon v-else :size="120" :color="'#53c6ff'"><Male /></el-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store/quiz';

const sexs = ref([
  'мужчина',
  'женщина'
]);

const store = useStore();

const setUserSex = (value: string) => {
  store.setUserSex(value);
};
</script>

<style scoped lang="scss">
.sex {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;

    &__select {
        display: flex;
        flex-direction: row;
        gap: 40px;
    }
}

h1 {
    background-color: #03BA7B75;
    border-radius: 20px;
    padding: 15px;
    user-select: none;
    @include Halvar-Breit(700, 56, $black);
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

    &:hover {
        scale: 0.9;
        box-shadow: none;
    }
}

.мужчина {
    background-color: #2398ff99;
}

.женщина {
    background-color: #ff64ee9e;
}
</style>