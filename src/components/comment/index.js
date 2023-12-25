import PropTypes from "prop-types";
import "./style.css";

function Comment(props) {
  const commentDate = new Date(props.dateCreate);
  const date = {
    date: commentDate.getDate(),
    month: commentDate.toLocaleString("default", { month: "long" }),
    year: commentDate.getFullYear(),
    hours: commentDate.getHours(),
    minutes: commentDate.getMinutes(),
  };

  const onReply = () => {
    props.onReply(props._id);
  };

  return (
    <div className="Comment">
      <p
        className={`Comment-title${
          props.author._id === props.activeUserId ? " active" : ""
        }`}
      >
        <b>{props.author.profile.name}</b>
        <span className="Comment-date">{`${date.date} ${date.month} ${date.year} в ${date.hours}:${date.minutes}`}</span>
      </p>
      <p className="Comment-text">{props.text}</p>
      <p>
        <span className="Comment-reply" onClick={onReply}>
          Ответить
        </span>
      </p>
    </div>
  );
}

export default Comment;
