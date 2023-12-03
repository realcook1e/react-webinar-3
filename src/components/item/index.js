import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatNumber } from "../../utils";
import "./style.css";

function Item({ item, onAdd }) {
  return (
    <div className="Item">
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">{item.title}</div>
      <div className="Item-actions">
        <div className="Item-price">{formatNumber(item.price) + " ₽"}</div>
        <button className="btn" onClick={() => onAdd(item)}>
          Добавить
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
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Item);
