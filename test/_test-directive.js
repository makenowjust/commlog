import Vue from 'vue';

Vue.directive('test', (el, binding) => {
  el.setAttribute('data-test', binding.value);
});
