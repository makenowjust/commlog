const propertiesOrder = require('stylelint-config-xo/properties-order');

module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-xo-scss',
    'stylelint-config-xo-space',
    'stylelint-config-prettier',
    'stylelint-config-css-modules',
  ],
  rules: {
    // 'order/properties-order' is disabled in 'stylelint-config-xo' for now.
    // See https://github.com/sindresorhus/stylelint-config-xo/pull/2#issuecomment-363438756.
    'order/properties-order': propertiesOrder,
    // Because it is buggy, it turns off for now.
    'block-no-empty': null,
  },
};
