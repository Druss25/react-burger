import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { register } from '../../services/reducers/auth/actions'
import styles from '../form.module.css'

const RegisterPage = () => {
  const [inputs, setInputs] = React.useState(
    {
      email: '',
      password: '',
      name: ''
    }
  )

  const dispatch = useDispatch()

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault()
      dispatch(register(inputs))
    }, [dispatch, inputs]
  )

  return (
    <section className={styles.section_form_container}>
      <form className={styles.form_wrapper} onSubmit={handleSubmit}>
        <h3 className='text text_type_main-medium'>Регистрация</h3>
        <Input
          type="text"
          placeholder={'Имя'}
          size={'default'}
          onChange={handleChange}
          value={inputs.name}
          name={'name'}
          error={false}
          extraClass='mt-6 mb-6'
        />
        <EmailInput
          name={'email'}
          value={inputs.email}
          isIcon={false}
          onChange={handleChange}
          extraClass='mb-6'
        />
        <PasswordInput
          placeholder={'Пароль'}
          onChange={handleChange}
          value={inputs.password}
          name={'password'}
          autoComplete='false'
          extraClass='mb-6'
        />
        <Button type="primary" size="large" htmlType='submit'>
          Зарегистрироваться
        </Button>
        <div className='mt-20'>
          <span className='text text_type_main-default'>Уже зарегистрированы?&nbsp;</span>
          <Link to='/login' className='text text_type_main-default'>Войти</Link>
        </div>
      </form>
    </section>
  )
}

export default RegisterPage
