import React from "react";
import PropTypes from "prop-types";
import List from "../list";
import { formatNumber } from "../../utils";
import "./style.css";

function Cart({ cart, onRemoveItem, totalPrice }) {
  return (
    <div className="Cart">
      <List cart={cart} onRemoveItem={onRemoveItem} />
      {cart.length ? (
        <p className="Cart-total">
          Итого <span>{formatNumber(totalPrice)} ₽</span>
        </p>
      ) : (
        <p className="Cart-empty">В корзине нет товаров</p>
      )}
    </div>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onRemoveItem: PropTypes.func,
  totalPrice: PropTypes.number,
};

Cart.defaultProps = {
  onRemoveItem: () => {},
};

export default Cart;
