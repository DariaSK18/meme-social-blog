import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/alert.css";

export default function Alert({ type = "error", message, onClose, fixed = false }) {
  const alertClasses = `alert alert-${type}${fixed ? " alert-fixed" : ""}`;

  const icons = {
    success: faCheckCircle,
    error: faExclamationCircle,
  };

  return (
    <div className={alertClasses}>
      <FontAwesomeIcon icon={icons[type]} className="alert-icon" />
      <span className="alert-message">{message}</span>
      {onClose && (
        <button className="alert-close" onClick={onClose} aria-label="Close">
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
    </div>
  );
}

