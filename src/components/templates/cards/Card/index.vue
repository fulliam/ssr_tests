<template>
  <div class="demo__card">
    <div :class="'demo__card__top ' + cat?.color">
      <div class="demo__card__img"></div>
      <p class="demo__card__name">{{ cat?.name }}</p>
    </div>
    <div class="demo__card__btm">
      <p class="demo__card__we">Whatever</p>
    </div>
    <div class="demo__card__choice m--reject"></div>
    <div class="demo__card__choice m--like"></div>
    <div class="demo__card__drag"></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  cat: Object
});

const animating = ref(false);
const cardsCounter = ref(0);
const numOfCards = 6;
const decisionVal = 80;
let pullDeltaX = 0;
let deg = 0;
let $card, $cardReject, $cardLike;

const pullChange = () => {
  animating.value = true;
  deg = pullDeltaX / 10;
  $card.style.transform = `translateX(${pullDeltaX}px) rotate(${deg}deg)`;

  const opacity = pullDeltaX / 100;
  const rejectOpacity = (opacity >= 0) ? 0 : Math.abs(opacity);
  const likeOpacity = (opacity <= 0) ? 0 : opacity;
  $cardReject.style.opacity = rejectOpacity;
  $cardLike.style.opacity = likeOpacity;
};

const release = () => {
  if (pullDeltaX >= decisionVal) {
    $card.classList.add('to-right');
  } else if (pullDeltaX <= -decisionVal) {
    $card.classList.add('to-left');
  }

  if (Math.abs(pullDeltaX) >= decisionVal) {
    $card.classList.add('inactive');

    setTimeout(() => {
      $card.classList.add('below').remove('inactive to-left to-right');
      cardsCounter.value++;
      if (cardsCounter.value === numOfCards) {
        cardsCounter.value = 0;
        document.querySelectorAll('.demo__card').forEach(card => card.classList.remove('below'));
      }
    }, 300);
  }

  if (Math.abs(pullDeltaX) < decisionVal) {
    $card.classList.add('reset');
  }

  setTimeout(() => {
    $card.removeAttribute('style');
    $card.classList.remove('reset');
    $card.querySelector('.demo__card__choice').removeAttribute('style');

    pullDeltaX = 0;
    animating.value = false;
  }, 300);
};

onMounted(() => {
  const mouseDown = (e) => {
    if (animating.value) return;

    $card = e.target.closest('.demo__card');
    $cardReject = $card.querySelector('.demo__card__choice.m--reject');
    $cardLike = $card.querySelector('.demo__card__choice.m--like');
    const startX = e.clientX;

    const mouseMove = (e) => {
      const x = e.clientX;
      pullDeltaX = (x - startX);
      if (!pullDeltaX) return;
      pullChange();
    };

    const mouseUp = () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
      if (!pullDeltaX) return;
      release();
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);
  };

  window.addEventListener('mousedown', mouseDown);
});

onBeforeUnmount(() => {
  window.removeEventListener('mousedown', mouseDown);
});
</script>

<style lang="scss">
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

  &__card {
    z-index: 2;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transform-origin: 50% 100%;

    &.reset {
      transition: transform 0.3s;
      transform: translateX(0) !important;

      .demo__card__choice {
        transition: opacity 0.3s;
        opacity: 0 !important;;
      }
    }

    &.inactive {
      transition: transform 0.3s;
    }

    &.to-left {
      transform: translateX(-30rem) rotate(-30deg) !important;
    }

    &.to-right {
      transform: translate(30rem) rotate(30deg) !important;
    }

    &.below {
      z-index: 1;
    }

    &__top {
      height: $cardTopH;
      padding-top: 4rem;

      &.purple {
        background: $purple;
      }
      &.blue {
        background: $blue;
      }
      &.indigo {
        background: $indigo;
      }
      &.cyan {
        background: $cyan;
      }
      &.lime {
        background: $lime;
      }
      &.brown {
        background: $brown;
      }
    }

    &__img {
      overflow: hidden;
      width: $imgSize;
      height: $imgSize;
      margin: 0 auto 1.5rem;
      border-radius: 50%;
      border: 0.5rem solid #ffffff;
      background-image: url('//s3-us-west-2.amazonaws.com/s.cdpn.io/142996/profile/profile-512_5.jpg');
      background-size: cover;
    }

    &__name {
      text-align: center;
      font-size: 2rem;
      font-weight: bold;
      color: #fff;
    }

    &__btm {
      height: $cardBtmH;
      background: #FFFFFF;
    }

    &__we {
      text-align: center;
      font-size: 2.2rem;
      line-height: $cardBtmH;
    }

    &__choice {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;

      &:before {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        width: 2rem;
        height: 2rem;
        margin-left: -1rem;
        color: #fff;
        border-radius: 50%;
        box-shadow: -2rem -3rem #fff, 2rem -3rem #fff;
      }

      &:after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        width: 4rem;
        height: 1.5rem;
        margin-left: -2rem;
        border: 0.6rem solid #fff;
        border-bottom: none;
        border-top-left-radius: 1.5rem;
        border-top-right-radius: 1.5rem;
      }

      &.m--reject {
        background: $orange;
      }
      &.m--like {
        background: $green;

        &:after {
          transform: scaleY(-1);
        }
      }
    }

    &__drag {
      z-index: 5;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      cursor: grab;
    }
  }
}
</style>