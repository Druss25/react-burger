import React from 'react'
import { Link, useLocation, Redirect } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hook/redux-hook'
import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { login } from '../../services/reducers/auth/actions'
import { authSelector } from '../../services/reducers/auth/selectors'
import Spinner from '../../components/Spinner/Spinner'
import useForm from '../../hook/useForm'

import styles from '../form.module.css'

export interface LoginForm {
  email: string
  password: string
}

type LocationState = {
  from: {
    pathname: string
  }
}

const InitForm: LoginForm = {
  email: '',
  password: '',
}

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isAuth, isLoading, hasError } = useAppSelector(authSelector)
  const location = useLocation<LocationState>()
  const { state } = location
  const { values, handleChange } = useForm(InitForm)

  const onSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      dispatch(login(values as LoginForm))
    },
    [dispatch, values],
  )

  if (isAuth || (localStorage.getItem('refreshToken') && !hasError)) {
    return <Redirect exact to={state?.from || { from: { pathname: '/' } }} />
  }

  if (isLoading) return <Spinner />

  return (
    <section className={styles.section_form_container}>
      <form className={styles.form_wrapper} onSubmit={onSubmit}>
        <h3 className="text text_type_main-medium">Вход</h3>
        <EmailInput
          placeholder={'Email'}
          isIcon={false}
          onChange={handleChange}
          value={String(values.email)}
          name={'email'}
          extraClass="mt-6 mb-6"
        />
        <PasswordInput
          placeholder={'Пароль'}
          onChange={handleChange}
          value={String(values.password)}
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
