<template>
  <div class="side-menu">
    <div class="app-menu">
      <div class="side-menu-nav">
        <slot></slot>
      </div>
    </div>
  </div>
  <button class="side-menu-icon">TAP</button>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const myMenu = ref<HTMLElement | null>(null);
const oppMenu = ref<HTMLElement | null>(null);

const toggleClassMenu = () => {
  if (myMenu.value) {
    myMenu.value.classList.add('side-menu--animatable');
    if (!myMenu.value.classList.contains('side-menu--visible')) {
      myMenu.value.classList.add('side-menu--visible');
    } else {
      myMenu.value.classList.remove('side-menu--visible');
    }
  }
};

const OnTransitionEnd = () => {
  if (myMenu.value) {
    myMenu.value.classList.remove('side-menu--animatable');
  }
};

onMounted(() => {
  myMenu.value = document.querySelector('.side-menu');
  oppMenu.value = document.querySelector('.side-menu-icon');
  if (myMenu.value) {
    myMenu.value.addEventListener('transitionend', OnTransitionEnd);
    oppMenu.value?.addEventListener('click', toggleClassMenu);
    myMenu.value.addEventListener('click', toggleClassMenu);
  }
});

onBeforeUnmount(() => {
  if (myMenu.value) {
    myMenu.value.removeEventListener('transitionend', OnTransitionEnd);
    oppMenu.value?.removeEventListener('click', toggleClassMenu);
    myMenu.value.removeEventListener('click', toggleClassMenu);
  }
});
</script>

<style scoped lang="scss">
.side-menu-nav {
    display: contents;
    position: absolute;
}

a {
    font-weight: bold;
    color: white;
    text-decoration: none;
    margin: 10px;

    &.router-link-exact-active {
        color: white;
    }
}
.side-menu {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
    z-index: 9999;
}

.side-menu--visible {
    pointer-events: auto;
}

.app-menu {
    background-color: #fff;
    color: #fff;
    position: relative;
    max-width: 400px;
    width: 90%;
    height: 100%;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
    -webkit-transform: translateX(-103%);
            transform: translateX(-103%);
    display: flex;
    flex-direction: column;
    will-change: transform;
    z-index: 160;
    pointer-events: auto;
}

.side-menu--visible .app-menu {
    -webkit-transform: none;
            transform: none;
}

.side-menu--animatable .app-menu {
    transition: all 130ms ease-in;
}

.side-menu--visible.side-menu--animatable  .app-menu {
    transition: all 330ms ease-out;
}

.side-menu:after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.4);
    opacity: 0;
    will-change: opacity;
    pointer-events: none;
    transition: opacity 0.3s cubic-bezier(0,0,0.3,1);
}

.side-menu--visible.side-menu:after {
    opacity: 1;
    pointer-events: auto;
}

.side-menu-icon {
  cursor: pointer;
  content: "Menu";
  z-index: 99;
  color: white;
  background-color: $violet;
  width: 52px;
  height: 32px;
  border-radius: 6px;
  border: 3px solid $violet;
  margin: 10px;
  top: 0;
  left: 0;
  position: fixed;
}

.app-menu {
  width: 300px;
  height: 100%;
  box-shadow: none;
  background-color: #4d8299;
}

.side-menu:after {
  width: 100%;
  height: 100%;
}
</style>