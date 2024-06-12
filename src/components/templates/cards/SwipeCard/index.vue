<template>
  <div class="demo">
    <header class="demo__header"></header>
    <div class="demo__content">
      <div class="demo__card-cont">
        <Card v-for="cat in cats" :key="cat.id" :cat="cat" />
      </div>
      <p class="demo__tip">Swipe left or right</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Card from '@/components/templates/cards/Card/index.vue';

const cats = ref([
  { id: 1, name: 'Hungry cat 6', color: 'brown' },
  { id: 2, name: 'Hungry cat 5', color: 'lime' },
  { id: 3, name: 'Hungry cat 4', color: 'cyan' },
  { id: 4, name: 'Hungry cat 3', color: 'indigo' },
  { id: 5, name: 'Hungry cat 2', color: 'blue' },
  { id: 6, name: 'Hungry cat', color: 'purple' },
  { id: 1, name: 'Hungry cat 6', color: 'brown' },
  { id: 2, name: 'Hungry cat 5', color: 'lime' },
  { id: 3, name: 'Hungry cat 4', color: 'cyan' },
  { id: 4, name: 'Hungry cat 3', color: 'indigo' },
  { id: 5, name: 'Hungry cat 2', color: 'blue' },
  { id: 6, name: 'Hungry cat', color: 'purple' },
  { id: 1, name: 'Hungry cat 6', color: 'brown' },
  { id: 2, name: 'Hungry cat 5', color: 'lime' },
  { id: 3, name: 'Hungry cat 4', color: 'cyan' },
  { id: 4, name: 'Hungry cat 3', color: 'indigo' },
  { id: 5, name: 'Hungry cat 2', color: 'blue' },
  { id: 6, name: 'Hungry cat', color: 'purple' },
  { id: 1, name: 'Hungry cat 6', color: 'brown' },
  { id: 2, name: 'Hungry cat 5', color: 'lime' },
  { id: 3, name: 'Hungry cat 4', color: 'cyan' },
  { id: 4, name: 'Hungry cat 3', color: 'indigo' },
  { id: 5, name: 'Hungry cat 2', color: 'blue' },
  { id: 6, name: 'Hungry cat', color: 'purple' }
]);

// onServerPrefetch(async () => {
//   await ...();
// });
</script>

<style scoped lang="scss">
$w: 30.6rem;
$h: 54rem;
$headerH: 6rem;
$cardW: 24rem;
$cardH: 32rem;
$cardTopH: 20.5rem;
$cardBtmH: $cardH - $cardTopH;
$imgSize: 10rem;

$purple: #7132B9;
$blue: #248CB6;
$indigo: #303F9F;
$cyan: #26C6DA;
$lime: #AFB42B;
$brown: #795548;

$orange: #FF945A;
$green: #B1DA96;

.demo {
  position: absolute;
  left: 50%;
  top: 50%;
  width: $w;
  height: $h;
  margin-left: $w/-2;
  margin-top: $h/-2;
  background: #F6F6F5;
  box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.2);

  &__header {
    height: $headerH;
    background: #002942;
  }

  &__content {
    overflow: hidden;
    position: relative;
    height: $h - $headerH;
    padding-top: 4.5rem;
    user-select: none;
  }

  &__card-cont {
    position: relative;
    width: $cardW;
    height: $cardH;
    margin: 0 auto 5rem;
  }

  &__tip {
    text-align: center;
    font-size: 2.2rem;
  }
}
</style>
