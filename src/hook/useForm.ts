import React from 'react'

export interface IValues {
  email?: string
  name?: string
  password?: string | undefined
  token?: string
}

export function useForm(inputValues: IValues) {
  const [values, setValues] = React.useState<IValues>(inputValues)
  const [isChange, setChange] = React.useState<boolean>(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setValues({ ...values, [name]: value })
    setChange(true)
  }

  return { values, handleChange, setValues, isChange, setChange }
}
