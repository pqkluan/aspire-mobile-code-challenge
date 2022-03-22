import { Button, Stack, Text } from 'native-base';
import React, { useCallback } from 'react';

import { createScreen } from '~/navigation';

export default createScreen(
	'DebitCard',
	(props) => {
		const { navigation } = props;

		const handlePress = useCallback(() => {
			navigation.navigate('DebitSpendingLimit');
		}, [navigation]);

		return (
			<React.Fragment>
				<Stack flex={1} justifyContent={'center'}>
					<Text textAlign={'center'}>{'Debit Card Screen'}</Text>

					<Button mx={'12'} onPress={handlePress}>
						{'Weekly spending limit'}
					</Button>
				</Stack>
			</React.Fragment>
		);
	},
	{ disableBottomSafeArea: true },
);
