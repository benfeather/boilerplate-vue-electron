module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	extends: ['plugin:vue/recommended', '@vue/typescript/recommended', '@vue/prettier/recommended'],
	ignorePatterns: ['*.d.*'],
	parserOptions: {
		ecmaVersion: 2021,
	},
	rules: {
		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/no-var-requires': 'off',
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-unused-vars': 'warn',
		'vue/no-multiple-template-root': 'off',
	},
}
