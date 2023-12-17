import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import User from "../../components/user";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";

/**
 * Главная страница - первичная загрузка каталога
 */
function Main() {
  const store = useStore();
  const navigate = useNavigate();

  useInit(
    () => {
      store.actions.catalog.initParams();
      store.actions.category.loadCategories();
    },
    [],
    true
  );

  const select = useSelector((state) => ({
    token: state.auth.token,
    username: state.auth.username,
  }));

  const callbacks = {
    onLogout: useCallback(() => {
      store.actions.auth.logout();
    }, [store]),
    onLogin: useCallback(() => {
      navigate(`/login?prevPath=/`);
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
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default memo(Main);
