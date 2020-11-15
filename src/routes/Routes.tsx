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
import ClientDetails from './clients/details/ClientDetails';
import Couriers from './couriers/Couriers';
import CourierDetails from 'routes/couriers/details/CourierDetails';
import Restaurants from './restaurants/Restaurants';
import RestaurantDetails from './restaurants/details/RestaurantDetails';
import {useAuthActions} from 'state/hooks/UseActions';
import Settings from 'routes/settings/Settings';
import Payments from './payments/Payments';
import Dishes from 'routes/dishes/Dishes';
import Sets from 'routes/sets/Contacts';
import Statuses from 'routes/statuses/Statuses';
import WeekMenu from './weekMenu/WeekMenu';

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
          <AppRoute
            exact
            path="/statuses"
            component={Statuses}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/statuses/create"
            component={Statuses}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/statuses/:id"
            component={Statuses}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/weekMenu"
            component={WeekMenu}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/weekMenu/cuisine/:id"
            component={WeekMenu}
            layout={Layout.AdminLayout}
          />
          <AppRoute exact path="/dishes" component={Dishes} layout={Layout.AdminLayout} />
          <AppRoute
            exact
            path="/dishes/create"
            component={Dishes}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/dishes/:id"
            component={Dishes}
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
            path="/customers/:clientId"
            component={ClientDetails}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/customers/:clientId/editProfile"
            component={ClientDetails}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/couriers"
            component={Couriers}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/couriers/:courierId"
            component={CourierDetails}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/couriers/:courierId/editProfile"
            component={CourierDetails}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/couriers/:courierId/changingHistory"
            component={CourierDetails}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/couriers/:courierId/ordersHistory"
            component={CourierDetails}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/payments/:userType"
            component={Payments}
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
            path="/restaurants"
            component={Restaurants}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/restaurants/create"
            component={RestaurantDetails}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/restaurants/:restaurantId"
            component={RestaurantDetails}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/payments/:paymentId"
            component={RestaurantDetails}
            layout={Layout.AdminLayout}
          />
          <AppRoute
            exact
            path="/payments/:paymentId/editData"
            component={RestaurantDetails}
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
