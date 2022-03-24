import { Row, ScrollView, Stack, Text } from 'native-base';
import React, { useCallback, useEffect } from 'react';
import { Alert, Platform, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import CurrencyBadge from '~/components/CurrencyBadge';
import Toggle from '~/components/Toggle';
import { useSessionState } from '~/hooks';
import { createScreen } from '~/navigation';
import { sagas, selectors } from '~/redux';
import DebitCardSVGs from '~/svg/debit-card-icons';
import formatNumber from '~/utils/formatNumber';

import ActionRow from './ActionRow';
import CardUI from './CardUI';
import SpendingLimitActionRow from './SpendingLimitActionRow';
import SpendingProgressBar from './SpendingProgressBar';

function handleMock() {
	Alert.alert('Alert', 'This feature is not implemented');
}

export default createScreen(
	'DebitCard',
	(props) => {
		const {} = props;

		const dispatch = useDispatch();

		const { loading } = useSessionState(sagas.debit.fetchDebitData.type);
		const currency = useSelector(selectors.debit.currency);
		const balanceAmount = useSelector(selectors.debit.balanceAmount);

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
					<SpendingProgressBar />

					<ActionRow
						SVGComponent={DebitCardSVGs.TopUp}
						desc={'Deposit money to your account to use with card'}
						title={'Top-up account'}
						onPress={handleMock}
					/>

					<SpendingLimitActionRow />

					<ActionRow
						SVGComponent={DebitCardSVGs.FreezeCard}
						desc={'Your debit card is currently active'}
						title={'Freeze card'}
						onPress={handleMock}>
						<Toggle enabled={false} isDisabled />
					</ActionRow>

					<ActionRow
						SVGComponent={DebitCardSVGs.NewCard}
						desc={'This deactivates your current debit card'}
						title={'Get a new card'}
						onPress={handleMock}
					/>

					<ActionRow
						SVGComponent={DebitCardSVGs.DeactivatedCards}
						desc={'Your previously deactivated cards'}
						title={'Deactivated cards'}
						onPress={handleMock}
					/>
				</Stack>
			</ScrollView>
		);
	},
	{ disableBottomSafeArea: true },
);
