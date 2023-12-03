import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Modal from "./components/modal";
import Cart from "./components/cart";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const [modalActivity, setModalActivity] = useState(false);

  const list = store.getState().list;
  const cart = store
    .getState()
    .cart.sort((itemOne, itemTwo) => itemOne.code - itemTwo.code);

  const totalPrice = store.getState().totalPrice;
  const totalUniqueAmount = cart.length;

  const callbacks = {
    onAddItem: useCallback(
      (item) => {
        store.addItemToCart(item);
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
        uniqueAmount={totalUniqueAmount}
        totalPriceInCart={totalPrice}
      />
      <List list={list} onAddItem={callbacks.onAddItem} />
      <Modal
        title="Корзина"
        modalActivity={modalActivity}
        setModalActivity={setModalActivity}
      >
        <Cart
          cart={cart}
          onRemoveItem={callbacks.onRemoveItem}
          totalPrice={totalPrice}
        />
      </Modal>
    </PageLayout>
  );
}

export default App;
