import type { SagaIterator } from 'redux-saga';
import { takeLeading } from 'redux-saga/effects';

import { sagas } from '~/redux';

import fetchDebitData from './fetchDebitData';

export function* debitSagas(): SagaIterator {
	yield takeLeading(sagas.debit.fetchDebitData, fetchDebitData);
	// yield takeLeading(sagas.debit.submitSpendingLimit, fetchProfile);
	// yield takeLeading(sagas.debit.disableSpendingLimit, fetchProfile);
}
