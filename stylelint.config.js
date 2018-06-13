const propertiesOrder = require('stylelint-config-xo/properties-order');

module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-xo-scss',
    'stylelint-config-xo-space',
    'stylelint-config-prettier',
  ],
  rules: {
    // 'order/properties-order' is disabled in 'stylelint-config-xo' for now.
    // See https://github.com/sindresorhus/stylelint-config-xo/pull/2#issuecomment-363438756.
    'order/properties-order': propertiesOrder,
  },
};
