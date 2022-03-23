import { Box, useTheme } from 'native-base';
import type { FC } from 'react';
import React from 'react';

import ComponentSVGs from '~/svg/components';

type Props = {
	marginEnabled: boolean;
	size?: number;
};

const Logo: FC<Props> = (props) => {
	const { marginEnabled, size = 25 } = props;

	const theme = useTheme();

	return (
		<Box marginRight={marginEnabled ? '4' : '0'}>
			<ComponentSVGs.Logo fill={theme.colors.primary[500]} height={size} width={size} />
		</Box>
	);
};

export default Logo;
