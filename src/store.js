/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  // Добавление товара в корзину
  addItemToCart(item) {
    const findItem = this.state.cart.find(
      (cartItem) => cartItem.code === item.code
    );
    if (findItem) {
      this.setState({
        ...this.state,
        cart: this.state.cart.map((cartItem) => {
          if (cartItem.code === item.code) {
            return {
              ...cartItem,
              amount: cartItem.amount + 1,
            };
          }
          return cartItem;
        }),
      });
    } else {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...item, amount: 1 }],
      });
    }

    this.calcTotalPrice();
  }

  // Удаление товара из корзины
  removeItemFromCart(code) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter((item) => item.code !== code),
    });

    this.calcTotalPrice();
  }

  // Расчет общей стоимости
  calcTotalPrice() {
    this.setState({
      ...this.state,
      totalPrice: this.state.cart.reduce(
        (sum, item) => sum + item.price * item.amount,
        0
      ),
    });
  }
}

export default Store;
