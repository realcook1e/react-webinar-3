import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatNumber } from "../../utils";
import "./style.css";

function CartItem({ item, onRemove }) {
  return (
    <div className="Item">
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">{item.title}</div>
      <div className="Item-actions">
        <div className="Item-price">{formatNumber(item.price) + " ₽"}</div>
        <div className="Item-count">{item.amount} шт</div>
        <button className="btn" onClick={() => onRemove(item.code)}>
          Удалить
        </button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: PropTypes.func,
};

CartItem.defaultProps = {
  onRemove: () => {},
};

export default React.memo(CartItem);
