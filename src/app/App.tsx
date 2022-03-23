import { NavigationContainer } from '@react-navigation/native';
import type { FC } from 'react';
import React from 'react';

import { navigationRef } from '~/navigation';
import { ReactNavigationTheme } from '~/theme';

import NativeBaseProvider from './NativeBaseProvider';
import { RootNavigator } from './RootNavigator';

const App: FC = () => {
	return (
		<NativeBaseProvider>
			<NavigationContainer ref={navigationRef} theme={ReactNavigationTheme}>
				<RootNavigator />
			</NavigationContainer>
		</NativeBaseProvider>
	);
};

export default App;
