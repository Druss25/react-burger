import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { isAuthSelector } from '../services/reducers/auth/selectors';
import { getUser } from '../services/reducers/auth/actions';

export function ProtectedRoute({ children, ...rest }) {
  const isAuth = useSelector(isAuthSelector)
  const [isUserReady, setIsUserReady] = React.useState(false)
  const dispatch = useDispatch()

  const refreshAuth = async () => {
    dispatch(getUser());
    setIsUserReady(true)
  }

  React.useEffect(() => {
    refreshAuth()
    // eslint-disable-next-line
  }, []);

  console.info('Testing...')

  if (!isUserReady) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth
          ? (
            children
          )
          : (
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
