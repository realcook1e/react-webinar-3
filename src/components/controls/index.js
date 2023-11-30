import React from "react";
import PropTypes from "prop-types";
import { plural } from "../../utils";
import "./style.css";

function Controls({ amountInCart, totalPriceInCart, setModalActivity }) {
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
        <button
          className="btn"
          onClick={() => {
            setModalActivity(true);
          }}
        >
          Перейти
        </button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  amountInCart: PropTypes.number,
  totalPriceInCart: PropTypes.number,
  setModalActivity: PropTypes.func,
};

Controls.defaultProps = {
  setModalActivity: () => {},
};

export default React.memo(Controls);
