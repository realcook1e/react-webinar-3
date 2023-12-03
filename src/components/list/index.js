import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import CartItem from "../cart-item";
import "./style.css";

function List({ list, cart, onAddItem, onRemoveItem }) {
  const data = list ? list : cart;

  return (
    <div className="List">
      {data.map((item) => (
        <div key={item.code} className="List-item">
          {list ? (
            <Item item={item} onAdd={onAddItem} />
          ) : (
            <CartItem item={item} onRemove={onRemoveItem} />
          )}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ),
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ),
  onAddItem: PropTypes.func,
  onRemoveItem: PropTypes.func,
};

List.defaultProps = {
  onAddItem: () => {},
  onRemoveItem: () => {},
};

export default React.memo(List);
