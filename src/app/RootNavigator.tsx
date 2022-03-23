import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import useScreenOptions from '~/hooks/useScreenOptions';
import type { RootParamList } from '~/navigation';
import DebitSpendingLimitScreen from '~/screens/DebitSpendingLimitScreen';

import HomeNavigator from './HomeNavigator';

const RootStack = createNativeStackNavigator<RootParamList>();

const noHeaderOption = { headerShown: false };

export function RootNavigator(): JSX.Element {
	// Note: initial route should deprived from authentication state
	const initialRouteName = 'HomeRoot';

	const options = useScreenOptions(true);

	return (
		<RootStack.Navigator initialRouteName={initialRouteName} screenOptions={options}>
			<RootStack.Screen component={HomeNavigator} name={'HomeRoot'} options={noHeaderOption} />

			<RootStack.Screen
				component={DebitSpendingLimitScreen}
				name={DebitSpendingLimitScreen.displayName}
				options={{ title: '' }}
			/>
		</RootStack.Navigator>
	);
}
