import ReactDOM from 'react-dom'

interface IProps {
  children: React.ReactNode
  wrapperId: string
}

function ReactPortal({ children, wrapperId }: IProps) {
  const conteiner = document.getElementById(wrapperId) as DocumentFragment | Element
  return ReactDOM.createPortal(children, conteiner)
}

export default ReactPortal
