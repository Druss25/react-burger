import React from 'react'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { authSelector } from '../../services/reducers/auth/selectors'
import { checkRefreshToken } from '../../utils/api'
import { forgotPassword } from '../../services/reducers/auth/actions'
import Spinner from '../../components/Spinner/Spinner'

import styles from '../form.module.css'

const ResetPasswordPage = () => {
  const { isAuth, isReset, isLoading } = useSelector(authSelector)
  const location = useLocation()
  const dispatch = useDispatch()

  const checkPath = location.state?.from?.pathname
  const [inputs, setInputs] = React.useState({
    password: '',
    token: '',
  })

  const handleChange = event => {
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = React.useCallback(
    e => {
      e.preventDefault()
      dispatch(forgotPassword(inputs))
    },
    [dispatch, inputs],
  )

  if (isLoading) return <Spinner />

  if (checkPath === undefined || !isReset) return <Redirect to="/" />
  if (isAuth || checkRefreshToken) return <Redirect to="/" />

  return (
    <section className={styles.section_form_container}>
      <form className={styles.form_wrapper} onSubmit={handleSubmit}>
        <h3 className="text text_type_main-medium">Восстановление пароля</h3>
        <PasswordInput
          placeholder={'Введите новый пароль'}
          onChange={handleChange}
          value={inputs.password}
          name={'password'}
          autoComplete="false"
          extraClass="mt-6 mb-6"
        />
        <Input
          type="text"
          placeholder={'Введите код из письма'}
          size={'default'}
          onChange={handleChange}
          value={inputs.token}
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
