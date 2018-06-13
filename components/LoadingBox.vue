<template>
  <div :class="$style.wrap">
    <div :class="$style.box"></div>
    <div :class="$style.box"></div>
    <div :class="$style.box"></div>
  </div>
</template>

<style module lang="scss">
.wrap {
  display: block;
  box-sizing: border-box;
  width: 7em;
  padding: 0;
  margin: 0 auto;
  text-align: center;
}

.box {
  display: inline-block;
  width: 2em;
  height: 2em;
  padding: 0;
  border: 2px solid;
  margin: 0;
  opacity: 0;
  animation: load 3s ease 0s infinite normal;

  &:nth-child(2) {
    animation-delay: 1s * 1 / 3;
  }

  &:nth-child(3) {
    animation-delay: 1s * 2 / 3;
  }
}

@keyframes load {
  0% {
    transform: translateX(2em);
    opacity: 0;
  }
  16.66666666% {
    transform: translate(0);
    opacity: 1;
  }
  50% {
    transform: translate(0);
    opacity: 1;
  }
  66.66666666% {
    transform: translateX(-2em);
    opacity: 0;
  }
  100% {
    transform: translateX(-2em);
    opacity: 0;
  }
}
</style>
