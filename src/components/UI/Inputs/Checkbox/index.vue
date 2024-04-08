<template>
  <form>
    <label class="toggle">
      <div class="toggle__wrapper">
        <input type="checkbox" :checked="modelValue" @change="handleChange" />        <div class="toggle__bg">
          <div class="toggle__sphere">
            <div class="toggle__sphere-bg"></div>
            <div class="toggle__sphere-overlay"></div>
          </div>
        </div>
      </div>
    </label>
  </form>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue']);

const handleChange = (event: any) => {
  emit('update:modelValue', event.target.checked);
};
</script>

<style scoped lang="scss">
form {
  position: absolute;
  margin-top: 90px;
  width: 600px;
  height: 350px;
  margin: -4px -2px;
  border-radius: 500px;
  background: linear-gradient(hsla(313, 81%, 60%, 0.678), hsla(313, 81%, 60%, 0.678));
  box-shadow: 0 1px 5px hsla(320, 92%, 49%, 0.3),
         -3px 25px 25px hsla(318, 85%, 64%, 0.5),
         -6px 50px 50px hsla(313, 81%, 60%, 0.678),
         -9px 65px 65px hsla(325, 95%, 41%, 0.801);

         transform: scale(0.14);
}

.toggle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  height: 350px;
  background: lighten($violet, 20%);
  border-radius: 500px;
  border: solid 5px transparent;
  background-clip: padding-box;
  cursor: pointer;
}

.toggle__wrapper {
  width: 500px;
  height: 250px;
  margin: -4px -2px;
  border-radius: 500px;
  background: linear-gradient(hsla(313, 81%, 60%, 0.678), hsla(313, 81%, 60%, 0.678));
  box-shadow: 0px 5px 1px 0 hsla(313, 81%, 60%, 0.678);
}

.toggle__bg {
  width: 500px;
  height: 250px;
  background: rgb(6, 176, 255);
  background: linear-gradient(to right, rgb(13, 171, 245) 50%, hsla(313, 81%, 60%, 0.678) 50% 100%);
  background-size: 200% 100%;
  background-position: 75%;
  border-radius: 500px;
  border: solid 5px transparent;
  background-clip: padding-box;
  box-shadow: inset 0px 30px 50px 15px hsla(0, 0%, 0%, 0.30);
  transition: all 0.85s ease-in-out;
}

.toggle__sphere {
  position: relative;
  height: 238px;
  width: 238px;
  background: rgb(17, 13, 11);
  background:
    linear-gradient(to right, rgb(207, 8, 124)50%, hsla(313, 81%, 60%, 0.678) 50%);
  border-radius: 50%;
  transform-origin: top left;
  transform: translateY(1px);
  box-shadow:
    2px 0px 5px 1px hsla(18, 77%, 15%, 0.05),
    0px 10px 10px 1px hsla(18, 77%, 15%, 0.2),
    -3px 0px 3px 1px hsla(0, 0%, 0%, 0.75);
  transition: all 0.85s ease-in-out;
}

.toggle__sphere:before,
.toggle__sphere:after {
  content: '';
  position: absolute;
  left: calc(50% - 20px);
  height: 1px;
  width: 40px;
  background: hsla(0, 0%, 0%, 0.25);
  border-radius: 50%;
  box-shadow: 0px 0px 10px 0px hsla(0, 0%, 0%, 0.25);
}

.toggle__sphere:before {
  top: -2px;
}

.toggle__sphere:after {
  bottom: -1px;
}

.toggle__sphere-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  border-radius: 50%;
  box-shadow: inset 0px -30px 30px 15px hsla(313, 81%, 60%, 0.678)
}

.toggle__sphere-bg {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  border-radius: 50%;
  transition: transform 0.85s ease-in-out;
}

.toggle__sphere-bg:before,
.toggle__sphere-bg:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.toggle__sphere-bg:before {
  background-color: hsla(313, 81%, 60%, 0.678);
  border-radius: 50%;
}

.toggle__sphere-bg:after {
  background-color: hsla(199, 43%, 59%, 1);
  transform: rotateY(180deg);
  border-radius: 50%;
}

input {
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
}

input:checked + .toggle__bg {
  background-position: 25%;
}

input:checked + .toggle__bg .toggle__sphere {
  transform: translateX(250px) translateY(1px);
  box-shadow:
    -2px 0px 5px 1px hsla(18, 77%, 15%, 0.05),
    0px 10px 10px 1px hsla(18, 77%, 15%, 0.2),
    3px 0px 3px 0px hsla(0, 0%, 0%, 0.75);
}

input:checked + .toggle__bg .toggle__sphere-bg {
  transform: rotateY(180deg);
}
</style>