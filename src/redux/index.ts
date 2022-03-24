import { combineReducers } from 'redux';

import debit from './debit.duck';
import session from './session.duck';

const storeNames = {
	[debit.name]: debit.name,
	[session.name]: session.name,
};

const actions = {
	[debit.name]: debit.actions,
	[session.name]: session.actions,
};

const selectors = {
	[debit.name]: debit.selectors,
	[session.name]: session.selectors,
};

const sagas = {
	[debit.name]: debit.sagas,
};

const reducers = {
	[debit.name]: debit.reducer,
	[session.name]: session.reducer,
};

const rootReducer = combineReducers(reducers);
export type RootState = ReturnType<typeof rootReducer>;

export { storeNames, actions, sagas, selectors, rootReducer };
