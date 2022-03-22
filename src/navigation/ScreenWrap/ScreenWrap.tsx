import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useTheme } from 'native-base';
import type { PropsWithChildren } from 'react';
import React, { useEffect, useMemo } from 'react';
import type { StatusBarStyle, StyleProp, ViewStyle } from 'react-native';
import { StatusBar, StyleSheet } from 'react-native';
import type { Edge } from 'react-native-safe-area-context';
import { SafeAreaView } from 'react-native-safe-area-context';

import DismissKeyboardBackground from './DismissKeyboardBackground';
import { ErrorBoundary } from './ErrorBoundary';
import KeyboardPadding from './KeyboardPadding';

interface Props extends Omit<NativeStackNavigationOptions, 'statusBarStyle'> {
	style?: StyleProp<ViewStyle>;

	statusBarStyle?: StatusBarStyle;
	statusBarBgColor?: string;

	/**
	 * Safe area top inset are disable by default
	 * Use this option for a screen without header
	 */
	enableTopSafeArea?: boolean;
	/**
	 * Safe area bottom inset are enable by default
	 * Use this option for a full screen display like video call
	 */
	disableBottomSafeArea?: boolean;

	enableKbDismiss?: boolean;
}

/**
 * Provide basic screen utility
 * Use to wrap screen component
 *
 * @param props
 * @returns
 */
export function ScreenWrap(props: PropsWithChildren<Props>): JSX.Element {
	const theme = useTheme();

	// TODO: default nav bar scheme?

	const {
		children,
		style,
		statusBarStyle = 'light-content',
		statusBarBgColor = theme.colors.secondary[500],
		enableTopSafeArea = false,
		disableBottomSafeArea = false,
		enableKbDismiss = false,
		...navigationProps
	} = props;

	const navigation = useNavigation();

	useEffect(() => {
		navigation.setOptions(navigationProps);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [navigationProps]);

	const edges = useMemo<Edge[]>(() => {
		const insets: Edge[] = ['left', 'right'];
		if (enableTopSafeArea) insets.push('top');
		if (!disableBottomSafeArea) insets.push('bottom');
		return insets;
	}, [disableBottomSafeArea, enableTopSafeArea]);

	return (
		<SafeAreaView edges={edges} style={[styles.safeArea, style]}>
			<DismissKeyboardBackground disabled={!enableKbDismiss}>
				<ErrorBoundary>
					<StatusBar backgroundColor={statusBarBgColor} barStyle={statusBarStyle} />
					{children}
					<KeyboardPadding />
				</ErrorBoundary>
			</DismissKeyboardBackground>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
	},
});
