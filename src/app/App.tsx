import '~/api/MockServer';
import { NavigationContainer } from '@react-navigation/native';
import type { FC } from 'react';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { navigationRef } from '~/navigation';
import { sagaMiddleware, startSaga } from '~/sagas';
import store from '~/store';
import { ReactNavigationTheme } from '~/theme';

import NativeBaseProvider from './NativeBaseProvider';
import { RootNavigator } from './RootNavigator';

const App: FC = () => {
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		async function initApp() {
			try {
				store.createStore([sagaMiddleware]);

				/**
				 * = NOTES =
				 * - We use promise.all to speed up the app launch time.
				 * - Every promise in the list should contains their own error (catching & logging).
				 * - Be very careful when adding new item to the list.
				 *   You should check if the new item depended on any other item(s).
				 *   If that is the case, then you need to breakdown the list into groups and await them in dependencies order.
				 */
				await Promise.all([store.rehydrateStore(), startSaga()]);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		initApp();
	}, []);

	if (loading || !store.persistor) return <View />;

	return (
		<Provider store={store.instance}>
			<PersistGate loading={null} persistor={store.persistor}>
				<NativeBaseProvider>
					<NavigationContainer ref={navigationRef} theme={ReactNavigationTheme}>
						<RootNavigator />
					</NavigationContainer>
				</NativeBaseProvider>
			</PersistGate>
		</Provider>
	);
};

export default App;
