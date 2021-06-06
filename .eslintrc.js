module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['plugin:vue/recommended', '@vue/typescript/recommended', '@vue/prettier/recommended'],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		'@typescript-eslint/no-var-requires': 0,
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'vue/no-multiple-template-root': 0,
	},
}
