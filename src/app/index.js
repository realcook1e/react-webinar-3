import Basket from "./basket";
import Main from "./main";
import Product from "../pages/product";
import NotFound from "../pages/notfound";
import useSelector from "../store/use-selector";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {activeModal === "basket" && <Basket />}
      </BrowserRouter>
    </>
  );
}

export default App;
