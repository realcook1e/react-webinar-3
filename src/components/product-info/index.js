import { cn as bem, cn } from "@bem-react/classname";
import PropTypes from "prop-types";
import { numberFormat } from "../../utils";
import "./style.css";

function ProductInfo(props) {
  const cn = bem("ProductInfo");
  const { item, onAddItem } = props;

  const callbacks = {
    onAdd: (e) => onAddItem(item._id),
  };

  return (
    <div className={cn()}>
      <p className={cn("description")}>{item.description}</p>
      <p className={cn("country")}>
        Страна производитель:{" "}
        <span className={cn("country-value")}>
          {item.madeIn.title} ({item.madeIn.code})
        </span>
      </p>
      <p className={cn("category")}>
        Категория: <span className={cn("category-value")}>{item.category}</span>
      </p>
      <p className={cn("year")}>
        Год выпуска: <span className={cn("year-value")}>{item.year}</span>
      </p>
      <p className={cn("price")}>
        Цена:{" "}
        <span className={cn("price-value")}>{numberFormat(item.price)}</span>
      </p>
      <button className={cn("button")} onClick={callbacks.onAdd}>
        Добавить
      </button>
    </div>
  );
}

ProductInfo.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    }),
    year: PropTypes.number,
    category: PropTypes.string,
  }),
  onAddItem: PropTypes.func,
};

ProductInfo.defaultProps = {
  onAddItem: () => {},
};

export default ProductInfo;
