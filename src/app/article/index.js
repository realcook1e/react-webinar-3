import { memo, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import User from "../../components/user";

/**
 * Страница товара с первичной загрузкой товара по id из url адреса
 */
function Article() {
  const store = useStore();
  const navigate = useNavigate();

  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(() => {
    store.actions.article.load(params.id);
  }, [params.id]);

  const select = useSelector((state) => ({
    article: state.article.data,
    waiting: state.article.waiting,
    username: state.auth.username,
    token: state.auth.token,
  }));

  const { t } = useTranslate();

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(
      (_id) => store.actions.basket.addToBasket(_id),
      [store]
    ),
    onLogout: useCallback(() => {
      store.actions.auth.logout();
    }, [store]),
    onLogin: useCallback(() => {
      navigate(
        `/login?prevPath=${window.location.pathname + window.location.search}`
      );
    }),
  };

  return (
    <PageLayout>
      <User
        username={select.username}
        onLogin={callbacks.onLogin}
        onLogout={callbacks.onLogout}
        t={t}
      />
      <Head title={select.article.title}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ArticleCard
          article={select.article}
          onAdd={callbacks.addToBasket}
          t={t}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Article);
