import React from 'react'
import ReactDOM from 'react-dom'

type ReactPortalTypes = {
  children?: React.ReactNode
  wrapperId: string
}

const ReactPortal: React.FC<ReactPortalTypes> = ({ children, wrapperId }) => {
  const conteiner = document.getElementById(wrapperId) as DocumentFragment | Element
  return ReactDOM.createPortal(children, conteiner)
}

export default ReactPortal
