import type { FC } from 'react';
import React, { useCallback, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react-native';
import { Animated, Easing, Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useKeyboardEffect } from '~/hooks';

interface Props {
	disableDuration?: boolean;
}

/**
 * This component is purely for iOS, to mimic Android keyboard push content up behavior.
 */
const KeyboardPadding: FC<Props> = (props) => {
	if (Platform.OS !== 'ios') {
		return <View />;
	}

	return <IOSKeyboardPadding {...props} />;
};

const IOSKeyboardPadding: FC<Props> = (props) => {
	const { disableDuration } = props;

	const { bottom } = useSafeAreaInsets();

	const animatedHeight = useRef(new Animated.Value(0)).current;
	const [kbHeight, setKbHeight] = useState<number>(0);

	const handleKeyboardEvent = useCallback(
		(isShow: boolean, e: KeyboardEvent): void => {
			if (isShow) {
				const { height } = e.endCoordinates;
				// We need to subtract the bottom padding provided by react-native-safe-area-context
				// To get the right height that amount the the height of app content overlapped by the keyboard
				const newHeight = height - bottom;

				setKbHeight(newHeight);

				// TODO: improve animation to match iOS keyboard animation
				// TODO: Try reanimated 2?
				Animated.timing(animatedHeight, {
					toValue: newHeight,
					duration: 250,
					easing: Easing.out(Easing.ease),
					useNativeDriver: false,
				}).start();
			} else {
				setKbHeight(0);

				Animated.timing(animatedHeight, {
					toValue: 0,
					duration: 250,
					useNativeDriver: false,
				}).start();
			}
		},
		[animatedHeight, bottom],
	);

	useKeyboardEffect(handleKeyboardEvent);

	return <Animated.View style={{ height: disableDuration ? kbHeight : animatedHeight }} />;
};

export default KeyboardPadding;
