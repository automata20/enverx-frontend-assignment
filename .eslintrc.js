module.exports = {
    env: {
      browser: true,
      es2021: true
    },
    extends: ['plugin:react/recommended', 'airbnb', 'plugin:prettier/recommended'],
    overrides: [],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'prettier/prettier': ['error', { singleQuote: true }],
      'import/no-unresolved': 'off',
      'react/react-in-jsx-scope': 'off',
      'import/no-extraneous-dependencies': 'off',
      'react/jsx-props-no-spreading': 'off',
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'no-console': 'off'
    }
  };
  