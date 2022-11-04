import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from '../form.module.css'

const ForgotPasswordPage = () => {
  const [email, setEmail] = React.useState('')
  const history = useHistory()

  const onSubmitClick = React.useCallback(
    (e) => {
      e.preventDefault()
      // ** При существуещем адресе email выполняем следующее:
      history.replace({ pathname: '/reset-password' })
    }, [history])

  return (
    <section className={styles.section_form_container}>
      <form className={styles.form_wrapper}>
        <h3 className='text text_type_main-medium'>Восстановление пароля</h3>
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
        <Button type="primary" size="large" htmlType='button' onClick={onSubmitClick}>
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
