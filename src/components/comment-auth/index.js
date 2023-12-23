import PropTypes from "prop-types";
import "./style.css";

function CommentAuth({ onSignIn, onReset, label }) {
  return (
    <p className={`CommentAuth ${onReset && "CommentAuth-reply"} `}>
      <span className="CommentAuth-signin" onClick={onSignIn}>
        Войдите
      </span>
      {label}
      {onReset && (
        <span className="CommentAuth-reset" onClick={onReset}>
          Отмена
        </span>
      )}
    </p>
  );
}

CommentAuth.propTypes = {
  label: PropTypes.string,
  onReset: PropTypes.func,
  onSignIn: PropTypes.func,
};

CommentAuth.defaultProps = {
  onSignIn: () => {},
};

export default CommentAuth;
