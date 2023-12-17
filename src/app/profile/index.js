import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";

import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import User from "../../components/user";
import ProfileInfo from "../../components/profile-info";
import Spinner from "../../components/spinner";

function Profile() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    username: state.auth.username,
    user: state.profile.user,
    waiting: state.auth.waiting,
  }));

  useInit(
    () => {
      store.actions.profile.loadUserProfile();
    },
    [],
    true
  );

  const callbacks = {
    onLogout: useCallback(() => {
      store.actions.auth.logout();
    }, [store]),
    onLogin: useCallback(() => {
      navigate(
        `/login?prevPath=${window.location.pathname + window.location.search}`
      );
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
      <Spinner active={select.waiting}>
        <ProfileInfo user={select.user} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
