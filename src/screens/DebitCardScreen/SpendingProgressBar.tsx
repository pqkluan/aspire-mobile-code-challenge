import { Box, Progress, Row, Stack, Text } from 'native-base';
import type { FC } from 'react';
import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import { useSelector } from 'react-redux';

import { selectors } from '~/redux';
import formatNumber from '~/utils/formatNumber';

const SpendingProgressBar: FC = (props) => {
	const {} = props;

	const currency = useSelector(selectors.debit.currency);
	const { spendingLimitEnabled, spendingLimitAmount, spentAmount } = useSelector(
		selectors.debit.spendingLimit,
	);

	const percentage = useMemo<number>(() => {
		// Cannot divide by zero or negative
		if (spendingLimitAmount <= 0) return 0;
		if (spentAmount >= spendingLimitAmount) return 100;
		return (spentAmount / spendingLimitAmount) * 100;
	}, [spendingLimitAmount, spentAmount]);

	if (!spendingLimitEnabled) return <Box />;

	const limitReached = percentage === 100;

	return (
		<Stack marginTop={'6'} marginX={'6'}>
			<Row justifyContent={'space-between'} justifyItems={'center'}>
				<Text color={'ink-dark.500'} fontSize={13} fontWeight={'medium'}>
					{'Debit card spending limit'}
				</Text>

				<Row justifyItems={'center'}>
					<Text
						color={limitReached ? 'danger.500' : 'primary.500'}
						fontSize={13}
						fontWeight={'semibold'}
						paddingTop={Platform.select({ android: 1.4 })}>
						{formatNumber(spentAmount, { style: 'currency', currency })}
					</Text>
					<Text color={'ink-dark.500:alpha.20'} fontSize={13} fontWeight={'medium'} marginX={'1.5'}>
						{'|'}
					</Text>
					<Text
						color={'ink-dark.500:alpha.20'}
						fontSize={13}
						fontWeight={'medium'}
						paddingTop={Platform.select({ android: 0.8 })}>
						{formatNumber(spendingLimitAmount, { style: 'currency', currency })}
					</Text>
				</Row>
			</Row>

			<Progress
				_filledTrack={{ style: { transform: [{ skewX: '-18deg' }] } }}
				colorScheme={limitReached ? 'danger' : 'primary'}
				marginTop={'1.5'}
				size={'md'}
				value={percentage}
			/>
		</Stack>
	);
};

export default SpendingProgressBar;
