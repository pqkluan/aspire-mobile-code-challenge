import { Box, useTheme } from 'native-base';
import type { FC } from 'react';
import React from 'react';

import ComponentSVGs from '~/svg/components';

type Props = {
	enabled: boolean;
};

const Toggle: FC<Props> = (props) => {
	const { enabled } = props;

	const theme = useTheme();

	// TODO: Add animation when props updated

	return (
		<Box>
			{enabled ? (
				<ComponentSVGs.ToggleOn fill={theme.colors.primary[500]} height={20} width={34} />
			) : (
				<ComponentSVGs.ToggleOff fill={theme.colors.disabled[500]} height={20} width={34} />
			)}

			<Thumb position={enabled ? 'right' : 'left'} />
		</Box>
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
