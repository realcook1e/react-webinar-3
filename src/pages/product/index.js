import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { useCallback, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import ProductInfo from "../../components/product-info";
import { useParams } from "react-router-dom";

function Product() {
  const { id } = useParams();
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.product,
  }));

  useEffect(() => {
    store.actions.product.getProductInfo(id);
  }, [id]);

  const callbacks = {
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title={select.product.title} />
      <BasketTool
        sum={select.sum}
        amount={select.amount}
        onOpen={callbacks.openModalBasket}
      />
      <ProductInfo item={select.product} onAddItem={callbacks.addToBasket} />
    </PageLayout>
  );
}

export default Product;
