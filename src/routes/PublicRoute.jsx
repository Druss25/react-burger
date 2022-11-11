import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  // Redirect,
  Route,
} from 'react-router-dom'
import Spinner from '../components/Spinner/Spinner'
import { getUser } from '../services/reducers/auth/actions'
import { AuthSelector } from '../services/reducers/auth/selectors'

const PublicRoute = ({ children, location, ...rest }) => {
  const { isAuth, isLoading } = useSelector(AuthSelector)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  // <Redirect to={{ pathname: location.state?.from }} />

  return (
    <Route
      {...rest}
      render={({ location }) => (!isAuth ? children : console.log('Location: ', location))}
    />
  )
}

export default PublicRoute
