module.exports = {
	root: true,
	extends: ['plugin:import/recommended', 'plugin:import/typescript', '@react-native-community'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		/**
		 * Disable the following warning:
		 * WARNING: You are currently running a version of TypeScript which is not officially supported by typescript-estree.
		 * Source: https://github.com/facebook/create-react-app/issues/7160#issuecomment-502631002
		 */
		warnOnUnsupportedTypeScriptVersion: false,
	},
	plugins: ['@typescript-eslint'],
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			rules: {
				'@typescript-eslint/no-shadow': ['error'],
				'no-shadow': 'off',
				'no-undef': 'off',
				'jsx-quotes': ['error', 'prefer-single'],
			},
		},
	],
	rules: {
		'curly': ['error', 'multi-or-nest', 'consistent'],

		'@typescript-eslint/consistent-type-imports': [
			'error',
			{ prefer: 'type-imports', disallowTypeAnnotations: true },
		],

		'react/jsx-sort-props': [
			'error',
			{
				ignoreCase: false,
				reservedFirst: true,
				noSortAlphabetically: false,
				shorthandFirst: false,
				shorthandLast: true,
				callbacksLast: true,
			},
		],
		'react/jsx-curly-brace-presence': ['error', 'always'],

		'react-native/no-color-literals': ['warn'],

		'react-native/no-unused-styles': ['error'],
		'react-native/no-single-element-style-arrays': ['error'],

		'import/order': [
			'error',
			{
				'alphabetize': { order: 'asc', caseInsensitive: true },
				'newlines-between': 'always',
				'groups': [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index'], 'object'],
			},
		],

		// Disable because it's expensive
		'import/no-cycle': ['off'],

		'import/namespace': ['error', { allowComputed: false }],
		'import/no-useless-path-segments': ['error', { noUselessIndex: true }],
		'import/newline-after-import': ['error', { count: 1 }],

		'import/group-exports': ['error'],
		'import/no-anonymous-default-export': ['error'],
	},
	settings: {
		'import/ignore': ['react-native'],
		'import/resolver': {
			'babel-module': {},
		},
	},
	env: {
		jest: true,
	},
};
