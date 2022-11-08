import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom';
import { getUser } from '../services/reducers/auth/actions';
import { AuthSelector } from '../services/reducers/auth/selectors'

const PublicRoute = ({ children, ...rest }) => {
  const { isAuth, isLoading } = useSelector(AuthSelector)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getUser())
  },[dispatch])

  if (isLoading) {
    return null
  }

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
