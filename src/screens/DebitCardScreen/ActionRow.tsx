import { Column, Pressable, Row, Text } from 'native-base';
import type { FC } from 'react';
import React from 'react';
import type { SvgProps } from 'react-native-svg';

type Props = {
	SVGComponent: FC<SvgProps>;
	title: string;
	desc: string;
	onPress: () => void;
};

const ActionRow: FC<Props> = (props) => {
	const { SVGComponent, title, desc, onPress, children } = props;

	return (
		<Pressable
			_pressed={{ backgroundColor: 'secondary.200', opacity: 0.8 }}
			marginTop={'4'}
			onPress={onPress}>
			<Row paddingLeft={'6'} paddingRight={children ? '5' : '6'} paddingY={'2'}>
				<SVGComponent height={32} width={32} />

				<Column flex={1} paddingLeft={'3'}>
					<Text color={'ink-blue.500'} fontSize={14} fontWeight={'medium'}>
						{title}
					</Text>

					<Text color={'ink-dark.500:alpha.40'} fontSize={13}>
						{desc}
					</Text>
				</Column>
				{children}
			</Row>
		</Pressable>
	);
};

export default ActionRow;
