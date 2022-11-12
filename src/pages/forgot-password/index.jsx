import React from 'react'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { AuthSelector } from '../../services/reducers/auth/selectors'
import { resetPassword } from '../../services/reducers/auth/actions'
import { checkRefreshToken } from '../../utils/api'

import styles from '../form.module.css'
import Spinner from '../../components/Spinner/Spinner'

const ForgotPasswordPage = () => {
  const { isAuth, isReset, isLoading } = useSelector(AuthSelector)
  const dispatch = useDispatch()
  const location = useLocation()
  const [inputs, setInputs] = React.useState({
    email: '',
  })

  const handleChange = event => {
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = React.useCallback(
    e => {
      e.preventDefault()
      if (inputs.email !== '') {
        dispatch(resetPassword(inputs.email))
      }
    },
    [inputs.email, dispatch],
  )

  if (isLoading) return <Spinner />
  if (isAuth || checkRefreshToken) return <Redirect to="/" />

  if (isReset)
    return (
      <Redirect
        to={{
          pathname: '/reset-password',
          state: { from: location },
        }}
      />
    )

  return (
    <section className={styles.section_form_container}>
      <form className={styles.form_wrapper} onSubmit={handleSubmit}>
        <h3 className="text text_type_main-medium">Восстановление пароля</h3>
        <EmailInput
          placeholder={'Email'}
          isIcon={false}
          onChange={handleChange}
          value={inputs.email}
          name={'email'}
          autoComplete="false"
          extraClass="mt-6 mb-6"
        />
        <Button type="primary" size="large" htmlType="submit">
          Восстановить
        </Button>
        <div className="mt-20">
          <span className="text text_type_main-default">Вспомнили пароль?&nbsp;</span>
          <Link to="/login" className="text text_type_main-default">
            Войти
          </Link>
        </div>
      </form>
    </section>
  )
}

export default ForgotPasswordPage
