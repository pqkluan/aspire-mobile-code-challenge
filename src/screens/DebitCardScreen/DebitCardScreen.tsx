import { Box, Row, ScrollView, Stack, Text } from 'native-base';
import type { ComponentProps } from 'react';
import React, { useMemo } from 'react';
import { Alert, Platform } from 'react-native';

import CurrencyBadge from '~/components/CurrencyBadge';
import { createScreen } from '~/navigation';
import DebitCardSVGs from '~/svg/debit-card-icons';

import ActionRow from './ActionRow';
import CardUI from './CardUI';

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
			<ScrollView backgroundColor={'secondary.500'} showsVerticalScrollIndicator={false}>
				<Text color={'white'} fontSize={'sm'} fontWeight={'medium'} marginTop={'3'} marginX={'6'}>
					{'Available balance'}
				</Text>

				<Row alignItems={'center'} paddingX={'6'}>
					<CurrencyBadge currency={'S$'} />

					<Text
						color={'white'}
						fontSize={'2xl'}
						fontWeight={'bold'}
						marginLeft={'2'}
						paddingTop={Platform.select({ android: '1.5' })}>
						{'3,000'}
					</Text>
				</Row>

				<Stack backgroundColor={'white'} borderTopRadius={'3xl'} marginTop={44}>
					{rows.map((row) => (
						<ActionRow key={row.title} {...row} />
					))}

					<Box backgroundColor={'primary.300'} height={1000} />
					<Box backgroundColor={'red.500'} height={50} />
				</Stack>

				<CardUI
					data={{
						cardholderName: 'Mark Henry',
						expirationDate: '12/20',
						cardValidationCode: '456',
						PAN: '5647341124132020',
					}}
				/>
			</ScrollView>
		);
	},
	{ disableBottomSafeArea: true },
);
