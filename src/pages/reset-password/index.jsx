import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from '../form.module.css'

const ResetPasswordPage = () => {
  const [password, setPassword] = React.useState('')
  const [token, setToken] = React.useState('')
  const [isVisible, setIsVisible] = React.useState(false)

  const onIconPasswordClick = () => {
    setIsVisible(isVisible => !isVisible)
  }

  const onSubmitClick = React.useCallback(
    (e) => {
      e.preventDefault()
    }, [])

  return (
    <section className={styles.section_form_container}>
      <form className={styles.form_wrapper} onSubmit={onSubmitClick}>
        <h3 className='text text_type_main-medium'>Восстановление пароля</h3>
        <Input
          type={isVisible ? 'text' : 'password'}
          placeholder={'Введите новый пароль'}
          icon={isVisible ? 'ShowIcon' : 'HideIcon'}
          size={'default'}
          onChange={e => setPassword(e.target.value)}
          value={password}
          name={'password'}
          onIconClick={onIconPasswordClick}
          error={false}
          extraClass='mt-6 mb-6'
        />
        <Input
          type="text"
          placeholder={'Введите код из письма'}
          size={'default'}
          onChange={e => setToken(e.target.value)}
          value={token}
          name={'token'}
          error={false}
          extraClass='mb-6'
        />
        <Button type="primary" size="large" htmlType='submit'>
          Сохранить
        </Button>
        <div className='mt-20'>
          <span className='text text_type_main-default'>Вспомнили пароль?&nbsp;</span>
          <Link to='/login' className='text text_type_main-default'>Войти</Link>
        </div>
      </form>
    </section>
  )
}

export default ResetPasswordPage
