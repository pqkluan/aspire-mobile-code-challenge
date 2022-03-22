import type { Theme } from '@react-navigation/native';
import { DefaultTheme } from '@react-navigation/native';

import Colors from './Colors';

const ReactNavigationTheme: Theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: Colors.malachite[500],
		border: Colors.mercury[500],
	},
};

export default ReactNavigationTheme;
