import React from 'react'
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector } from '../../services/reducers/auth/selectors'
import { updateUser } from '../../services/reducers/auth/actions'
import { useForm } from '../../hook/useForm'

import styles from './profile.module.css'

const ProfilePage = () => {
  const nameRef = React.useRef(null)
  const { email, name } = useSelector(userSelector)
  const { values, handleChange, isChange, setChange } = useForm({
    name,
    email,
    password: '',
  })
  const [disabled, setDisabled] = React.useState(true)
  const dispatch = useDispatch()

  const onIconClick = React.useCallback(
    e => {
      e.preventDefault()
      setDisabled(!disabled)
    },
    [disabled],
  )

  const onBlurName = () => {
    setDisabled(true)
  }

  const resetForm = e => {
    e.preventDefault()
    setChange(false)
    values.name = name
    values.email = email
    values.password = ''
  }

  const onSubmit = React.useCallback(
    e => {
      e.preventDefault()
      dispatch(updateUser(values))
      setChange(false)
    },
    [dispatch, values, setChange],
  )

  React.useEffect(() => {
    if (!disabled) {
      nameRef.current.focus()
    }
  }, [disabled])

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
            value={values.name}
            name={'name'}
            ref={nameRef}
            onIconClick={onIconClick}
            onChange={handleChange}
            onBlur={onBlurName}
            disabled={disabled}
            extraClass="mb-6"
          />
          <EmailInput
            type="email"
            onChange={handleChange}
            value={values.email}
            name={'email'}
            placeholder="Email"
            isIcon={true}
            extraClass="mb-6"
          />
          <PasswordInput
            placeholder={'Пароль'}
            icon="EditIcon"
            size={'default'}
            onChange={handleChange}
            value={values.password}
            name={'password'}
            extraClass="mb-6"
            autoComplete="false"
          />
          {isChange && (
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
