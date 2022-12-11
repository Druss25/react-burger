import ModalOverlayStyles from './ModalOverlay.module.css'

type TProps = {
  onClick: () => void
}

const ModalOverlay: React.FC<TProps> = ({ onClick }) => {
  return <div className={ModalOverlayStyles.overlay} onClick={onClick}></div>
}

export default ModalOverlay
