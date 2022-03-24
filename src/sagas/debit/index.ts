import type { SagaIterator } from 'redux-saga';
import { takeLeading } from 'redux-saga/effects';

import { sagas } from '~/redux';

import disableSpendingLimit from './disableSpendingLimit';
import fetchDebitData from './fetchDebitData';
import submitSpendingLimit from './submitSpendingLimit';

export function* debitSagas(): SagaIterator {
	yield takeLeading(sagas.debit.fetchDebitData, fetchDebitData);
	yield takeLeading(sagas.debit.submitSpendingLimit, submitSpendingLimit);
	yield takeLeading(sagas.debit.disableSpendingLimit, disableSpendingLimit);
}
