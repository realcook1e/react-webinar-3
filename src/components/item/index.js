import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatNumber } from "../../utils";
import "./style.css";

function Item({ item, action, text, inCart }) {
  return (
    <div className="Item">
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">{item.title}</div>
      <div className="Item-actions">
        <div className="Item-price">{formatNumber(item.price) + " ₽"}</div>
        {inCart && item.amountInCart && (
          <div className="Item-count">{item.amountInCart} шт</div>
        )}
        <button className="btn" onClick={action}>
          {text}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    amountInCart: PropTypes.number,
  }).isRequired,
  action: PropTypes.func,
  text: PropTypes.string,
  inCart: PropTypes.bool,
};

Item.defaultProps = {
  action: () => {},
};

export default React.memo(Item);
