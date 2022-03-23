import { Stack } from 'native-base';
import React from 'react';

import Title from '~/components/header/Title';
import { createScreen } from '~/navigation';

export default createScreen('DebitSpendingLimit', (props) => {
	const {} = props;

	return (
		<Stack backgroundColor={'secondary.500'} flex={1}>
			<Title marginX={'6'}>{'Spending Limit'}</Title>
		</Stack>
	);
});
