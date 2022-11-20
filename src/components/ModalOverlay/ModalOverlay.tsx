import ModalOverlayStyles from './ModalOverlay.module.css'

type TModalOverlay = {
  onClick: () => void
}

const ModalOverlay = ({ onClick }: TModalOverlay) => {
  return <div className={ModalOverlayStyles.overlay} onClick={onClick}></div>
}

export default ModalOverlay
