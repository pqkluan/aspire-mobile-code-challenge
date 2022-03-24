import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import type { Action, Middleware, Store } from 'redux';
import type { Persistor, PersistConfig } from 'redux-persist';
import {
	FLUSH,
	PAUSE,
	PERSIST,
	persistReducer,
	persistStore,
	PURGE,
	REGISTER,
	REHYDRATE,
} from 'redux-persist';

import type { RootState } from '~/redux';
import { rootReducer, storeNames } from '~/redux';

const TAG = 'ReduxStore' as const;

class ReduxStore {
	#PERSIST_VERSION = 1;

	#store: Store<RootState, Action<string>>;
	#persistor: Persistor | undefined;
	#persistConfig: PersistConfig<RootState>;

	constructor() {
		// Note: this is an attempt to mute the possible undefined store
		this.#store = {} as any;
		this.#persistConfig = this.#getPersistConfig();
	}

	public createStore(middlewares: Middleware<RootState>[]) {
		this.#store = this.#createStore(this.#persistConfig, middlewares);
	}

	public get instance() {
		return this.#store;
	}

	public get persistor() {
		return this.#persistor;
	}

	public get getState() {
		return this.#store?.getState;
	}

	public get dispatch() {
		return this.#store?.dispatch;
	}

	public async rehydrateStore(): Promise<void> {
		try {
			if (!this.#store) throw new Error('Cannot rehydrate a undefined store');

			await new Promise<void>((resolve) => {
				this.#persistor = persistStore(this.#store, undefined, resolve);
			});
			if (!this.#persistor) throw new Error('Failed to rehydrate redux store');

			console.info(TAG, 're-hydrated');
		} catch (error) {
			console.error(TAG, error);
		}
	}

	#getPersistConfig(): PersistConfig<RootState> {
		return {
			key: 'root',
			version: this.#PERSIST_VERSION,
			storage: AsyncStorage,
			debug: __DEV__,
			blacklist: [
				// session store only contains data that lived in one app usage session
				storeNames.session,
			],
		};
	}

	#createStore(
		config: PersistConfig<RootState>,
		middlewares: Middleware<RootState>[],
	): Store<RootState, Action<string>> {
		return configureStore({
			reducer: persistReducer<RootState>(config, rootReducer),
			middleware(getDefaultMiddleware) {
				// These actions come from redux-persist cause a false warning from redux-toolkit.
				// Therefore we need to add them to ignore list
				const ignoredActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];
				const defaultMiddleware = getDefaultMiddleware({
					serializableCheck: { ignoredActions, warnAfter: 500 },
					immutableCheck: { warnAfter: 500 },
				});
				return [...middlewares, ...defaultMiddleware];
			},
		});
	}
}

const store = new ReduxStore();

export default store;
