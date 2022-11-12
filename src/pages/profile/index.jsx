import React from 'react'
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux'
import { UserSelector } from '../../services/reducers/auth/selectors'
import { updateUser } from '../../services/reducers/auth/actions'

import styles from './profile.module.css'

const ProfilePage = () => {
  const nameRef = React.useRef(null)
  const { email, name } = useSelector(UserSelector)
  const [inputs, setInputs] = React.useState({
    name,
    email,
    password: '',
  })
  const [disabled, setDisabled] = React.useState(true)
  const [isEditInputs, setIsEditInputs] = React.useState(false)
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

  const onChange = event => {
    const name = event.target.name
    const value = event.target.value
    setInputs(values => ({ ...values, [name]: value }))
    setIsEditInputs(true)
  }

  const resetForm = e => {
    e.preventDefault()
    setIsEditInputs(false)
    inputs.name = name
    inputs.email = email
    inputs.password = ''
  }

  const onSubmit = React.useCallback(
    e => {
      e.preventDefault()
      dispatch(updateUser(inputs))
      setIsEditInputs(false)
    },
    [dispatch, inputs],
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
            value={inputs.name}
            name={'name'}
            ref={nameRef}
            onIconClick={onIconClick}
            onChange={onChange}
            onBlur={onBlurName}
            disabled={disabled}
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
          {isEditInputs && (
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
