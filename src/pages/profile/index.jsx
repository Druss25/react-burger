import React from 'react'
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './profile.module.css'

const ProfilePage = () => {
  const [inputs, setInputs] = React.useState(
    {
      name: 'Марк',
      email: 'mail@stellar.burgers',
      password: '123456'
    })

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }
  return (
    <>
      <div className={styles.subtitle}>
        <p className='text text_type_main-default text_color_inactive'>В этом разделе вы можете изменить свои персональные данные</p>
      </div>
      <div className={styles.wrapper}>
        <Input
          readOnly
          icon='EditIcon'
          placeholder="Имя"
          value={inputs.name}
          name={'name'}
          onChange={handleChange}

          extraClass="mb-6"
        />
        <EmailInput
          type='email'
          onChange={handleChange}
          value={inputs.email}
          name={'email'}
          placeholder="Email"
          isIcon={true}
          extraClass="mb-6"
        />
        <PasswordInput
          placeholder={'Пароль'}
          icon='EditIcon'
          size={'default'}
          onChange={handleChange}
          value={inputs.password}
          name={'password'}
          extraClass='mb-6'
        />
      </div>
    </>
  )
}

export default ProfilePage
