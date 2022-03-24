import { Box, Text } from 'native-base';
import type { FC } from 'react';
import React from 'react';
import { Platform } from 'react-native';

import type { SupportCurrency } from '~/types/debit-card';
import CurrencySymbols from '~/utils/CurrencySymbols';

type Props = {
	currency: SupportCurrency;
};

const CurrencyBadge: FC<Props> = (props) => {
	const { currency } = props;

	const currencySymbol = CurrencySymbols[currency].symbol;

	return (
		<Box
			alignItems={'center'}
			backgroundColor={'primary.500'}
			borderRadius={3}
			height={22}
			justifyContent={'center'}
			paddingTop={Platform.select({ android: '0.5' })}
			width={'10'}>
			<Text color={'white'} fontSize={13} fontWeight={'bold'}>
				{currencySymbol}
			</Text>
		</Box>
	);
};

export default CurrencyBadge;
