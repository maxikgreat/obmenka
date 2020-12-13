import {SessionContainer} from './Session';
import {LoadableContainer} from 'state/entities/LoadableContainer';
import {Auth} from 'state/entities/Auth';
import {SnackBar} from 'state/entities/SnackBar';
import RatesContainer from './RatesContainer';

export default interface State {
  session: SessionContainer;
  auth: Auth;
  snackBar: SnackBar;
  rates: LoadableContainer<RatesContainer>;
}
