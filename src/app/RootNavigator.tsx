import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Platform } from 'react-native';

import type { RootParamList } from '~/navigation';
import DebitSpendingLimitScreen from '~/screens/DebitSpendingLimitScreen';

import HomeNavigator from './HomeNavigator';

const RootStack = createNativeStackNavigator<RootParamList>();

const noHeaderOption = { headerShown: false };

const rootOptions: NativeStackNavigationOptions = {
	headerBackTitleVisible: false,
	animation: Platform.select({ ios: 'default', android: 'slide_from_right' }),
	animationTypeForReplace: 'push',
	headerTitleAlign: 'center',
	// This will prevent the navigation use the screen name as default title
	title: ' ',
};

export function RootNavigator(): JSX.Element {
	// FIXME: initial route should deprived from authentication state
	const initialRouteName = 'HomeRoot';

	return (
		<RootStack.Navigator initialRouteName={initialRouteName} screenOptions={rootOptions}>
			<RootStack.Screen component={HomeNavigator} name={'HomeRoot'} options={noHeaderOption} />

			<RootStack.Screen
				component={DebitSpendingLimitScreen}
				name={DebitSpendingLimitScreen.displayName}
			/>
		</RootStack.Navigator>
	);
}
