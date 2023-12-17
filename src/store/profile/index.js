import StoreModule from "../module";

/**
 * Профиль пользователя
 */
class ProfileState extends StoreModule {
  initState() {
    return {
      user: {},
    };
  }

  async loadUserProfile() {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`/api/v1/users/self?fields=*`, {
        method: "GET",
        headers: {
          "X-Token": token,
          "Content-type": "application/json",
        },
      });
      const json = await response.json();

      if (response.status !== 200) {
        throw new Error(json.error.data.issues[0].message);
      }

      this.setState(
        {
          ...this.getState(),
          user: json.result,
        },
        "Получены данные пользователя"
      );
    } catch (e) {
      console.log("Error: ", e);
      this.setState(
        {
          error: e.message,
          waiting: false,
        },
        "Ошибка получения данных пользователя"
      );
    }
  }
}

export default ProfileState;
