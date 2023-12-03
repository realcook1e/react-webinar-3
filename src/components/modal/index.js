import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Modal({ children, modalActivity, setModalActivity, title }) {
  return (
    <div
      className={"Modal" + (modalActivity ? " active" : "")}
      onClick={() => setModalActivity(false)}
    >
      <div onClick={(e) => e.stopPropagation()} className="Modal-dialog">
        <div className="Modal-header">
          <h2 className="Modal-title">{title}</h2>
          <button className="btn" onClick={() => setModalActivity(false)}>
            Закрыть
          </button>
        </div>

        <div className="Modal-content">{children}</div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  modalActivity: PropTypes.bool,
  setModalActivity: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string,
};

Modal.defaultProps = {
  setModalActivity: () => {},
};

export default Modal;
