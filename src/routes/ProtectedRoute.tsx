import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { authSelector } from '../services/reducers/auth/selectors'
import { getUser } from '../services/reducers/auth/actions'
import Spinner from '../components/Spinner/Spinner'

interface Props {
  children: JSX.Element
  [x: string]: any
}

const ProtectedRoute: React.FC<Props> = ({ children, ...rest }) => {
  const { isAuth, isLoading } = useSelector(authSelector)
  const dispatch = useDispatch()

  const checkAuth = React.useCallback(() => {
    if (localStorage.getItem('refreshToken')) dispatch<any>(getUser())
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
