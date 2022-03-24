import { Button, Input, Row, Stack, Text, useTheme } from 'native-base';
import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';

import CurrencyBadge from '~/components/CurrencyBadge';
import Title from '~/components/header/Title';
import { createScreen } from '~/navigation';
import ComponentSVGs from '~/svg/components';
import formatNumber from '~/utils/formatNumber';

import SuggestOption from './SuggestOption';

export default createScreen(
	'DebitSpendingLimit',
	(props) => {
		const {} = props;

		const theme = useTheme();

		const [amount, setAmount] = useState<number>(0);

		const handleAmountChange = useCallback((input: string) => {
			try {
				const parsedInput = Number(input.replace(/\D/g, ''));
				if (typeof parsedInput === 'number') setAmount(parsedInput);
			} catch (error) {}
		}, []);

		const displayAmount = !amount || amount === 0 ? '' : formatNumber(amount);
		const submittable = !!amount && typeof amount === 'number';
		const suggestions = [5000, 10000, 20000];

		return (
			<Stack backgroundColor={'secondary.500'} flex={1}>
				<Title marginX={'6'}>{'Spending Limit'}</Title>

				<Stack backgroundColor={'white'} borderTopRadius={'3xl'} flex={1} marginTop={'10'}>
					<Row alignItems={'center'} marginTop={'8'} marginX={'6'}>
						<ComponentSVGs.SpeedOMeter fill={theme.colors.secondary[500]} height={16} width={16} />
						<Text color={'ink-dark.500'} fontSize={14} fontWeight={'medium'} marginLeft={'3'}>
							{'Set a weekly debit card spending limit'}
						</Text>
					</Row>

					<Input
						InputLeftElement={<CurrencyBadge currency={'S$'} />}
						autoCapitalize={'none'}
						autoComplete={'off'}
						autoCorrect={false}
						color={'ink-dark.500'}
						fontSize={24}
						fontWeight={'bold'}
						keyboardType={'number-pad'}
						marginX={'6'}
						maxLength={11}
						value={displayAmount}
						variant={'underlined'}
						autoFocus
						onChangeText={handleAmountChange}
					/>

					<Text
						color={'ink-dark.500:alpha.40'}
						fontSize={13}
						fontWeight={'normal'}
						marginTop={'3'}
						marginX={'6'}>
						{'Here weekly means the last 7 days - not the calendar week'}
					</Text>

					<Row marginTop={'8'} marginX={'6'} space={'3'}>
						{suggestions.map((value) => (
							<SuggestOption key={value} currency={'S$'} value={value} onPress={setAmount} />
						))}
					</Row>

					<Button
						_disabled={{
							backgroundColor: 'disabled.500',
							opacity: 1,
							_text: { color: 'white' },
						}}
						_text={{ fontWeight: 'semibold', fontSize: 16 }}
						alignSelf={'center'}
						isDisabled={!submittable}
						marginBottom={'6'}
						marginTop={'auto'}
						shadow={'2'}
						style={styles.button}
						width={300}>
						{'Save'}
					</Button>
				</Stack>
			</Stack>
		);
	},
	{
		enableKbDismiss: true,
	},
);

const styles = StyleSheet.create({
	button: {
		height: 56,
		borderRadius: 30,
	},
});
