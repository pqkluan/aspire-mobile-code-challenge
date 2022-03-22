/**
 * Extended NativeBase Theme
 * https://docs.nativebase.io/setup-provider#h2-add-custom-theme-optional
 */

import { extendTheme } from 'native-base';

const nativeBaseTheme = extendTheme({
	colors: {},

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
