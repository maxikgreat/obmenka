import {createAction} from 'redux-actions';
import types from './types';
import Client from 'entities/Client';
import {NavigationPayload} from 'state/ducks/router/actions';
import UpdateRateRequest from '../../../api/entities/UpdateRateRequest';

export type FetchDetailsCompleted = {
  client: Client;
};

export type UpdateRate = {
  request: UpdateRateRequest;
} & NavigationPayload;

export default {
  updateRateRequest: createAction<UpdateRate>(types.UPDATE_RATE),
  updateRateRequestCompleted: createAction(types.UPDATE_RATE_COMPLETED),
};
