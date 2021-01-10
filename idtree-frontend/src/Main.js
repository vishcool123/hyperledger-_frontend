import React, { Component } from "react";
import PrivateRoute from "./router/Private.jsx";
import PublicRoute from "./router/Public.jsx";
import { withRouter, Redirect } from "react-router";
import loadable from "@loadable/component";
import { Switch } from "react-router-dom";
import PageLoader from './Dashboard/PageLoader.jsx';

import "./assets/css/font-awesome.min.css";
import "./assets/css/bootstrap.min.css";
import "./assets/css/style.css";
import "./assets/css/responsive.css";
import './assets/css/datatables.min.css';
import './assets/font-awesome/css/font-awesome.css';



const Home = loadable(() => import("./Home/Home.jsx"), {
  fallback: <PageLoader/>,
});
const Login = loadable(() => import("./Auth/login.jsx"), {
  fallback:  <PageLoader/>,
});
const Admin = loadable(() => import("./Dashboard/Admin.jsx"), {
  fallback:  <PageLoader/>,
});
const User = loadable(() => import("./Dashboard/User.jsx"), {
  fallback:  <PageLoader/>,
});
const Signup = loadable(() => import("./Auth/signup.jsx"), {
  fallback:  <PageLoader/>,
});
const Insight = loadable(() => import("./Dashboard/Insight.jsx"), {
  fallback:  <PageLoader/>,
});
const AdminUser = loadable(() => import("./Dashboard/AdminUser.jsx"), {
  fallback:  <PageLoader/>,
});
const BlockList = loadable(() => import("./Dashboard/BlockList.jsx"), {
  fallback:  <PageLoader/>,
});

class Main extends Component {
  render() {
    const route = (
      <Switch>
        <PublicRoute  component={Home} path="/" exact />
        <PublicRoute restricted component={Login} path="/login" exact />
        <PrivateRoute  component={Admin} path="/admin" exact />
        <PrivateRoute  component={User} path="/User" exact />
        <PrivateRoute  component={Insight} path="/insight" exact />
        <PublicRoute restricted component={Signup} path="/signup" exact />
        <PrivateRoute  component={AdminUser} path="/admin-user" exact />
        <PrivateRoute  component={BlockList} path="/blocklist" exact />

      </Switch>
    );
    return <>{route}</>;
  }
}

export default Main;
