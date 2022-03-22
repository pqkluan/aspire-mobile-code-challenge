/**
 * SVGR config file:
 * https://react-svgr.com/docs/configuration-files/#svgr
 * https://github.com/kristerkari/react-native-svg-transformer#changing-svg-fill-color-in-js-code
 */
module.exports = {
	replaceAttrValues: {
		'#000': '{props.fill}',
	},
};
