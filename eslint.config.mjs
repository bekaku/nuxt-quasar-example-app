import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  // your custom flat configs go here, for example:
  {
    files: ['**/*.ts', '**/*.tsx','**/*.vue',],
    rules: {
      'no-console': 'off', // allow console.log in TypeScript files
      'no-unused-vars': ['warn'],
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'no-useless-escape': 'off',
      'vue/require-default-prop': 'off',
      'vue/first-attribute-linebreak': 'off',
      'vue/multi-word-component-names': 'off',
      "vue/custom-event-name-casing": ["warn","kebab-case"]
    }
  },
  // {
  //   ...
  // }
)