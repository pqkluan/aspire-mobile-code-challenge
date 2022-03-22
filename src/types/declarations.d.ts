/**
 * Support svg file importing for typescript
 *
 * https://github.com/kristerkari/react-native-svg-transformer#using-typescript
 */
declare module '*.svg' {
	import type React from 'react';
	import type { SvgProps } from 'react-native-svg';

	const content: React.FC<SvgProps>;
	export default content;
}
