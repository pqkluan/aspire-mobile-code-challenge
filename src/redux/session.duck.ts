import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { createSelectorCache } from './utils/createSelectorsCache';

// TODO: should write test for this file since it'll be use a lots

interface SessionReducer {
	loadings: Record<string, boolean>;
	errors: Record<string, string | undefined>;
}

const initialState: SessionReducer = {
	loadings: {},
	errors: {},
};

const { name, actions, reducer } = createSlice({
	name: 'session',
	initialState,
	reducers: {
		setLoading(state, action: PayloadAction<{ key: string; loading: boolean }>) {
			const { key, loading } = action.payload;
			state.loadings[key] = loading;
		},
		setError: {
			prepare(payload: { key: string; error?: Error | string }) {
				const { key, error } = payload;
				return { payload: { key, error: error instanceof Error ? error.message : error } };
			},
			reducer(state, action: PayloadAction<{ key: string; error?: string }>) {
				const { key, error } = action.payload;
				state.errors[key] = error;
			},
		},
		start(state, action: PayloadAction<{ key: string }>) {
			const { key } = action.payload;
			state.loadings[key] = true;
			state.errors[key] = undefined;
		},
		stop: {
			prepare(payload: { key: string; error?: unknown }) {
				const { key, error } = payload;

				let errorText: string;
				if (!error) {
					errorText = '';
				} else {
					if (typeof error === 'string') errorText = error;
					else if (error instanceof Error) errorText = error.message;
					else errorText = JSON.stringify(error);
				}
				return { payload: { key, error: errorText } };
			},
			reducer(state, action: PayloadAction<{ key: string; error?: string }>) {
				const { key, error } = action.payload;
				state.loadings[key] = false;
				state.errors[key] = error;
			},
		},
	},
});

type State = { [name]: SessionReducer };

const selectors = {
	loading: createSelectorCache((state: State, key: string) => {
		return !!state?.[name]?.loadings?.[key];
	}),
	error: createSelectorCache((state: State, key: string) => {
		return state[name]?.errors?.[key];
	}),
};

const sessionDuck = {
	name,
	actions,
	reducer,
	selectors,
};

export default sessionDuck;
