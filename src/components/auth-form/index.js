import { useRef } from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";

import "./style.css";

function AuthForm({ onLogin, error, t }) {
  const cn = bem("AuthForm");
  const login = useRef("login");
  const password = useRef("password");

  const callbacks = {
    onLogin: (e) => {
      e.preventDefault();
      onLogin(login.current.value, password.current.value);
    },
  };

  return (
    <form className={cn()}>
      <h2 className={cn("title")}>{t("login.title")}</h2>
      <label className={cn("label")} htmlFor="login">
        {t("login.login")}
        <br />
        <input
          ref={login}
          className={cn("input")}
          name="login"
          id="login"
          type="text"
        />
      </label>
      <label className={cn("label")} htmlFor="password">
        {t("login.password")}
        <br />
        <input
          ref={password}
          className={cn("input")}
          name="password"
          id="password"
          type="password"
        />
      </label>
      <div className={cn("error", error ? "active" : "")}>{error} </div>
      <button
        type="submit"
        onClick={callbacks.onLogin}
        className={cn("button")}
      >
        {t("login.signin")}
      </button>
    </form>
  );
}

AuthForm.propTypes = {
  error: PropTypes.string,
  onLogin: PropTypes.func,
  t: PropTypes.func,
};

export default AuthForm;
