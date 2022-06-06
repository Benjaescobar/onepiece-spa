module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-max-props-per-line': [1, { maximum: 1, when: 'always' }],
    'jsx-a11y/alt-text': 'off',
    'react/button-has-type': 'off',
    'react/prop-types': 'off',
    'jsx-a11y/label-has-associated-control': [
      1, { required: { some: ['nesting', 'id'] } },
    ],
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'off',
  },
};
