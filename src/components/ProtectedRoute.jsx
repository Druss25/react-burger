import { useCallback, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthSelector } from '../services/reducers/auth/selectors';
import { getUser } from '../services/reducers/auth/actions';

export function ProtectedRoute({ children, ...rest }) {
  const isAuth = useSelector(isAuthSelector)
  const dispatch = useDispatch()
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = useCallback(() => {
    dispatch(getUser());
    setUserLoaded(true);
  }, [dispatch])


  useEffect(() => {
    init();
  }, [init]);

  if (!isUserLoaded) {
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
