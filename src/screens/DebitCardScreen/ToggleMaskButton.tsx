import { Box, Row, Text, useTheme, Pressable } from 'native-base';
import type { FC } from 'react';
import React from 'react';

import ComponentSVGs from '~/svg/components';

type Props = {
	masked: boolean;
	onPress: () => void;
};

const ToggleMaskButton: FC<Props> = (props) => {
	const { masked, onPress } = props;

	const theme = useTheme();

	const SVGComponent = masked ? ComponentSVGs.EyeOn : ComponentSVGs.EyeOff;

	return (
		<Box
			backgroundColor={'white'}
			borderTopRadius={'md'}
			height={44}
			position={'absolute'}
			right={0}
			top={0}>
			<Pressable _pressed={{ opacity: 0.8 }} borderTopRadius={'md'} onPress={onPress}>
				<Row>
					<Box marginLeft={'3'} marginTop={'2'}>
						<SVGComponent fill={theme.colors.primary['500']} height={16} width={16} />
					</Box>
					<Text
						color={'primary.500'}
						fontSize={'xs'}
						fontWeight={'semibold'}
						marginLeft={'1.5'}
						marginRight={'3'}
						marginTop={'2'}>
						{masked ? 'Show card number' : 'Hide card number'}
					</Text>
				</Row>
			</Pressable>
		</Box>
	);
};

export default ToggleMaskButton;
