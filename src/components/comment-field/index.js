import { useState } from "react";
import PropTypes from "prop-types";
import "./style.css";

function CommentField(props) {
  const [message, setMessage] = useState("");

  const callbacks = {
    onSubmit: (evt) => {
      evt.preventDefault();
      message.trim()
        ? props.onSubmit(message)
        : console.error("Ошибка! Текст комментария не может быть пустым");
    },
  };

  return (
    <form
      className={`CommentField ${props.onReset && "CommentField-reply"} `}
      onReset={props.onReset}
      onSubmit={callbacks.onSubmit}
    >
      <label htmlFor="message">
        <strong>{props.title}</strong>
      </label>
      <textarea
        className="CommentField-message"
        name="message"
        id="message"
        rows={4}
        value={message}
        placeholder={props.placeholder}
        onChange={(evt) => setMessage(evt.target.value)}
      ></textarea>
      <div className="CommentField-actions">
        <button type="submit" className="CommentField-button">
          Отправить
        </button>

        {props.onReset && (
          <button type="reset" className="CommentField-button">
            Отмена
          </button>
        )}
      </div>
    </form>
  );
}

CommentField.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func,
  onReset: PropTypes.func,
};

CommentField.defaultProps = {
  onSubmit: () => {},
};

export default CommentField;
