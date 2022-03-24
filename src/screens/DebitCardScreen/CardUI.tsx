import { Box, Row, Stack, Text, useTheme } from 'native-base';
import type { FC } from 'react';
import React, { useCallback, useState, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';

import { selectors } from '~/redux';
import ComponentSVGs from '~/svg/components';
import type { CardholderData } from '~/types/debit-card';
import BrandsMetadata from '~/utils/BrandsMetadata';

import ToggleMaskButton from './ToggleMaskButton';

type Props = {};

const defaultCard: CardholderData = {
	brand: 'VISA',
	PAN: '???? ???? ???? ????',
	cardholderName: '?',
	expirationDate: '??/??',
	cardValidationCode: '???',
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
	const {} = props;

	const theme = useTheme();
	const cardDimensions = useCardDimension();

	const cardData = useSelector(selectors.debit.cardData) || defaultCard;
	const { brand, PAN, cardValidationCode, cardholderName, expirationDate } = cardData;
	const { SVGComponent, cardValidationCodeTerm } = BrandsMetadata[brand];
	const splitPAN = useMemo(() => PAN.split(' '), [PAN]);

	const [masked, setMasked] = useState<boolean>(true);
	const handleToggle = useCallback(() => setMasked((x) => !x), []);

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
				<ToggleMaskButton masked={masked} onPress={handleToggle} />

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
						{cardholderName}
					</Text>

					<Row marginTop={'6'} marginX={'6'} space={'6'}>
						{splitPAN.map((text, i) => (
							<Text key={text + i} color={'white'} fontSize={14} fontWeight={'semibold'}>
								{masked && i < splitPAN.length - 1 ? '●●●●' : text}
							</Text>
						))}
					</Row>

					<Row marginTop={'2'} marginX={'6'} space={'8'}>
						<Text
							color={'white'}
							fontSize={13}
							fontWeight={'semibold'}>{`Thru: ${expirationDate}`}</Text>

						<Text
							color={'white'}
							fontSize={13}
							fontWeight={'semibold'}>{`${cardValidationCodeTerm}: ${
							masked ? '✱✱✱' : cardValidationCode
						}`}</Text>
					</Row>

					<Box bottom={'6'} position={'absolute'} right={'6'}>
						<SVGComponent fill={theme.colors.white} height={21} width={74} />
					</Box>
				</Stack>
			</Stack>
		</Box>
	);
};

export default CardUI;
