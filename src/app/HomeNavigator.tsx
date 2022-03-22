import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { FC } from 'react';
import React from 'react';

import type { HomeParamList } from '~/navigation';
import CreditScreen from '~/screens/CreditScreen';
import DebitCardScreen from '~/screens/DebitCardScreen';
import HomeScreen from '~/screens/HomeScreen';
import ProfileScreen from '~/screens/ProfileScreen';

import PaymentsScreen from '~/screens/PaymentsScreen';
import BottomTabSVGs from '~/svg/bottom-tabs';

const BottomTabsNavigator = createBottomTabNavigator<HomeParamList>();

const navigatorOptions = {
	headerTitleAlign: 'center',
} as const;

type ScreenNames = keyof HomeParamList;

const Screens = [HomeScreen, DebitCardScreen, PaymentsScreen, CreditScreen, ProfileScreen] as const;

const screenOptions: Record<ScreenNames, BottomTabNavigationOptions> = {
	Home: {
		headerShown: false,
		tabBarLabel: 'Home',
		tabBarIcon: createTabBarIcon('Home'),
	},
	DebitCard: {
		headerShown: false,
		tabBarLabel: 'Debit Card',
		tabBarIcon: createTabBarIcon('DebitCard'),
	},
	Payments: {
		headerShown: false,
		tabBarLabel: 'Payments',
		tabBarIcon: createTabBarIcon('Payments'),
	},
	Credit: {
		headerShown: false,
		tabBarLabel: 'Credit',
		tabBarIcon: createTabBarIcon('Credit'),
	},
	Profile: {
		headerShown: false,
		tabBarLabel: 'Profile',
		tabBarIcon: createTabBarIcon('Profile'),
	},
};

function createTabBarIcon(iconName: ScreenNames) {
	return function tabBarIcon(props: { color: string; size: number }): JSX.Element {
		const { color, size } = props;
		const Component = BottomTabSVGs[iconName];
		return <Component width={size} height={size} fill={color} />;
	};
}

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
