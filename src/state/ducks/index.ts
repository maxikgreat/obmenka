import {reducer as sessionReducer, saga as sessionSaga} from './session';
import {saga as authSaga} from './auth';
import authReducer from './auth/reducer';
import {saga as routerSaga} from './router';
import {saga as alertSaga} from './alert';
import {reducer as snackBarReducer} from 'state/ducks/snackBar';
import {reducer as ratesReducer, saga as ratesSaga} from 'state/ducks/rate';
import {saga as rateEditSaga} from 'state/ducks/rateEdit';
import {all} from 'redux-saga/effects';
import State from 'state/entities/State';
import {combineReducers} from 'redux';

export const rootReducer = combineReducers<State>({
  session: sessionReducer,
  auth: authReducer,
  snackBar: snackBarReducer,
  rates: ratesReducer,
});

export function* rootSaga() {
  yield all([
    authSaga(),
    routerSaga(),
    sessionSaga(),
    alertSaga(),
    ratesSaga(),
    rateEditSaga(),
  ]);
}
