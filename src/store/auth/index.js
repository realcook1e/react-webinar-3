import StoreModule from "../module";

/**
 * Авторизация пользователя
 */
class AuthState extends StoreModule {
  initState() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    return {
      waiting: false,
      username,
      token,
      user: {},
    };
  }

  async login(username, password) {
    this.setState({
      token: null,
      waiting: true,
    });

    try {
      const data = {
        login: username,
        password,
        remembered: true,
      };
      const response = await fetch("/api/v1/users/sign", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (response.status !== 200) {
        throw new Error(json.error.data.issues[0].message);
      }

      this.setState(
        {
          error: null,
          waiting: false,
          token: json.result.token,
          user: json.result.user,
          username: json.result.user.profile.name,
        },
        "Успех авторизации"
      );
      localStorage.setItem("token", json.result.token);
      localStorage.setItem("username", json.result.user.profile.name);
      return json.result.token;
    } catch (e) {
      console.log("Error: ", e);
      this.setState({
        error: e.message,
        waiting: false,
      });
    }
  }

  async logout() {
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: "delete",
        body: JSON.stringify({
          remembered: true,
        }),
        headers: {
          "X-Token": this.getState().token,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const json = await response.json();

      this.setState(
        {
          token: null,
          username: null,
          profile: null,
          waiting: false,
        },
        "Выход пользователя"
      );
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    } catch (e) {
      console.log("Error: ", e);
      this.setState({
        token: null,
        error: e.message,
        waiting: false,
      });
    }
  }

  async loadUserProfile() {
    const token = this.getState().token;
    if (!token) return;

    try {
      const response = await fetch(`/api/v1/users/self?fields=*`, {
        method: "GET",
        headers: {
          "X-Token": token,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      const json = await response.json();

      if (response.status !== 200) {
        throw new Error(json.error.data.issues[0].message);
      }

      this.setState(
        {
          error: null,
          token,
          user: { ...json.result },
          username: json.result.profile.name,
          waiting: false,
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

export default AuthState;
