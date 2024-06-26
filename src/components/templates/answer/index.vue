<template>
  <!-- <button @click="handleChange">
    <h3>
      <span>
      </span>
    </h3>
    <p>
    </p>
  </button> -->

  <div class="card" @click="handleChange">
    <div class="content">
      <!-- <div class="img"><img src="https://unsplash.it/200/200" /></div> -->
      <div class="cardContent">
        <h3 :style="{ color: titleColors[text] }">
          {{ text }}
          <br />
          <span>
            {{ description }}
          </span>
        </h3>
      </div>
    </div>
  </div>
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

const titleColors = ref<any>({
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
    padding: 20px;
    border: none;
    border-radius: 12px;
    position: relative;
    z-index: 2;
    animation: showIn 0.5s forwards;
    cursor: pointer;
    width: 100%;
    height: 300px;
    gap: 20px;
    border-radius: 20px;
    transition: scale 0.4s;
    text-align: start;
    background-size: 50%;
    background-position: 120% 30%;
    background-repeat: no-repeat;

    &:active {
      scale: 0.95;
    }

    h3 {
      margin: 0;
      width: 50%;
      white-space: normal;
    }

    span {
        word-wrap: break-word;
        @include Halvar-Breit(400, 18, $black, 1.5);
    }
}

@mixin displayFlex($justify,$align,$direction) {
    display: flex;
    justify-content: $justify;
    align-items: $align;
    flex-direction: $direction;
}

@keyframes colorful{
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

body {
  position: relative;
  overflow: hidden;
  @include displayFlex(center, center, column);

  .container {
    width: 100%;
    height: 100%;

    .card {
      position: relative;
      width: 80%;
      height: 60px;
      margin: 10px;
      background: rgba(255, 255, 255, 0.05);
      box-shadow: 0 10px 20px #00000030;
      border-radius: 15px;
      justify-content: center;
      align-items: center;
      backdrop-filter: blur(40px);
      // border: solid 2px transparent;
      background-clip: padding-box;
      --el-color-black: black;
      display: flex;
      flex-direction: column;
      padding: 15px;
      z-index: 2;
      animation: showIn 0.5s forwards;
      cursor: pointer;
      transition: scale 0.4s;
      text-align: start;
      background-size: 50%;
      background-position: 120% 30%;
      background-repeat: no-repeat;
      transition: all .3s;

      &:hover {
        box-shadow: 0 1px 1px #00000030;
      }

      &:active {
        scale: 0.95;
      }

      .content {
        position: relative;
        @include displayFlex(center, center, column);
        opacity: 0.85;
        transition: 0.5s;

        .img {
          position: relative;
          width: 150px; height: 150px;
          border-radius: 50%;
          overflow: hidden;
          border: 10px solid rgba(0,0,0,.25);

          img {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            object-fit: cover;
          }
        }

        .cardContent {
          user-select: none;

          h3 {
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 500;
            font-size: 18px;
            text-align: center;
            margin: 20px 0 10px;
            line-height: 1.1em;
            @include Irish-Grover(400, 24, $black);

            @include tablet {
                @include Irish-Grover(400, 18, $black);
            }

            @include phone {
                @include Irish-Grover(400, 16, $black);
            }

            span {
              font-size: 12px;
              font-weight: 300;
              text-transform: initial;
            }
          }
        }
      }

      &:hover .content {
        opacity: 1;
        transform: translateY(-5px);

        .cardContent {
          h3 {
            color: black;
          }
        }
      }
    }
  }
}
</style>