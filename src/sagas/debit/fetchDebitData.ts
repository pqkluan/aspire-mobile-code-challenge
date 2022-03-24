// import { PatientApi } from '@app/apis';
// import type { AccountProfile } from '@app/typings/account';
// import type { AccountProfileResponse } from '@silenteer/hermes/resource/mobile-app-resource/model';
import type { SagaIterator } from 'redux-saga';
import { delay, put } from 'redux-saga/effects';

import type { sagas } from '~/redux';
import { actions } from '~/redux';

const TAG = 'fetchDebitData' as const;

export default function* fetchDebitData(
	action: ReturnType<typeof sagas.debit.fetchDebitData>,
): SagaIterator {
	const key = action.type;

	try {
		yield put(actions.session.start({ key }));
		// const result: AccountProfileResponse = yield call(PatientApi.getSelfInformation);

		// const { insuranceNumber, firstName, lastName, dob, gender, phone } = result;

		// const profile: AccountProfile = {
		// 	insuranceNumber,
		// 	firstName,
		// 	lastName,
		// 	dob,
		// 	gender,
		// 	phone,
		// };
		// yield put(actions.account.setProfile(profile));

		yield delay(1000);

		yield put(
			actions.debit.setDebitData({
				balanceAmount: 3000,
				currency: 'SGD',
				cardData: {
					brand: 'VISA',
					cardholderName: 'Mark Henry',
					expirationDate: '12/20',
					cardValidationCode: '456',
					PAN: '5647 3411 2413 2020',
				},
				spendingLimitAmount: 5000,
				spendingLimitEnabled: true,
				spentAmount: 345,
			}),
		);

		yield put(actions.session.stop({ key }));
	} catch (error) {
		console.error(TAG, error);
		yield put(actions.session.stop({ key, error }));
	}
}
