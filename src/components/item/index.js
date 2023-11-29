import React, { useState } from "react";
import PropTypes from "prop-types";
import { formatNumber } from "../../utils";
import "./style.css";

function Item(props) {
  const callbacks = {
    onAddItemToCart: () => {
      props.onAdd(props.item.code);
    },
  };

  return (
    <div className="Item">
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-actions">
        <div className="Item-price">
          {formatNumber(props.item.price) + " ₽"}
        </div>
        <button onClick={callbacks.onAddItemToCart}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
  onAdd: PropTypes.func,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Item);
