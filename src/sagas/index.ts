import createSagaMiddleware from 'redux-saga';

import rootSagas from './rootSagas';

const sagaMiddleware = createSagaMiddleware();

function startSaga(): Promise<void> {
	return sagaMiddleware.run(rootSagas).toPromise();
}

export { sagaMiddleware, startSaga };
