import PropTypes from "prop-types";
import "./style.css";

function CommentAuth({ onSignIn, onReset }) {
  return (
    <p className="CommentAuth">
      <span className="CommentAuth-signin" onClick={onSignIn}>
        Войдите
      </span>
      , чтобы иметь возможность ответить.&nbsp;
      {!!onReset && (
        <span className="CommentAuth-reset" onClick={onReset}>
          Отмена
        </span>
      )}
    </p>
  );
}

CommentAuth.propTypes = {
  onReset: PropTypes.func,
  onSignIn: PropTypes.func,
};

CommentAuth.defaultProps = {
  onReset: () => {},
  onSignIn: () => {},
};

export default CommentAuth;
