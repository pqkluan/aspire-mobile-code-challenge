import type { FC } from 'react';
import React from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

type Props = {
	disabled: boolean;
};

const DismissKeyboardBackground: FC<Props> = (props) => {
	if (props.disabled) {
		return <View style={styles.container}>{props.children}</View>;
	}

	return (
		<TouchableWithoutFeedback
			accessibilityRole={'none'}
			style={styles.container}
			touchSoundDisabled
			onPress={Keyboard.dismiss}>
			<View style={styles.container}>{props.children}</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default DismissKeyboardBackground;
