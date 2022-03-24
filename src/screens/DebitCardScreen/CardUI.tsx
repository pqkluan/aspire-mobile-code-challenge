import { Box, Row, Stack, Text, useTheme } from 'native-base';
import type { FC } from 'react';
import React, { useState, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

import ComponentSVGs from '~/svg/components';
import type { CardholderData } from '~/types/debit-card';

import ToggleMaskButton from './ToggleMaskButton';

type Props = {
	data: CardholderData;
};

function useCardDimension(): { height: number; width: number } {
	const { width: windowWidth } = useWindowDimensions();

	const cardDimensions = useMemo(() => {
		const screenPadding = 24 * 2;
		const cardWidth = windowWidth - screenPadding;
		const cardRatio = 0.628;
		const cardHeight = cardWidth * cardRatio;
		return { height: cardHeight, width: cardWidth };
	}, [windowWidth]);

	return cardDimensions;
}

const CardUI: FC<Props> = (props) => {
	const { data } = props;

	const cardDimensions = useCardDimension();
	const theme = useTheme();
	const [masked, setMasked] = useState<boolean>(true);

	const splitPAN = useMemo(() => data.PAN.split(' '), [data.PAN]);

	// FIXME: the CVV and brand logo should come from supported record, not hardcode

	return (
		<Box>
			<Box
				backgroundColor={'white'}
				borderTopRadius={'3xl'}
				bottom={0}
				height={cardDimensions.height - 90}
				left={0}
				position={'absolute'}
				right={0}
			/>

			<Stack marginX={'6'}>
				<ToggleMaskButton masked={masked} onPress={() => setMasked((x) => !x)} />

				<Stack
					backgroundColor={'primary.500'}
					borderRadius={'xl'}
					height={cardDimensions.height}
					marginTop={30}
					shadow={'2'}
					width={cardDimensions.width}>
					<Box alignItems={'flex-end'} marginTop={'6'} marginX={'6'}>
						<ComponentSVGs.LogoWithName fill={theme.colors.white} height={21} width={74} />
					</Box>

					<Text color={'white'} fontSize={22} fontWeight={'bold'} marginTop={'6'} marginX={'6'}>
						{data.cardholderName}
					</Text>

					<Row marginTop={'6'} marginX={'6'} space={'6'}>
						{splitPAN.map((text, i) => (
							<Text key={text} color={'white'} fontSize={14} fontWeight={'semibold'}>
								{masked && i < splitPAN.length - 1 ? '●●●●' : text}
							</Text>
						))}
					</Row>

					<Row marginTop={'2'} marginX={'6'} space={'8'}>
						<Text
							color={'white'}
							fontSize={13}
							fontWeight={'semibold'}>{`Thru: ${data.expirationDate}`}</Text>

						<Text color={'white'} fontSize={13} fontWeight={'semibold'}>{`CVV: ${
							masked ? '✱✱✱' : data.cardValidationCode
						}`}</Text>
					</Row>

					<Box bottom={'6'} position={'absolute'} right={'6'}>
						<ComponentSVGs.VisaLogo fill={theme.colors.white} height={21} width={74} />
					</Box>
				</Stack>
			</Stack>
		</Box>
	);
};

export default CardUI;
