import { useDispatch, useSelector as useStoreSelector } from "react-redux";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import Comment from "../../components/comment";
import CommentField from "../../components/comment-field";
import CommentList from "../../components/comment-list";
import CommentAuth from "../../components/comment-auth";
import Spinner from "../../components/spinner";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import commentsActions from "../../store-redux/comments/actions";

function CommentsContainer({ productId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [parent, setParent] = useState({
    relateTo: "product",
    id: productId,
  });

  const select = useStoreSelector((state) => ({
    comments: state.comments.data.items,
    count: state.comments.data.count,
    waiting: state.comments.waiting,
  }));

  const storeSelect = useSelector((state) => ({
    exists: state.session.exists,
  }));

  const comments = {
    items: useMemo(
      () => [
        ...treeToList(
          listToTree(select.comments ? select.comments : [], productId),
          (item, level) => ({ ...item, level })
        ),
      ],
      [select.comments]
    ),
  };

  const callbacks = {
    clearParent: useCallback(() => {
      setParent({
        id: productId,
        type: "product",
      });
    }, [productId]),
    setParent: useCallback(
      (id) => {
        setParent({
          id,
          type: "comment",
        });
      },
      [setParent]
    ),
    onSignIn: useCallback(() => {
      navigate("/login", { state: { back: location.pathname } });
    }, [location.pathname]),
    addComment: useCallback(
      (text) => {
        dispatch(commentsActions.addNew({ text, parent, id: productId }));
        callbacks.clearParent();
      },
      [parent]
    ),
  };

  return (
    <Spinner active={select.waiting}>
      <CommentList title={`Комментарии (${select.count})`}>
        {select.count &&
          comments.items.map((comment) => (
            <div
              key={comment._id}
              style={{ paddingLeft: `${(comment.level - 1) * 30}px` }}
            >
              <Comment {...comment} onReply={callbacks.setParent} />
              {parent.id === comment._id &&
                (storeSelect.exists ? (
                  <CommentField
                    title="Новый ответ"
                    onReset={callbacks.clearParent}
                    onSubmit={callbacks.addComment}
                  />
                ) : (
                  <CommentAuth
                    onSignIn={callbacks.onSignIn}
                    onReset={callbacks.clearParent}
                  />
                ))}
            </div>
          ))}
        {parent.id === productId &&
          (storeSelect.exists ? (
            <CommentField
              title="Новый комментарий"
              onSubmit={callbacks.addComment}
            />
          ) : (
            <CommentAuth onSignIn={callbacks.onSignIn} />
          ))}
      </CommentList>
    </Spinner>
  );
}

export default CommentsContainer;
