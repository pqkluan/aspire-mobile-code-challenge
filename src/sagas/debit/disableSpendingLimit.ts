import type { SagaIterator } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import { sagas, actions } from '~/redux';

const TAG = 'disableSpendingLimit' as const;

export default function* disableSpendingLimit(
	action: ReturnType<typeof sagas.debit.disableSpendingLimit>,
): SagaIterator {
	const key = action.type;

	try {
		yield put(actions.session.start({ key }));

		const response: Response = yield call(fetch, '/api/spending-limit', { method: 'DELETE' });

		if (response.status !== 200) throw new Error(`(${response.status}) Failed to process`);

		// Should refresh data at the debit card screen
		yield put(sagas.debit.fetchDebitData());

		yield put(actions.session.stop({ key }));
	} catch (error) {
		console.error(TAG, error);
		yield put(actions.session.stop({ key, error }));
	}
}
