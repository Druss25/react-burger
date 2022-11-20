import React from 'react'
import ReactDOM from 'react-dom'

type TReactPortal = {
  children?: React.ReactNode
  wrapperId: string
}

const ReactPortal: React.FC<TReactPortal> = ({ children, wrapperId }) => {
  const container = document.getElementById(wrapperId) as DocumentFragment | Element
  return ReactDOM.createPortal(children, container)
}

export default ReactPortal
