import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [modalActivity, setModalActivity] = useState(false);

  const list = store.getState().list;
  const totalPrice = list.reduce(
    (sum, item) =>
      item.amountInCart ? sum + item.price * item.amountInCart : sum,
    0
  );
  const totalAmount = list.reduce(
    (sum, item) => (item.amountInCart ? sum + 1 : sum),
    0
  );

  const callbacks = {
    onAddItem: useCallback(
      (code) => {
        store.addItemToCart(code);
      },
      [store]
    ),

    onRemoveItem: useCallback(
      (code) => {
        store.removeItemFromCart(code);
      },
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        setModalActivity={setModalActivity}
        amountInCart={totalAmount}
        totalPriceInCart={totalPrice}
      />
      <List list={list} onAddItem={callbacks.onAddItem} />
      <Modal
        list={list}
        modalActivity={modalActivity}
        setModalActivity={setModalActivity}
        onRemoveItem={callbacks.onRemoveItem}
        totalPrice={totalPrice}
      />
    </PageLayout>
  );
}

export default App;
