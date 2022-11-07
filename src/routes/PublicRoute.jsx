import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom';
import { isAuthSelector } from '../services/reducers/auth/selectors'

const PublicRoute = ({ children, ...rest }) => {
  const isAuth = useSelector(isAuthSelector)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: location.state?.from
            }}
          />
        )
      }
    />
  );
}

export default PublicRoute
