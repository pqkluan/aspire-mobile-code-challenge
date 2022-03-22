import { Stack, Text } from 'native-base';
import type { FC } from 'react';
import React from 'react';

type Props = {
	/**
	 * Placeholder text
	 */
	text: string;
};

const PlaceholderContent: FC<Props> = (props) => {
	const { text } = props;

	return (
		<Stack flex={1} justifyContent={'center'}>
			<Text textAlign={'center'}>{text}</Text>
		</Stack>
	);
};

export default PlaceholderContent;
