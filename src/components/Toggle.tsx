import { Box, useTheme, Pressable } from 'native-base';
import type { FC } from 'react';
import React from 'react';

import ComponentSVGs from '~/svg/components';

type Props = {
	enabled: boolean;
	onPress?: () => void;
} & React.ComponentProps<typeof Pressable>;

const Toggle: FC<Props> = (props) => {
	const { enabled, ...pressableProps } = props;

	const theme = useTheme();

	return (
		<Pressable _pressed={{ opacity: 0.8 }} {...pressableProps}>
			{enabled ? (
				<ComponentSVGs.ToggleOn fill={theme.colors.primary[500]} height={20} width={34} />
			) : (
				<ComponentSVGs.ToggleOff fill={theme.colors.disabled[500]} height={20} width={34} />
			)}

			<Thumb position={enabled ? 'right' : 'left'} />
		</Pressable>
	);
};

const Thumb: FC<{ position: 'left' | 'right' }> = (props) => {
	const { position } = props;

	const positionProps = { [position]: '0.5' };

	return (
		<Box
			backgroundColor={'white'}
			borderRadius={'full'}
			height={4}
			position={'absolute'}
			shadow={'0'}
			top={'0.5'}
			width={4}
			{...positionProps}
		/>
	);
};

export default Toggle;
