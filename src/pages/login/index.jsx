import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from '../form.module.css'

const LoginPage = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

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
        <h3 className='text text_type_main-medium'>Вход</h3>
        <Input
          type="email"
          placeholder={'Email'}
          size={'default'}
          onChange={e => setEmail(e.target.value)}
          value={email}
          name={'email'}
          error={false}
          extraClass='mt-6 mb-6'
        />
        <Input
          type={isVisible ? 'text' : 'password'}
          placeholder={'Пароль'}
          icon={isVisible ? 'ShowIcon' : 'HideIcon'}
          size={'default'}
          onChange={e => setPassword(e.target.value)}
          value={password}
          name={'password'}
          onIconClick={onIconPasswordClick}
          error={false}
          extraClass='mb-6'
        />
        <Button type="primary" size="large" htmlType='submit'>
          Войти
        </Button>
        <div className='mt-20'>
          <span className='text text_type_main-default'>Вы - новый пользователь?&nbsp;</span>
          <Link to='/register' className='text text_type_main-default'>Зарегистрироваться</Link>
        </div>
        <div className='mt-4'>
          <span className='text text_type_main-default'>Забыли пароль?&nbsp;</span>
          <Link to='/forgot-password' className='text text_type_main-default'>Восстановить пароль</Link>
        </div>
      </form>
    </section>
  )
}

export default LoginPage
