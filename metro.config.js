/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const { getDefaultConfig } = require('metro-config');

/**
 * Merged with react-native-svg-transformer options
 * https://github.com/kristerkari/react-native-svg-transformer#for-react-native-v059-or-newer
 */
module.exports = (async () => {
	const {
		resolver: { sourceExts, assetExts },
	} = await getDefaultConfig();

	return {
		transformer: {
			babelTransformerPath: require.resolve('react-native-svg-transformer'),
			getTransformOptions: async () => ({
				transform: {
					experimentalImportSupport: false,
					inlineRequires: true,
				},
			}),
		},
		resolver: {
			assetExts: assetExts.filter((ext) => ext !== 'svg'),
			sourceExts: [...sourceExts, 'svg'],
		},
	};
})();
