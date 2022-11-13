import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

function ReactPortal({ children, wrapperId }) {
  return ReactDOM.createPortal(children, document.getElementById(wrapperId))
}

ReactPortal.propTypes = {
  children: PropTypes.element.isRequired,
  wrapperId: PropTypes.string.isRequired,
}
export default ReactPortal
