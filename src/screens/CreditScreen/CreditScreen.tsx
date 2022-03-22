import React from 'react';

import PlaceholderContent from '~/components/PlaceholderContent';
import { createScreen } from '~/navigation';

export default createScreen(
	'Credit',
	(props) => {
		const {} = props;

		return <PlaceholderContent text={'Credit Screen'} />;
	},
	{ disableBottomSafeArea: true },
);
