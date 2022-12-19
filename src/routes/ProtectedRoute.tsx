import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hook/redux-hook'
import { authSelector } from '../services/reducers/auth/selectors'
import { getUser } from '../services/reducers/auth/actions'
import Spinner from '../components/Spinner/Spinner'

type ProtectRouteTypes = RouteProps & { children?: React.ReactNode }

const ProtectedRoute: React.FC<ProtectRouteTypes> = ({ children, ...rest }) => {
  const dispatch = useAppDispatch()
  const { isAuth, isLoading } = useAppSelector(authSelector)

  const checkAuth = React.useCallback(() => {
    if (localStorage.getItem('refreshToken')) dispatch(getUser())
  }, [dispatch])

  React.useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isLoading) {
    return <Spinner />
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
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default ProtectedRoute
