import { Stack } from 'native-base';
import type { ComponentProps } from 'react';
import React, { useMemo } from 'react';
import { Alert } from 'react-native';

import { createScreen } from '~/navigation';
import DebitCardSVGs from '~/svg/debit-card-icons';

import ActionRow from './ActionRow';

type RowData = ComponentProps<typeof ActionRow>;

export default createScreen(
	'DebitCard',
	(props) => {
		const { navigation } = props;

		const spendingLimitEnabled = false;
		// TODO: should have format current function and test it
		const spendingLimitAmount = 'S$ 5,000';

		const rows = useMemo<RowData[]>((): RowData[] => {
			function handleMock() {
				Alert.alert('Alert', 'This feature is not implemented');
			}

			return [
				{
					SVGComponent: DebitCardSVGs.TopUp,
					title: 'Top-up account',
					desc: 'Deposit money to your account to use with card',
					onPress: handleMock,
				},
				{
					SVGComponent: DebitCardSVGs.SpendingLimit,
					title: 'Weekly spending limit',
					desc: spendingLimitEnabled
						? `Your weekly spending limit is ${spendingLimitAmount}`
						: "You haven't set any spending limit on card",
					onPress() {
						navigation.navigate('DebitSpendingLimit');
					},
					switchControl: {
						enabled: true,
					},
				},
				{
					SVGComponent: DebitCardSVGs.FreezeCard,
					title: 'Freeze card',
					desc: 'Your debit card is currently active',
					onPress: handleMock,
					switchControl: {
						enabled: false,
					},
				},
				{
					SVGComponent: DebitCardSVGs.NewCard,
					title: 'Get a new card',
					desc: 'This deactivates your current debit card',
					onPress: handleMock,
				},
				{
					SVGComponent: DebitCardSVGs.DeactivatedCards,
					title: 'Deactivated cards',
					desc: 'Your previously deactivated cards',
					onPress: handleMock,
				},
			];
		}, [navigation, spendingLimitEnabled]);

		return (
			<Stack backgroundColor={'secondary.500'} flex={1}>
				<Stack
					backgroundColor={'white'}
					borderTopLeftRadius={'3xl'}
					borderTopRightRadius={'3xl'}
					flex={1}
					marginTop={200}>
					{rows.map((row) => (
						<ActionRow key={row.title} {...row} />
					))}
				</Stack>
			</Stack>
		);
	},
	{ disableBottomSafeArea: true },
);
