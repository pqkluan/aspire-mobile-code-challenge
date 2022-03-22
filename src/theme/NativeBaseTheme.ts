/**
 * Extended NativeBase Theme
 * https://docs.nativebase.io/setup-provider#h2-add-custom-theme-optional
 */

import { extendTheme } from 'native-base';

import Colors from './Colors';

const nativeBaseTheme = extendTheme({
	colors: {
		primary: Colors.malachite,
		secondary: Colors['prussian-blue'],
		disabled: Colors.alto,
	},

	fontConfig: {
		AvenirNext: {
			// Note: Since the design don't use Thin - Extra Light - Light
			// Regular will be use as subtitle for these fonts to reduce bundle sizes
			100: { normal: 'AvenirNext-Regular', italic: 'AvenirNext-Italic' },
			200: { normal: 'AvenirNext-Regular', italic: 'AvenirNext-Italic' },
			300: { normal: 'AvenirNext-Regular', italic: 'AvenirNext-Italic' },
			400: { normal: 'AvenirNext-Regular', italic: 'AvenirNext-Italic' },
			500: { normal: 'AvenirNext-Medium', italic: 'AvenirNext-MediumItalic' },
			600: { normal: 'AvenirNext-DemiBold', italic: 'AvenirNext-DemiBoldItalic' },
			700: { normal: 'AvenirNext-Bold', italic: 'AvenirNext-BoldItalic' },
			800: { normal: 'AvenirNext-Bold', italic: 'AvenirNext-BoldItalic' },
			900: { normal: 'AvenirNext-Bold', italic: 'AvenirNext-BoldItalic' },
		},
	},

	fonts: {
		heading: 'AvenirNext',
		body: 'AvenirNext',
		mono: 'AvenirNext',
	},

	components: {},
});

type CustomThemeType = typeof nativeBaseTheme;

/**
 * Re-declare module to make custom theme available whole code base
 * https://docs.nativebase.io/typescript
 */
declare module 'native-base' {
	interface ICustomTheme extends CustomThemeType {}
}

export default nativeBaseTheme;
