import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { Link } from "react-router-dom";

function Menu() {
  const cn = bem("Menu");

  return (
    <nav className={cn()}>
      <Link className={cn("link")} to="/">
        Главная
      </Link>
    </nav>
  );
}

export default Menu;
