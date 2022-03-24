import type { PayloadAction } from '@reduxjs/toolkit';
import { createAction, createSlice } from '@reduxjs/toolkit';

import type { CardholderData, SupportCurrency } from '~/types/debit-card';

interface DebitReducer {
	currency: SupportCurrency;
	balanceAmount: number;

	cardData?: CardholderData;

	spendingLimitSuggestions: number[];
	spendingLimitEnabled: boolean;
	spendingLimitAmount: number;
	spentAmount: number;
}

const initialState: DebitReducer = {
	// Note: some assumption were made here, but base on the design, I defaulted to SGD
	currency: 'SGD',
	balanceAmount: 0,

	cardData: undefined,

	spendingLimitSuggestions: [],
	spendingLimitEnabled: false,
	spendingLimitAmount: 0,
	spentAmount: 0,
};

const { name, actions, reducer } = createSlice({
	name: 'debit',
	initialState,
	reducers: {
		setDebitData(state, action: PayloadAction<Required<DebitReducer>>) {
			// Note: I put all data into 1 API + 1 single action handle here
			// But in real scenario, these data will be fetched from many API endpoints
			// and will be handle by more specific actions

			state.currency = action.payload.currency;
			state.balanceAmount = action.payload.balanceAmount;

			state.cardData = action.payload.cardData;

			state.spendingLimitSuggestions = action.payload.spendingLimitSuggestions;
			state.spendingLimitEnabled = action.payload.spendingLimitEnabled;
			state.spendingLimitAmount = action.payload.spendingLimitAmount;
			state.spentAmount = action.payload.spentAmount;
		},
	},
});

/**=================== Sagas ====================== */

const sagas = {
	fetchDebitData: createAction<void>(`${name}@fetchDebitData`),
	submitSpendingLimit: createAction<{ amount: number }>(`${name}@submitSpendingLimit`),
	disableSpendingLimit: createAction<void>(`${name}@disableSpendingLimit`),
};

/**=================== Selectors ====================== */
type State = { [name]: DebitReducer };

const selectors = {
	currency(state: State): SupportCurrency {
		return state[name].currency;
	},
	balanceAmount(state: State): number {
		return state[name].balanceAmount;
	},
	cardData(state: State): CardholderData | undefined {
		return state[name].cardData;
	},
	spendingLimitSuggestions(state: State): number[] {
		return state[name].spendingLimitSuggestions;
	},
	spendingLimit(
		state: State,
	): Pick<DebitReducer, 'spendingLimitEnabled' | 'spendingLimitAmount' | 'spentAmount'> {
		return {
			spentAmount: state[name].spentAmount,
			spendingLimitAmount: state[name].spendingLimitAmount,
			spendingLimitEnabled: state[name].spendingLimitEnabled,
		};
	},
};

const debitDuck = {
	name,
	actions,
	reducer,
	sagas,
	selectors,
};

export default debitDuck;
