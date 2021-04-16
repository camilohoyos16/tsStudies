module.exports = {
  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },

  plugins: [
    "@typescript-eslint",
    "react-hooks",
  ],

  extends: [
    "plugin:react/recommended",
  ],

  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off",
    "semi": ["error", "never"],
  },

  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },

  overrides: [
    {
      files: ['**.ts', '**.tsx'],

      extends: [
        "plugin:@typescript-eslint/recommended",
      ],

      rules: {
        "@typescript-eslint/no-empty-function": "off",
        'no-undef': 'off',
        '@typescript-eslint/member-delimiter-style': ['error', {
          multiline: {
            delimiter: "none",
            requireLast: true,
          },
          singleline: {
            delimiter: "comma",
            requireLast: false,
          },
        }],
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
}