import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api/index';
import actions from './actions';
import {snackBarActions} from '../snackBar';
import {processError} from '../alert/saga';
import Rate from 'entities/Rate';

function* fetchRates() {
  try {
    const rates: Rate[] = yield SpoonAndForkApi.getRates();

    yield put(actions.fetchRatesCompleted(rates));
  } catch (e) {
    yield put(actions.fetchRatesCompleted(e));
  }
}

function* fetchRatesCompleted({payload, error}: Action<Rate[]>) {
  if (error) {
    yield put(
      snackBarActions.showSnackbar({
        message: processError({error: payload}),
        type: 'error',
      }),
    );
  }
}

export default function* () {
  yield all([
    //
    takeEvery(types.FETCH_RATES, fetchRates),
    takeEvery(types.FETCH_RATES_COMPLETED, fetchRatesCompleted),
  ]);
}
