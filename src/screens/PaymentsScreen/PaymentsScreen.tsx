import React from 'react';

import PlaceholderContent from '~/components/PlaceholderContent';
import { createScreen } from '~/navigation';

export default createScreen(
	'Payments',
	(props) => {
		const {} = props;

		return <PlaceholderContent text={'Payments Screen'} />;
	},
	{ disableBottomSafeArea: true },
);
