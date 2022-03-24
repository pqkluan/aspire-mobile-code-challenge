import { Progress, Row, ScrollView, Stack, Text } from 'native-base';
import type { ComponentProps } from 'react';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Alert, Platform, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import CurrencyBadge from '~/components/CurrencyBadge';
import { useSessionState } from '~/hooks';
import { createScreen } from '~/navigation';
import { sagas, selectors } from '~/redux';
import DebitCardSVGs from '~/svg/debit-card-icons';
import formatNumber from '~/utils/formatNumber';

import ActionRow from './ActionRow';
import CardUI from './CardUI';

type RowData = ComponentProps<typeof ActionRow>;

export default createScreen(
	'DebitCard',
	(props) => {
		const { navigation } = props;

		const dispatch = useDispatch();

		const { loading } = useSessionState(sagas.debit.fetchDebitData.type);
		const currency = useSelector(selectors.debit.currency);
		const balanceAmount = useSelector(selectors.debit.balanceAmount);
		const { spendingLimitEnabled, spendingLimitAmount, spentAmount } = useSelector(
			selectors.debit.spendingLimit,
		);

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
		}, [currency, navigation, spendingLimitAmount, spendingLimitEnabled]);

		const fetchData = useCallback(() => {
			dispatch(sagas.debit.fetchDebitData());
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		useEffect(() => {
			fetchData();
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []);

		return (
			<ScrollView
				backgroundColor={'secondary.500'}
				refreshControl={
					<RefreshControl
						refreshing={loading}
						tintColor={'white'}
						titleColor={'white'}
						onRefresh={fetchData}
					/>
				}
				showsVerticalScrollIndicator={false}>
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

				<CardUI />

				<Stack backgroundColor={'white'} height={'full'} paddingTop={'2'}>
					{spendingLimitEnabled && (
						<Stack marginTop={'6'} marginX={'6'}>
							<Row justifyContent={'space-between'} justifyItems={'center'}>
								<Text color={'ink-dark.500'} fontSize={13} fontWeight={'medium'}>
									{'Debit card spending limit'}
								</Text>

								<Row justifyItems={'center'}>
									<Text color={'primary.500'} fontSize={13} fontWeight={'semibold'}>
										{formatNumber(spentAmount, { style: 'currency', currency })}
									</Text>
									<Text
										color={'ink-dark.500:alpha.20'}
										fontSize={13}
										fontWeight={'medium'}
										marginX={'1.5'}>
										{'|'}
									</Text>
									<Text color={'ink-dark.500:alpha.20'} fontSize={13} fontWeight={'medium'}>
										{formatNumber(spendingLimitAmount, { style: 'currency', currency })}
									</Text>
								</Row>
							</Row>

							<Progress
								_filledTrack={{
									style: { transform: [{ skewX: '-18deg' }] },
								}}
								marginTop={'1.5'}
								size={'md'}
								value={spendingLimitAmount <= 0 ? 0 : (spentAmount / spendingLimitAmount) * 100}
							/>
						</Stack>
					)}

					{rows.map((row) => (
						<ActionRow key={row.title} {...row} />
					))}
				</Stack>
			</ScrollView>
		);
	},
	{ disableBottomSafeArea: true },
);
