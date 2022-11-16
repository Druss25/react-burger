import React from 'react'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { authSelector } from '../../services/reducers/auth/selectors'
import { useForm } from '../../hook/useForm'
import { checkRefreshToken } from '../../utils/api'
import { forgotPassword } from '../../services/reducers/auth/actions'
import Spinner from '../../components/Spinner/Spinner'

import styles from '../form.module.css'

interface ResetPassword {
  password: string
  token: string
}

type LocationState = {
  from: {
    pathname: string
  }
}

const ResetPasswordPage: React.FC = () => {
  const { isAuth, isReset, isLoading } = useSelector(authSelector)
  const location = useLocation<LocationState>()
  const dispatch = useDispatch()

  const checkPath = location.state?.from?.pathname
  const { values, handleChange } = useForm({
    password: '',
    token: '',
  })

  const onSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      dispatch<any>(forgotPassword(values as ResetPassword))
    },
    [dispatch, values],
  )

  if (isLoading) return <Spinner />

  if (checkPath === undefined || !isReset) return <Redirect to="/" />
  if (isAuth || checkRefreshToken) return <Redirect to="/" />

  return (
    <section className={styles.section_form_container}>
      <form className={styles.form_wrapper} onSubmit={onSubmit}>
        <h3 className="text text_type_main-medium">Восстановление пароля</h3>
        <PasswordInput
          placeholder={'Введите новый пароль'}
          onChange={handleChange}
          value={String(values.password)}
          name={'password'}
          autoComplete="false"
          extraClass="mt-6 mb-6"
        />
        <Input
          type="text"
          placeholder={'Введите код из письма'}
          size={'default'}
          onChange={handleChange}
          value={String(values.token)}
          name={'token'}
          error={false}
          extraClass="mb-6"
        />
        <Button type="primary" size="large" htmlType="submit">
          Сохранить
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

export default ResetPasswordPage
