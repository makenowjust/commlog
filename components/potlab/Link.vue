<script setup lang="ts">
defineProps<{
  class?: string;
}>();
</script>

<template>
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :class="$props.class"
  >
    <path
      class="link-1"
      d="M10.9218 9.01421H6.60314C6.12159 9.01421 5.64697 9.17948 5.31651 9.52974C3.8978 11.0335 3.65821 12.7201 5.31564 14.4709C5.64624 14.8201 6.12116 14.9858 6.60205 14.9858H10.9218"
      stroke="#0A0A30"
      stroke-width="1.5"
    />
    <path
      class="link-1-2"
      d="M13.0782 14.9858H17.3969C17.8784 14.9858 18.353 14.8205 18.6835 14.4703C20.1022 12.9665 20.3418 11.2799 18.6844 9.52915C18.3538 9.17993 17.8788 9.01424 17.398 9.01424H13.0782"
      stroke="#0A0A30"
      stroke-width="1.5"
    />
    <path
      d="M8.73503 11.9567H15.2649"
      stroke="#265BFF"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
</template>

<style>
.link-1 {
  animation: link-1 1.5s cubic-bezier(0.86, 0, 0.07, 1) infinite alternate both;
}
@keyframes link-1 {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(2px);
  }
}
.link-1-2 {
  animation: link-1-2 1.5s cubic-bezier(0.86, 0, 0.07, 1) infinite alternate
    both;
}
@keyframes link-1-2 {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(-2px);
  }
}
</style>
