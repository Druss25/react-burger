import React from 'react'
import ReactDOM from 'react-dom'

type TProps = {
  children?: React.ReactNode
  wrapperId: string
}

const ReactPortal: React.FC<TProps> = ({ children, wrapperId }) => {
  const container = document.getElementById(wrapperId) as DocumentFragment | Element
  return ReactDOM.createPortal(children, container)
}

export default ReactPortal
