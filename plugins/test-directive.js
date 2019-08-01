import Vue from 'vue';

Vue.directive('test', (element, binding) => {
  element.setAttribute('data-test', binding.value);
});
