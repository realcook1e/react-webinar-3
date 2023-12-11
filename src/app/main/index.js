import { memo, useCallback, useEffect } from "react";
import Item from "../../components/item";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import BasketTool from "../../components/basket-tool";
import List from "../../components/list";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import Pagination from "../../components/pagination";
import Menu from "../../components/menu";
import Positioner from "../../components/positioner";

function Main() {
  const store = useStore();

  const select = useSelector((state) => ({
    list: state.catalog.list,
    count: state.catalog.count,
    limit: state.catalog.limit,
    skip: state.catalog.skip,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    store.actions.catalog.load();
  }, [select.skip]);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    // Открытие модалки корзины
    openModalBasket: useCallback(
      () => store.actions.modals.open("basket"),
      [store]
    ),
    // Pagination
    setPage: useCallback(
      (page) => {
        store.actions.catalog.setSkip((page - 1) * select.limit);
      },
      [store]
    ),
  };

  const renders = {
    item: useCallback(
      (item) => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Positioner>
        <Menu />
        <BasketTool
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
      </Positioner>
      <List list={select.list} renderItem={renders.item} />
      <Pagination
        currPage={select.skip / select.limit + 1}
        totalPages={Math.ceil(+select.count / select.limit)}
        changePage={callbacks.setPage}
      />
    </PageLayout>
  );
}

export default memo(Main);
