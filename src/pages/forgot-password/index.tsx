import React from 'react'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../services/store'
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { authSelector } from '../../services/reducers/auth/selectors'
import { resetPassword } from '../../services/reducers/auth/actions'
import { checkRefreshToken } from '../../utils/api'
import Spinner from '../../components/Spinner/Spinner'

import styles from '../form.module.css'
import useForm from '../../hook/useForm'

type TForgotPassword = {
  email: string
}

const InitForm: TForgotPassword = {
  email: '',
}

const ForgotPasswordPage: React.FC = () => {
  const { isAuth, isReset, isLoading } = useAppSelector(authSelector)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const { values, handleChange } = useForm(InitForm)

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (values.email !== '') {
        dispatch(resetPassword(values as TForgotPassword))
      }
    },
    [values, dispatch],
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
          value={String(values.email)}
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
