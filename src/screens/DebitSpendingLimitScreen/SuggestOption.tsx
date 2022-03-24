import { Pressable, Text } from 'native-base';
import type { FC } from 'react';
import React, { useCallback } from 'react';

import formatNumber from '~/utils/formatNumber';

type Props = {
	currency: string;
	value: number;
	onPress: (value: number) => void;
};

const SuggestOption: FC<Props> = (props) => {
	const { currency, value, onPress } = props;

	const handelPress = useCallback(() => {
		onPress(value);
	}, [onPress, value]);

	return (
		<Pressable
			_pressed={{ backgroundColor: 'primary.500:alpha.30' }}
			alignItems={'center'}
			backgroundColor={'primary.500:alpha.10'}
			borderRadius={'sm'}
			flex={1}
			paddingY={'3'}
			onPress={handelPress}>
			<Text color={'primary.500'} fontSize={12} fontWeight={'semibold'}>
				{`${currency} ${formatNumber(value)}`}
			</Text>
		</Pressable>
	);
};

export default SuggestOption;
