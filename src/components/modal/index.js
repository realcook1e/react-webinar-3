import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function Modal({
  modalActivity,
  setModalActivity,
  onRemoveItem,
  totalPrice,
  list,
}) {
  const cartItems = list.filter((item) => item.amountInCart > 0);

  return (
    <div
      className={"Modal" + (modalActivity ? " active" : "")}
      onClick={() => setModalActivity(false)}
    >
      <div onClick={(e) => e.stopPropagation()} className="Modal-dialog">
        <div className="Modal-header">
          <h2 className="Modal-title">Корзина</h2>
          <button className="btn" onClick={() => setModalActivity(false)}>
            Закрыть
          </button>
        </div>

        <div className="Modal-content">
          {cartItems.length ? (
            <div className="Modal-list">
              {cartItems.map((item) => (
                <div key={item.code} className="List-item">
                  <Item
                    inCart={true}
                    item={item}
                    text="Удалить"
                    action={() => onRemoveItem(item.code)}
                  />
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
          {cartItems.length ? (
            <p className="Modal-total">
              Итого <span>{totalPrice} ₽</span>
            </p>
          ) : (
            <p className="Modal-empty">В корзине нет товаров</p>
          )}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  modalActivity: PropTypes.bool,
  setModalActivity: PropTypes.func,
  onRemoveItem: PropTypes.func,
  totalPrice: PropTypes.number,
};

Modal.defaultProps = {
  setModalActivity: () => {},
  onRemoveItem: () => {},
};

export default Modal;
