import React from 'react';

import PlaceholderContent from '~/components/PlaceholderContent';
import { createScreen } from '~/navigation';

export default createScreen(
	'Profile',
	(props) => {
		const {} = props;

		return <PlaceholderContent text={'Profile Screen'} />;
	},
	{ disableBottomSafeArea: true },
);
