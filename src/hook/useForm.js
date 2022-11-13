import React from 'react'

export function useForm(inputValues) {
  const [values, setValues] = React.useState(inputValues);
  const [isChange, setChange] = React.useState(false)

  const handleChange = (event) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
    setChange(true)
  };

  return {values, handleChange, setValues, isChange, setChange};
}
