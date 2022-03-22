import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, useTheme } from 'native-base';
import type { FC } from 'react';
import React from 'react';

import type { HomeParamList } from '~/navigation';
import CreditScreen from '~/screens/CreditScreen';
import DebitCardScreen from '~/screens/DebitCardScreen';
import HomeScreen from '~/screens/HomeScreen';
import PaymentsScreen from '~/screens/PaymentsScreen';
import ProfileScreen from '~/screens/ProfileScreen';
import BottomTabSVGs from '~/svg/bottom-tabs';

const BottomTabsNavigator = createBottomTabNavigator<HomeParamList>();

const navigatorOptions = {
	headerShown: false,
} as const;

type ScreenNames = keyof HomeParamList;

const Screens = [HomeScreen, DebitCardScreen, PaymentsScreen, CreditScreen, ProfileScreen] as const;

const screenOptions: Record<ScreenNames, BottomTabNavigationOptions> = {
	Home: {
		tabBarLabel: createTabBarLabel('Home'),
		tabBarIcon: createTabBarIcon('Home'),
	},
	DebitCard: {
		tabBarLabel: createTabBarLabel('Debit Card'),
		tabBarIcon: createTabBarIcon('DebitCard'),
	},
	Payments: {
		tabBarLabel: createTabBarLabel('Payments'),
		tabBarIcon: createTabBarIcon('Payments'),
	},
	Credit: {
		tabBarLabel: createTabBarLabel('Credit'),
		tabBarIcon: createTabBarIcon('Credit'),
	},
	Profile: {
		tabBarLabel: createTabBarLabel('Profile'),
		tabBarIcon: createTabBarIcon('Profile'),
	},
};

function createTabBarLabel(label: string): BottomTabNavigationOptions['tabBarLabel'] {
	return function TabBarLabel(props): JSX.Element {
		const { focused } = props;
		const theme = useTheme();
		const color = focused ? theme.colors.primary[500] : theme.colors.disabled[500];

		// TODO:
		// font family Avenir Next Medium for unfocused
		// font family Avenir Next Demi Bold for focused
		return (
			<Text color={color} fontSize={9} lineHeight={11}>
				{label}
			</Text>
		);
	};
}

function createTabBarIcon(name: ScreenNames): BottomTabNavigationOptions['tabBarIcon'] {
	return function TabBarIcon(props): JSX.Element {
		const Component = BottomTabSVGs[name];
		const { focused } = props;
		const theme = useTheme();
		const color = focused ? theme.colors.primary[500] : theme.colors.disabled[500];

		return <Component fill={color} height={24} width={24} />;
	};
}

const HomeNavigator: FC = () => {
	// Note: initial tab should be home, but it was set to DebitCard for challenge purpose
	const initialRouteName = 'DebitCard';

	return (
		<BottomTabsNavigator.Navigator
			initialRouteName={initialRouteName}
			screenOptions={navigatorOptions}>
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
