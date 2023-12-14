import { memo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import User from "../../components/user";
import ProfileInfo from "../../components/profile-info";

function Profile() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    username: state.auth.username,
    token: state.auth.token,
    user: state.auth.user,
  }));

  useEffect(() => {
    if (!select.token) {
      navigate(`/login`);
    }
    store.actions.auth.loadUserProfile();
  }, [select.token]);

  const callbacks = {
    onLogout: useCallback(() => {
      store.actions.auth.logout();
    }, [store]),
    onLogin: useCallback(() => {
      navigate("/login");
    }, [store]),
  };

  const { t } = useTranslate();

  return (
    <PageLayout>
      <User
        username={select.username}
        onLogout={callbacks.onLogout}
        onLogin={callbacks.onLogin}
        t={t}
      />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileInfo user={select.user} t={t} />
    </PageLayout>
  );
}

export default memo(Profile);
