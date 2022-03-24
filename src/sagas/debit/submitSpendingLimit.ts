import type { SagaIterator } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import { navigationRef } from '~/navigation';
import { sagas, actions } from '~/redux';

const TAG = 'submitSpendingLimit' as const;

export default function* submitSpendingLimit(
	action: ReturnType<typeof sagas.debit.submitSpendingLimit>,
): SagaIterator {
	const key = action.type;

	try {
		yield put(actions.session.start({ key }));

		const response: Response = yield call(fetch, '/api/spending-limit', {
			method: 'POST',
			body: JSON.stringify({ spendingLimitAmount: action.payload.amount }),
		});

		if (response.status !== 200) throw new Error(`(${response.status}) Failed to submit`);

		// Should refresh data at the debit card screen
		yield put(sagas.debit.fetchDebitData());

		// Navigate back to credit card screen
		navigationRef.navigate('HomeRoot', { screen: 'DebitCard' });

		yield put(actions.session.stop({ key }));
	} catch (error) {
		console.error(TAG, error);
		yield put(actions.session.stop({ key, error }));
	}
}
