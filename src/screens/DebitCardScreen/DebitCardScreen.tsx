import { Row, ScrollView, Stack, Text } from 'native-base';
import type { ComponentProps } from 'react';
import React, { useMemo } from 'react';
import { Alert, Platform } from 'react-native';

import CurrencyBadge from '~/components/CurrencyBadge';
import { createScreen } from '~/navigation';
import DebitCardSVGs from '~/svg/debit-card-icons';
import formatNumber from '~/utils/formatNumber';

import ActionRow from './ActionRow';
import CardUI from './CardUI';

type RowData = ComponentProps<typeof ActionRow>;

export default createScreen(
	'DebitCard',
	(props) => {
		const { navigation } = props;

		const spendingLimitEnabled = false;
		const currency = 'S$';
		const spendingLimitAmount = 5000;
		const balanceAmount = 3000;

		const cardData = {
			cardholderName: 'Mark Henry',
			expirationDate: '12/20',
			cardValidationCode: '456',
			PAN: '5647 3411 2413 2020',
		};

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
						? `Your weekly spending limit is ${currency} ${formatNumber(spendingLimitAmount)}`
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
		}, [navigation, spendingLimitAmount, spendingLimitEnabled]);

		return (
			<ScrollView backgroundColor={'secondary.500'} showsVerticalScrollIndicator={false}>
				<Text color={'white'} fontSize={'sm'} fontWeight={'medium'} marginTop={'3'} marginX={'6'}>
					{'Available balance'}
				</Text>

				<Row alignItems={'center'} paddingX={'6'}>
					<CurrencyBadge currency={currency} />

					<Text
						color={'white'}
						fontSize={'2xl'}
						fontWeight={'bold'}
						marginLeft={'2'}
						paddingTop={Platform.select({ android: '1.5' })}>
						{formatNumber(balanceAmount)}
					</Text>
				</Row>

				<CardUI data={cardData} />

				<Stack backgroundColor={'white'} height={'full'} paddingTop={'2'}>
					{rows.map((row) => (
						<ActionRow key={row.title} {...row} />
					))}
				</Stack>
			</ScrollView>
		);
	},
	{ disableBottomSafeArea: true },
);
