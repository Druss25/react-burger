import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hook/redux-hook'
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'
import useForm from '../../hook/useForm'
import { register } from '../../services/reducers/auth/actions'
import { authSelector } from '../../services/reducers/auth/selectors'

import styles from '../form.module.css'

type Register = {
  email: string
  password: string
  name: string
}
const InitForm: Register = {
  email: '',
  password: '',
  name: '',
}

const RegisterPage = () => {
  const dispatch = useAppDispatch()
  const { isAuth, isLoading } = useAppSelector(authSelector)
  const { values, handleChange } = useForm(InitForm)

  const onSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      dispatch(register(values as Register))
    },
    [dispatch, values],
  )

  if (isLoading) {
    return null
  }

  if (isAuth || localStorage.getItem('refreshToken')) {
    return <Redirect to={'/'} />
  }

  return (
    <section className={styles.section_form_container}>
      <form className={styles.form_wrapper} onSubmit={onSubmit}>
        <h3 className="text text_type_main-medium">Регистрация</h3>
        <Input
          type="text"
          placeholder={'Имя'}
          size={'default'}
          onChange={handleChange}
          value={String(values.name)}
          name={'name'}
          error={false}
          extraClass="mt-6 mb-6"
        />
        <EmailInput
          name={'email'}
          value={String(values.email)}
          isIcon={false}
          onChange={handleChange}
          extraClass="mb-6"
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
          Зарегистрироваться
        </Button>
        <div className="mt-20">
          <span className="text text_type_main-default">Уже зарегистрированы?&nbsp;</span>
          <Link to="/login" className="text text_type_main-default">
            Войти
          </Link>
        </div>
      </form>
    </section>
  )
}

export default RegisterPage
