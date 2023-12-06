import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "../app";
import Main from "../app/main";
import Product from "../pages/product";
import NotFound from "../pages/notfound";

export const routes = {
  INDEX: "/",
  PRODUCTS: "/products",
  PRODUCT_ID: "/:id",
  NOT_FOUND: "*",
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={routes.INDEX} element={<App />}>
      <Route index element={<Main />} />
      <Route
        path={`${routes.PRODUCTS}${routes.PRODUCT_ID}`}
        element={<Product />}
      />
      <Route path={routes.NOT_FOUND} element={<NotFound />} />
    </Route>
  )
);

export const Router = () => {
  return <RouterProvider router={router} />;
};
