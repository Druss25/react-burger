import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { AuthSelector } from '../services/reducers/auth/selectors';
import { getUser } from '../services/reducers/auth/actions';
import { checkAccessToken } from '../utils/api';

const ProtectedRoute = ({ children, ...rest }) => {
  const {isAuth, isLoading} = useSelector(AuthSelector)
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (checkAccessToken()) dispatch(getUser());
  }, [dispatch]);

  if (isLoading) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute
