import PropTypes from "prop-types";
import "./style.css";

function CommentList({ title, children }) {
  return (
    <div className="CommentList">
      <p className="CommentList-title">{title}</p>
      {children}
    </div>
  );
}

CommentList.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default CommentList;
