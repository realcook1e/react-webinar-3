export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  loadComments: (id) => {
    return async (dispatch, getState, services) => {
      // Сброс комментариев и установка признака ожидания загрузки
      dispatch({ type: "comments/load-start" });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Комментарии загружены успешно
        dispatch({
          type: "comments/load-success",
          payload: { data: res.data.result },
        });
      } catch (e) {
        // Ошибка загрузки
        dispatch({ type: "comments/load-error" });
      }
    };
  },

  addNew: ({ text, parent, id }) => {
    return async (dispatch, getState, services) => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        dispatch({ type: "comments/load-start" });
        await services.api.request({
          url: `/api/v1/comments`,
          method: "POST",
          headers: {
            "X-Token": token,
          },
          body: JSON.stringify({
            text,
            parent,
          }),
        });
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        dispatch({
          type: "comments/load-success",
          payload: { data: res.data.result },
        });
      } catch (e) {
        dispatch({ type: "comments/load-error", payload: e.message });
      }
    };
  },
};
