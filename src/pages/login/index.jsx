import React from 'react'
import { Link, useLocation, Redirect } from 'react-router-dom'
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { login } from '../../services/reducers/auth/actions'
import { useDispatch, useSelector } from 'react-redux'
import { authSelector } from '../../services/reducers/auth/selectors'
import Spinner from '../../components/Spinner/Spinner'
import { checkRefreshToken } from '../../utils/api'
import { useForm } from '../../hook/useForm'

import styles from '../form.module.css'

const LoginPage = () => {
  const { isAuth, isLoading, hasError } = useSelector(authSelector)
  const dispatch = useDispatch()
  const location = useLocation()
  const { state } = location

  const { values, handleChange } = useForm({ email: '', password: '' })

  const onSubmit = React.useCallback(
    e => {
      e.preventDefault()
      dispatch(login(values))
    },
    [dispatch, values],
  )

  if (isLoading) return <Spinner />

  if (isAuth || (checkRefreshToken && !hasError)) {
    return <Redirect exact to={state?.from || { from: { pathname: '/' } }} />
  }

  return (
    <section className={styles.section_form_container}>
      <form className={styles.form_wrapper} onSubmit={onSubmit}>
        <h3 className="text text_type_main-medium">Вход</h3>
        <EmailInput
          placeholder={'Email'}
          isIcon={false}
          onChange={handleChange}
          value={values.email}
          name={'email'}
          extraClass="mt-6 mb-6"
        />
        <PasswordInput
          placeholder={'Пароль'}
          onChange={handleChange}
          value={values.password}
          name={'password'}
          autoComplete="false"
          extraClass="mb-6"
        />
        <Button type="primary" size="large" htmlType="submit">
          Войти
        </Button>
        <div className="mt-20">
          <span className="text text_type_main-default">Вы - новый пользователь?&nbsp;</span>
          <Link to="/register" className="text text_type_main-default">
            Зарегистрироваться
          </Link>
        </div>
        <div className="mt-4">
          <span className="text text_type_main-default">Забыли пароль?&nbsp;</span>
          <Link to="/forgot-password" className="text text_type_main-default">
            Восстановить пароль
          </Link>
        </div>
      </form>
    </section>
  )
}

export default LoginPage
