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
        console.log(res.data.result);
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
        dispatch({ type: "comments/add-start" });
        const res = await services.api.request({
          url: `/api/v1/comments?fields=_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted`,
          method: "POST",
          headers: {
            "X-Token": token,
          },
          body: JSON.stringify({
            text,
            parent,
          }),
        });

        if (!res.data.error) {
          dispatch({
            type: "comments/add-success",
            payload: { data: res.data.result },
          });
        } else {
          throw new Error(res.data.error);
        }
      } catch (e) {
        dispatch({ type: "comments/add-error", payload: e.message });
      }
    };
  },
};
