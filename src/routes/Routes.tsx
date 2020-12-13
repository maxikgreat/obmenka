import React, {Suspense, useEffect} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Auth from './auth';
import Loader from '../components/Loader/Loader';
import Config from 'app/Config';
import AppRoute from './AppRoute';
import Layout from 'layouts';
import Rate from './orders/Rate';
import RateEdit from './orders/details/RateEdit';
import CrossRate from './clients/CrossRate';
import {useAuthActions} from 'state/hooks/UseActions';
import Settings from 'routes/settings/Settings';
import Sets from 'routes/sets/Contacts';

const Logout = () => {
  const actions = useAuthActions();
  useEffect(() => {
    actions.logout();
  }, []);
  return <></>;
};

const Routes: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter basename={Config.getPublicUrl()}>
        <Switch>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route exact path="/main">
            <Redirect to="/auth" />
          </Route>
          <Route exact path="/">
            <Redirect to="/rate" />
          </Route>
          <Route exact path="/main">
            <Redirect to="/customers" />
          </Route>
          <Route exact path="/main">
            <Redirect to="/couriers" />
          </Route>
          <Route exact path="/main">
            <Redirect to="/restaurants" />
          </Route>
          <Route exact path="/main">
            <Redirect to="/payments" />
          </Route>
          <Route exact path="/main">
            <Redirect to="/cuisines" />
          </Route>
          <Route exact path="/main">
            <Redirect to="/dishes" />
          </Route>
          <Route exact path="/main">
            <Redirect to="/sets" />
          </Route>
          <Route exact path="/main">
            <Redirect to="/statuses" />
          </Route>
          <Route exact path="/main">
            <Redirect to="/weekMenu" />
          </Route>
          <Route exact path="/main">
            <Redirect to="/settings" />
          </Route>
          <AppRoute exact path="/rate" component={Rate} layout={Layout.AdminLayout} />
          <AppRoute
            exact
            path="/orders/:id"
            component={RateEdit}
            layout={Layout.AdminLayout}
          />
          <AppRoute exact path="/sets" component={Sets} layout={Layout.AdminLayout} />
          <AppRoute
            exact
            path="/sets/create"
            component={Sets}
            layout={Layout.AdminLayout}
          />
          <AppRoute exact path="/sets/:id" component={Sets} layout={Layout.AdminLayout} />
          <AppRoute
            exact
            path="/customers"
            component={CrossRate}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/settings"
            component={Settings}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/auth"
            component={Auth.Welcome}
            layout={Layout.AuthLayout}
          />
          <AppRoute
            exact
            path="/signUp"
            component={Auth.SignUp}
            layout={Layout.AuthLayout}
          />
          <AppRoute
            exact
            path="/forgotPassword"
            component={Auth.ForgotPassword}
            layout={Layout.AuthLayout}
          />
        </Switch>
      </BrowserRouter>
    </Suspense>
  );
};

export default Routes;
