const initialData = {
  count: 0,
  items: [],
};

// Начальное состояние
export const initialState = {
  data: initialData,
  waiting: false,
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "comments/load-start":
      return { ...state, data: initialData, waiting: true };

    case "comments/load-success":
      return { ...state, data: action.payload.data, waiting: false };

    case "comments/load-error":
      return {
        ...state,
        data: initialData,
        waiting: false,
      };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
