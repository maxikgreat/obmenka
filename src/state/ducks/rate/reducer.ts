import {handleActions, ReducerNextThrow} from 'redux-actions';
import types from './types';
import {
  empty,
  failed,
  LoadableContainer,
  success,
} from '../../entities/LoadableContainer';
import RatesContainer from 'state/entities/RatesContainer';
import Rate from 'entities/Rate';

type ReducerState = LoadableContainer<RatesContainer>;

const fetchRatesCompleted: ReducerNextThrow<ReducerState, Rate[]> = {
  next: (_, {payload}) => success({rates: payload}),
  throw: (_, {payload}) => failed(payload),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default handleActions<ReducerState, any>(
  {
    [types.FETCH_RATES]: (state) => ({...state, isBusy: true}),
    [types.FETCH_RATES_COMPLETED]: fetchRatesCompleted,
  },
  empty(),
);
