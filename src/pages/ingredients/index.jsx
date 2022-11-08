import React from 'react'
import {useParams} from 'react-router-dom'

const IngredientsPage = () => {
  const params = useParams()
  console.log(params)

  return (
    <div>IngredientsPage ID: {params.id}</div>
  )
}

export default IngredientsPage
