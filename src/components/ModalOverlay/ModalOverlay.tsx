import ModalOverlayStyles from './ModalOverlay.module.css'

interface IProps {
  onClick: () => void
}

const ModalOverlay = ({ onClick }: IProps) => {
  return <div className={ModalOverlayStyles.overlay} onClick={onClick}></div>
}

export default ModalOverlay
