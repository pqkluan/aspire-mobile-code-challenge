import type { SagaIterator } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import type { sagas } from '~/redux';
import { actions } from '~/redux';

const TAG = 'fetchDebitData' as const;

export default function* fetchDebitData(
	action: ReturnType<typeof sagas.debit.fetchDebitData>,
): SagaIterator {
	const key = action.type;

	try {
		yield put(actions.session.start({ key }));

		const response = yield call(fetch, '/api/debit');
		const data = yield response.json();
		// Note: in real app, data need to be strong-typed, usually exported types by backend
		// and data as DTO usually need to be transform before we could put it in redux store
		yield put(actions.debit.setDebitData(data));

		yield put(actions.session.stop({ key }));
	} catch (error) {
		console.error(TAG, error);
		yield put(actions.session.stop({ key, error }));
	}
}
