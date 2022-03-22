import React from 'react';

import PlaceholderContent from '~/components/PlaceholderContent';
import { createScreen } from '~/navigation';

export default createScreen(
	'Payment',
	(props) => {
		const {} = props;

		return <PlaceholderContent text={'Payment Screen'} />;
	},
	{ disableBottomSafeArea: true },
);
