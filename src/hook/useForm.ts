import React from 'react'
import { IRequestLogin, IRequestRegister } from '../models/auth'

export interface IValues {
  email: string
  name?: string
  password?: string
}

export function useForm(inputValues: IValues) {
  const [values, setValues] = React.useState(inputValues)
  const [isChange, setChange] = React.useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setValues({ ...values, [name]: value })
    setChange(true)
  }

  return { values, handleChange, setValues, isChange, setChange }
}
