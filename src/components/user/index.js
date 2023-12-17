import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import "./style.css";

function User({ username, onLogout, onLogin, t }) {
  const callbacks = {
    onLogout: () => {
      onLogout();
    },
    onLogin: () => {
      onLogin();
    },
  };

  const token = localStorage.getItem("token");

  return (
    <div className="User">
      {username && <Link to="/profile">{username}</Link>}
      <button onClick={token ? callbacks.onLogout : callbacks.onLogin}>
        {username ? t("user.logout") : t("user.login")}
      </button>
    </div>
  );
}

User.propTypes = {
  username: PropTypes.string,
  onLogin: PropTypes.func,
  onLogout: PropTypes.func,
  t: PropTypes.func,
};

export default User;
