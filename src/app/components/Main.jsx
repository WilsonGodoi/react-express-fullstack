import React from "react";
import { Provider } from "react-redux";
import { Redirect, Route, Router } from "react-router-dom";
import { store } from "../store";
import { history } from "../store/history";
import { ConnectedDashboard } from "./Dashboard";
import { ConnectedLogin } from "./Login";
import { ConnectedNavigation } from "./Navigation";
import { ConnectTaskDetail } from "./TaskDetail";

const RouteGuard = (Component) => ({ match }) => {
  if (!store.getState().session.authenticated) {
    return <Redirect to="/" />;
  } else {
    return <Component match={match} />;
  }
};

export const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <div>
        <ConnectedNavigation />
        <Route exact path="/" component={ConnectedLogin} />
        <Route
          exact
          path="/dashboard"
          render={RouteGuard(ConnectedDashboard)}
        />
        <Route exact path="/task/:id" render={RouteGuard(ConnectTaskDetail)} />
      </div>
    </Provider>
  </Router>
);
