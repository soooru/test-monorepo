module.exports = {
  root: true,
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: ['prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'prettier/prettier': 'error',
    'no-unused-vars': 'off', // 미사용 변수 허용
    '@typescript-eslint/no-inferrable-types': 'off', // 타입 추론이 가능한데 타입 지정을 하고 있을 경우
    '@typescript-eslint/no-explicit-any': 'off', // any 타입 사용 금지
  },
};
