import React from 'react'
import { Link } from 'react-router-dom'
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from '../form.module.css'

const LoginPage = () => {
  const [inputs, setInputs] = React.useState({})

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault()
    }, [])

  return (
    <section className={styles.section_form_container}>
      <form className={styles.form_wrapper} onSubmit={handleSubmit}>
        <h3 className='text text_type_main-medium'>Вход</h3>
        <EmailInput
          placeholder={'Email'}
          isIcon={false}
          onChange={handleChange}
          value={inputs.email}
          name={'email'}
          extraClass='mt-6 mb-6'
        />
        <PasswordInput
          placeholder={'Пароль'}
          onChange={handleChange}
          value={inputs.password}
          name={'password'}
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
