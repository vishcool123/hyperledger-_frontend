/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const userData = JSON.parse(localStorage.getItem('key'));
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));

  let token;
  if (userData == null || userData == '' || userData == undefined) {
    token = null;
  } else {
    token = userData;
  }

  const isLogin = () => {
    if (token != null && isAdmin) {
      return true;
    }
    return false;
  };


  return (
    <Route
      {...rest}
      render={(props) => (
        isLogin() && restricted
          ? <Redirect to="/" />
          : <Component {...props} />
      )}
    />
  );
};

export default PublicRoute;
