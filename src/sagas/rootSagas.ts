import type { SagaIterator } from 'redux-saga';
import type { ForkEffect } from 'redux-saga/effects';
import { all, call, spawn } from 'redux-saga/effects';

import { debitSagas } from './debit';

function safetyWrap(saga: () => SagaIterator<any>): ForkEffect<any> {
	function* wrapped(): SagaIterator {
		// Wrap each saga collections with a try-catch safetyWrap.
		// The safetyWrap will be finish if the child saga is returned.
		// If crash occurs, the error will be catch, logged, then the child saga will be restart.
		while (true) {
			try {
				yield call(saga);
				break;
			} catch (error) {
				console.error('safetyWrap', error);
			}
		}
	}

	// Spawn is similar to fork.
	// But it will disconnect your child saga from its parent,
	// allowing it to fail without crashing it's parent.
	return spawn(wrapped);
}

export default function* rootSaga(): SagaIterator {
	const sagas = [
		debitSagas,
		// more sagas...
	];

	try {
		yield all(sagas.map(safetyWrap));
		console.info('Redux-saga started');
	} catch (error) {
		console.error(error);
	}
}
