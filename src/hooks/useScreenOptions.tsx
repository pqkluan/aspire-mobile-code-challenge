import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useTheme } from 'native-base';
import React from 'react';
import type { PropsWithChildren } from 'react';
import { Platform } from 'react-native';

import Logo from '~/components/header/Logo';
import Title from '~/components/header/Title';

type Options = NativeStackNavigationOptions & BottomTabNavigationOptions;

function useScreenOptions(isNativeStack: boolean): Options {
	const theme = useTheme();

	return {
		animation: Platform.select({ ios: 'default', android: 'slide_from_right' }),
		animationTypeForReplace: 'push',
		headerBackTitleVisible: false,
		headerShadowVisible: false,
		headerStyle: { backgroundColor: theme.colors.secondary[500] },
		headerTintColor: theme.colors.white,
		headerTitleAlign: 'left',
		headerTitle: (props: PropsWithChildren<{}>) => <Title>{props.children}</Title>,
		headerRight: () => <Logo marginEnabled={!isNativeStack} />,
	};
}

export default useScreenOptions;
