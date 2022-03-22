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

	fontConfig: {},

	fonts: {},

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
