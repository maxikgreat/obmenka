import types from './types';
import {all, put, takeEvery} from 'redux-saga/effects';
import {Action} from 'redux-actions';
import {SpoonAndForkApi} from 'api/index';
import actions, {UpdateRate} from './actions';
import {actions as snackActions} from '../snackBar';
import {actions as rateActions} from '../rate';
import {processError} from '../alert/saga';
import Rate from 'entities/Rate';
import {mapUpdateRateRequestToGQL} from 'api/Mappers';

function* updateRate({payload: {request}}: Action<UpdateRate>) {
  try {
    yield SpoonAndForkApi.updateRateRequest(mapUpdateRateRequestToGQL(request));

    yield put(actions.updateRateRequestCompleted(request));
  } catch (e) {
    yield put(actions.updateRateRequestCompleted(e));
  }
}

function* updateRateCompleted({payload, error}: Action<Rate>) {
  if (error) {
    yield put(
      snackActions.showSnackbar({message: processError({error: payload}), type: 'error'}),
    );
    return;
  }

  yield put(rateActions.fetchRates());
}

export default function* () {
  yield all([
    //
    takeEvery(types.UPDATE_RATE, updateRate),
    takeEvery(types.UPDATE_RATE_COMPLETED, updateRateCompleted),
  ]);
}
