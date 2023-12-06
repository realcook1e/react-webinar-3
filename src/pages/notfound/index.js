import { Link } from "react-router-dom";
import { routes } from "../../router";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import "./style.css";

function NotFound() {
  return (
    <PageLayout>
      <Head title={"Страница не найдена"} />
      <div className="NotFound">
        <Link to={routes.INDEX}>На главную</Link>
      </div>
    </PageLayout>
  );
}

export default NotFound;
