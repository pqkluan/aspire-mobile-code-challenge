import { NavigationContainer } from '@react-navigation/native';
import type { FC } from 'react';
import React from 'react';

import { navigationRef } from '~/navigation';

import NativeBaseProvider from './NativeBaseProvider';
import { RootNavigator } from './RootNavigator';

const App: FC = () => {
	return (
		<NativeBaseProvider>
			<NavigationContainer ref={navigationRef}>
				<RootNavigator />
			</NavigationContainer>
		</NativeBaseProvider>
	);
};

export default App;
