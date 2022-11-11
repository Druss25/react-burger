import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { AuthSelector } from '../services/reducers/auth/selectors'
import { getUser } from '../services/reducers/auth/actions'
import { checkAccessToken } from '../utils/api'
import Spinner from '../components/Spinner/Spinner'

const ProtectedRoute = ({ children, ...rest }) => {
  const { isAuth, isLoading } = useSelector(AuthSelector)
  const dispatch = useDispatch()

  const checkAuth = React.useCallback(() => {
    if (checkAccessToken) dispatch(getUser())
  }, [dispatch])

  React.useEffect(() => {
    checkAuth()
    // eslint-disable-next-line
  }, [])

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
