import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { isAuthSelector } from '../services/reducers/auth/selectors';
import { getUser } from '../services/reducers/auth/actions';

const ProtectedRoute = ({ children, ...rest }) => {
  const isAuth = useSelector(isAuthSelector)
  const dispatch = useDispatch()
  const [isUserReady, setIsUserReady] = React.useState(false)

  const refreshAuth = React.useCallback(
    () => {
      dispatch(getUser());
      setIsUserReady(true)
    },
    [dispatch]
  )

  React.useEffect(() => {
    refreshAuth()
    // eslint-disable-next-line
  }, []);

  if (!isUserReady) {
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
