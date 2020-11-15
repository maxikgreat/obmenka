import {createAction} from 'redux-actions';
import types from './types';
import Rate from 'entities/Rate';

export default {
  fetchRates: createAction(types.FETCH_RATES),
  fetchRatesCompleted: createAction<Rate[]>(types.FETCH_RATES_COMPLETED),
};
