import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { FC } from 'react';
import React from 'react';

import type { HomeParamList } from '~/navigation';
import CreditScreen from '~/screens/CreditScreen';
import DebitCardScreen from '~/screens/DebitCardScreen';
import HomeScreen from '~/screens/HomeScreen';
import PaymentScreen from '~/screens/PaymentScreen';
import ProfileScreen from '~/screens/ProfileScreen';

const BottomTabsNavigator = createBottomTabNavigator<HomeParamList>();

const navigatorOptions = {
	headerTitleAlign: 'center',
} as const;

type ScreenNames = keyof HomeParamList;

const Screens = [HomeScreen, DebitCardScreen, PaymentScreen, CreditScreen, ProfileScreen] as const;

const screenOptions: Record<ScreenNames, BottomTabNavigationOptions> = {
	Home: {
		headerShown: false,
		tabBarLabel: 'Home',
		// tabBarIcon: createTabBarIcon('home'),
	},
	DebitCard: {
		headerShown: false,
		tabBarLabel: 'Debit Card',
	},
	Payment: {
		headerShown: false,
		tabBarLabel: 'Payment',
	},
	Credit: {
		headerShown: false,
		tabBarLabel: 'Credit',
	},
	Profile: {
		headerShown: false,
		tabBarLabel: 'Profile',
	},
};

// function createTabBarIcon(iconName: string) {
// 	return function tabBarIcon(props: { color: string; size: number }): JSX.Element {
// 		const { color, size } = props;
// 		return <IconButton color={color} icon={iconName} size={size} />;
// 	};
// }

const HomeNavigator: FC = () => {
	return (
		<BottomTabsNavigator.Navigator initialRouteName={'Home'} screenOptions={navigatorOptions}>
			{Screens.map((ScreenComponent) => {
				const screenName = ScreenComponent.displayName;
				return (
					<BottomTabsNavigator.Screen
						key={screenName}
						component={ScreenComponent}
						name={screenName}
						options={screenOptions[screenName]}
					/>
				);
			})}
		</BottomTabsNavigator.Navigator>
	);
};

HomeNavigator.displayName = 'HomeRoot';
export default HomeNavigator;
