import type { INativebaseConfig } from 'native-base';
import { NativeBaseProvider as OriginalNativeBaseProvider } from 'native-base';
import React from 'react';

import { nativeBaseTheme } from '~/theme';

const nativeBaseConfig: INativebaseConfig = {
	strictMode: 'error',
	theme: nativeBaseTheme,
};

const NativeBaseProvider: React.FC = (props) => (
	<OriginalNativeBaseProvider config={nativeBaseConfig}>
		{props.children}
	</OriginalNativeBaseProvider>
);

export default NativeBaseProvider;
