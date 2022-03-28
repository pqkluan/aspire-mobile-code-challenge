module.exports = {
	presets: ['module:metro-react-native-babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				extensions: ['.ts', '.tsx'],
				root: ['.'],
				alias: {
					'~': './src',
				},
			},
		],
	],
};
