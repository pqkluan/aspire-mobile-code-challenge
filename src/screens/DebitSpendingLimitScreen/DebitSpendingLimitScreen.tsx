import { Stack, Text } from 'native-base';
import React from 'react';

import { createScreen } from '~/navigation';

export default createScreen('DebitSpendingLimit', (props) => {
	const {} = props;

	return (
		<React.Fragment>
			<Stack flex={1} justifyContent={'center'}>
				<Text textAlign={'center'}>{'Debit Spending Limit Screen'}</Text>
			</Stack>
		</React.Fragment>
	);
});
