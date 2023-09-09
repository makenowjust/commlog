import Vue from 'vue';

Vue.directive('test', (element, binding) => {
  element.dataset.test = binding.value;
});
