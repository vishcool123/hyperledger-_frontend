/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-confusing-arrow */
/* eslint-disable quotes */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userData = JSON.parse(localStorage.getItem('key'));
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));

  let token;
  if (userData == null || userData == '' || userData == undefined) {
    token = null;
  } else {
    token = userData;
  }

  const isLogin = () => {
    if (token != null || isAdmin) {
      return true;
    }
    return false;
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
