import React from "react";
import PropTypes from "prop-types";
import { plural, formatNumber } from "../../utils";
import "./style.css";

function Controls({ uniqueAmount, totalPriceInCart, setModalActivity }) {
  return (
    <div className="Controls">
      <div className="Controls-title">
        В корзине:{" "}
        <b>
          {uniqueAmount
            ? `${uniqueAmount} ${plural(uniqueAmount, {
                one: "товар",
                few: "товара",
                many: "товаров",
              })} / ${formatNumber(totalPriceInCart)} ₽`
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
  uniqueAmount: PropTypes.number,
  totalPriceInCart: PropTypes.number,
  setModalActivity: PropTypes.func,
};

Controls.defaultProps = {
  setModalActivity: () => {},
};

export default React.memo(Controls);
