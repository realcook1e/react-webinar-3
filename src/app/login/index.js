import { memo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";

import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import AuthForm from "../../components/auth-form";
import User from "../../components/user";

function Login() {
  const prevPath = new URLSearchParams(location.search).get("prevPath");
  const navigate = useNavigate();
  const store = useStore();
  const select = useSelector((state) => ({
    error: state.auth.error,
    token: state.auth.token,
    username: state.auth.username,
  }));

  useEffect(() => {
    if (select.token) navigate(prevPath || "/profile");
  }, [select.token]);

  const callbacks = {
    onLogin: useCallback(
      async (login, password) => {
        const token = await store.actions.auth.login(login, password);
        if (token) {
          navigate(prevPath || "/profile");
        }
      },
      [store]
    ),

    onLogout: useCallback(() => {
      store.actions.auth.logout();
    }, [store]),

    goToLogin: useCallback(() => {
      navigate("/login");
    }, [store]),
  };

  const { t } = useTranslate();

  return (
    <PageLayout>
      <User
        username={select.username}
        onLogout={callbacks.onLogout}
        onLogin={callbacks.goToLogin}
        t={t}
      />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <AuthForm onLogin={callbacks.onLogin} error={select.error} t={t} />
    </PageLayout>
  );
}

export default memo(Login);
