import { useNavigation } from '@react-navigation/native';
import { Spinner } from 'native-base';
import type { FC } from 'react';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Toggle from '~/components/Toggle';
import { useSessionState } from '~/hooks';
import type { ScreenProps } from '~/navigation/types';
import { sagas, selectors } from '~/redux';
import DebitCardSVGs from '~/svg/debit-card-icons';
import CurrencySymbols from '~/utils/CurrencySymbols';
import formatNumber from '~/utils/formatNumber';

import ActionRow from './ActionRow';

type Props = {};

const SpendingLimitActionRow: FC<Props> = (props) => {
	const {} = props;

	const dispatch = useDispatch();
	const navigation = useNavigation<ScreenProps<'DebitCard'>['navigation']>();

	const { loading } = useSessionState(sagas.debit.disableSpendingLimit.type);
	const currency = useSelector(selectors.debit.currency);
	const currencySymbol = CurrencySymbols[currency].symbol;

	const { spendingLimitEnabled, spendingLimitAmount } = useSelector(selectors.debit.spendingLimit);

	const handlePress = useCallback(() => {
		navigation.navigate('DebitSpendingLimit', { defaultAmount: spendingLimitAmount });
	}, [navigation, spendingLimitAmount]);

	const handleSwitchPress = useCallback(() => {
		if (!spendingLimitEnabled) return;
		dispatch(sagas.debit.disableSpendingLimit());
	}, [dispatch, spendingLimitEnabled]);

	const desc = spendingLimitEnabled
		? `Your weekly spending limit is ${currencySymbol} ${formatNumber(spendingLimitAmount)}`
		: "You haven't set any spending limit on card";

	return (
		<ActionRow
			SVGComponent={DebitCardSVGs.SpendingLimit}
			desc={desc}
			title={'Weekly spending limit'}
			onPress={handlePress}>
			{loading && <Spinner size={'sm'} />}
			<Toggle
				enabled={spendingLimitEnabled}
				isDisabled={loading || !spendingLimitEnabled}
				onPress={handleSwitchPress}
			/>
		</ActionRow>
	);
};

export default SpendingLimitActionRow;
