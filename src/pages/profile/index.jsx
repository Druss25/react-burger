import React from 'react'
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux'
import { UserSelector } from '../../services/reducers/auth/selectors'
import styles from './profile.module.css'
import { updateUser } from '../../services/reducers/auth/actions'

const ProfilePage = () => {
  const nameRef = React.useRef(null)
  const { email, name } = useSelector(UserSelector)
  const [inputs, setInputs] = React.useState({
    name,
    email,
    password: '',
  })
  const [editInputs, setEditInputs] = React.useState(false)
  const dispatch = useDispatch()

  const onIconClick = e => {
    e.preventDefault()
    nameRef.current.focus()
  }

  const onChange = event => {
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({ ...values, [name]: value }))
    setEditInputs(true)
  }

  const resetForm = e => {
    e.preventDefault()
    setEditInputs(false)
    inputs.name = name
    inputs.email = email
    inputs.password = ''
  }

  const onSubmit = React.useCallback(
    e => {
      e.preventDefault()
      dispatch(updateUser(inputs))
      setEditInputs(false)
    },
    [dispatch, inputs],
  )

  return (
    <>
      <div className={styles.subtitle}>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={onSubmit}>
          <Input
            icon="EditIcon"
            placeholder="Имя"
            value={inputs.name}
            name={'name'}
            ref={nameRef}
            onIconClick={onIconClick}
            onChange={onChange}
            extraClass="mb-6"
          />
          <EmailInput
            type="email"
            onChange={onChange}
            value={inputs.email}
            name={'email'}
            placeholder="Email"
            isIcon={true}
            extraClass="mb-6"
          />
          <PasswordInput
            placeholder={'Пароль'}
            icon="EditIcon"
            size={'default'}
            onChange={onChange}
            value={inputs.password}
            name={'password'}
            extraClass="mb-6"
            autoComplete="false"
          />
          {editInputs && (
            <div className={styles.group_button}>
              <Button type="secondary" size="medium" htmlType="reset" onClick={resetForm}>
                Отмена
              </Button>
              <Button type="primary" size="medium" htmlType="submit">
                Сохранить
              </Button>
            </div>
          )}
        </form>
      </div>
    </>
  )
}

export default ProfilePage
