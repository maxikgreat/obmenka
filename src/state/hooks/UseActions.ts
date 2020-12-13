import {useDispatch} from 'react-redux';
import {actions as authActions} from '../ducks/auth';
import {actions as sessionActions} from '../ducks/session';
import RegisterRequest from 'auth/RegisterRequest';
import LoginRequest from 'api/entities/LoginRequest';
import UpdateUserRequest from 'state/ducks/session/models';
import ForgotPasswordRequest from 'api/entities/ForgotPasswordRequest';
import {snackBarActions} from 'state/ducks/snackBar';
import {useHistory} from 'react-router-dom';
import {rateActions} from '../ducks/rate';
import {rateEditActions} from '../ducks/rateEdit';
import UpdateRateRequest from '../../api/entities/UpdateRateRequest';

export function useAuthActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    registerUser: (registerRequest: RegisterRequest) => {
      dispatch(authActions.registerUser({request: registerRequest, history}));
    },
    login: (loginRequest: LoginRequest) => {
      return dispatch(authActions.login({request: loginRequest, history}));
    },
    updateUserProfile: (updateRequest: UpdateUserRequest) => {
      dispatch(sessionActions.updateUserProfile(updateRequest));
    },
    logout: () => dispatch(authActions.logout({history})),
    recoverPassword: (email: ForgotPasswordRequest) => {
      dispatch(authActions.recoverPassword({request: email, history}));
    },
    updateProfileImage: (imageId: string) =>
      dispatch(sessionActions.updateProfileImage(imageId)),
    chooseAvatar: () => dispatch(authActions.chooseAvatar()),
  };
}

export function useSessionsActions() {
  const dispatch = useDispatch();

  return {
    fetchSession: () => dispatch(sessionActions.fetchSession()),
  };
}

export function useRateEditActions() {
  const dispatch = useDispatch();
  const history = useHistory();

  return {
    updateRate: (updateRateRequest: UpdateRateRequest) => {
      dispatch(
        rateEditActions.updateRateRequest({
          request: updateRateRequest,
          history,
        }),
      );
    },
  };
}

export function useRateActions() {
  const dispatch = useDispatch();

  return {
    fetchRates: () => dispatch(rateActions.fetchRates()),
  };
}

export function useSnackBarActions() {
  const dispatch = useDispatch();
  return {
    closeSnackBar: () => dispatch(snackBarActions.clearSnackbar()),
  };
}
