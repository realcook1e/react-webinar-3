import React from "react";
import PropTypes from "prop-types";
import { plural } from "../../utils";
import "./style.css";

function Controls({ amountInCart, totalPriceInCart, onShowCart }) {
  return (
    <div className="Controls">
      <div className="Controls-title">
        В корзине:{" "}
        <b>
          {amountInCart
            ? `${amountInCart} ${plural(amountInCart, {
                one: "товар",
                few: "товара",
                many: "товаров",
              })} / ${totalPriceInCart} ₽`
            : "Пусто"}
        </b>
      </div>
      <div className="Controls-actions">
        <button onClick={onShowCart}>Перейти</button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  amountInCart: PropTypes.number,
  totalPriceInCart: PropTypes.number,
  onShowCart: PropTypes.func,
};

Controls.defaultProps = {
  onShowCart: () => {},
};

export default React.memo(Controls);
