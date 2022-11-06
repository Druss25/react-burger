import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from '../form.module.css'

const ForgotPasswordPage = () => {
  const [inputs, setInputs] = React.useState(
    {
      email: ''
    }
  )
  const history = useHistory()

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault()
      // ** При существуещем адресе email, выполняем следующее:
      history.replace({ pathname: '/reset-password' })
    }, [history])

  return (
    <section className={styles.section_form_container}>
      <form className={styles.form_wrapper} onSubmit={handleSubmit}>
        <h3 className='text text_type_main-medium'>Восстановление пароля</h3>
        <EmailInput
          placeholder={'Email'}
          isIcon={false}
          onChange={handleChange}
          value={inputs.email}
          name={'email'}
          autoComplete='false'
          extraClass='mt-6 mb-6'
        />
        <Button type="primary" size="large" htmlType='submit'>
          Восстановить
        </Button>
        <div className='mt-20'>
          <span className='text text_type_main-default'>Вспомнили пароль?&nbsp;</span>
          <Link to='/login' className='text text_type_main-default'>Войти</Link>
        </div>
      </form>
    </section>
  )
}

export default ForgotPasswordPage
