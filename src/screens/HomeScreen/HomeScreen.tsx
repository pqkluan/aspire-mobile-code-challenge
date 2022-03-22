import React from 'react';

import PlaceholderContent from '~/components/PlaceholderContent';
import { createScreen } from '~/navigation';

export default createScreen(
	'Home',
	(props) => {
		const {} = props;

		return <PlaceholderContent text={'Home Screen'} />;
	},
	{ disableBottomSafeArea: true },
);
