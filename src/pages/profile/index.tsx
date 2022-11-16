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
import { IRequestRegister, IUser } from '../../models/auth'
import { useForm } from '../../hook/useForm'

import styles from './profile.module.css'

export interface IProfileForm {
  email: string
  name: string
  password: string
}

const ProfilePage = () => {
  const nameRef = React.useRef<HTMLInputElement>(null)
  const { email, name } = useSelector(userSelector) as IUser
  const { values, handleChange, setValues, isChange, setChange } = useForm({
    name,
    email,
    password: '',
  } as IProfileForm)
  const [disabled, setDisabled] = React.useState(true)
  const dispatch = useDispatch()

  const onIconClick = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setDisabled(!disabled)
    },
    [disabled],
  )

  const onBlurName = () => {
    setDisabled(true)
  }

  const resetForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setChange(false)
    setValues(username => username)
    setValues(email => email)
    setValues(password => password)
  }

  const onSubmit = React.useCallback(
    (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault()
      dispatch<any>(updateUser(values as IRequestRegister))
      setChange(false)
    },
    [dispatch, values, setChange],
  )

  React.useEffect(() => {
    if (!disabled) {
      nameRef.current?.focus()
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
            value={String(values.name)}
            name={'name'}
            ref={nameRef}
            onIconClick={onIconClick}
            onChange={handleChange}
            onBlur={onBlurName}
            disabled={disabled}
            extraClass="mb-6"
          />
          <EmailInput
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
            value={String(values.password)}
            name={'password'}
            extraClass="mb-6"
            autoComplete="false"
          />
          {isChange && (
            <div className={styles.group_button}>
              <Button type="secondary" size="medium" htmlType="reset" onClick={e => resetForm}>
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
