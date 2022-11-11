import React from 'react'
import { BarLoader } from 'react-spinners'

const override: React.CSSProperties = {
  display: 'block',
  margin: '0 auto',
}

const Spinner = () => {
  return <BarLoader color="#ffffff" cssOverride={override} width={1100} />
}

export default Spinner
