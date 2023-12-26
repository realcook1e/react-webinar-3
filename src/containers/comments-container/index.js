import { useDispatch, useSelector as useStoreSelector } from "react-redux";
import { useCallback, useMemo, useState, useEffect } from "react";
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
import { useRef } from "react";

function CommentsContainer({ productId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [parent, setParent] = useState({
    _type: "article",
    _id: productId,
  });

  const commentInput = useRef();

  useEffect(() => {
    if (commentInput.current) {
      const scrollOptions = {
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      };
      commentInput.current.scrollIntoView(scrollOptions);
    }
  }, [commentInput, parent]);

  const select = useStoreSelector((state) => ({
    comments: state.comments.data.items,
    count: state.comments.data.count,
    waiting: state.comments.waiting,
  }));

  const storeSelect = useSelector((state) => ({
    exists: state.session.exists,
    user: state.session.user,
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
    answers: useMemo(
      () =>
        treeToList(listToTree(select.comments), (item, level) => ({
          targetId: item._id,
          position:
            item.children.length > 0 ? item.children.at(-1)._id : item._id,
          offset: level,
        })),
      [select.comments]
    ).reduce(
      (acc, item) =>
        acc.has(item.position)
          ? acc.set(item.position, [...acc.get(item.position), item])
          : acc.set(item.position, [item]),
      new Map()
    ),
  };

  const callbacks = {
    clearParent: useCallback(() => {
      setParent({
        _id: productId,
        _type: "article",
      });
    }, [productId]),
    setParent: useCallback(
      (id) => {
        setParent({
          _id: id,
          _type: "comment",
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
        {select.count
          ? comments.items.map((comment) => (
              <div
                key={comment._id}
                style={{
                  paddingLeft: `${
                    comment.level < 6 ? comment.level * 30 : 120
                  }px`,
                }}
              >
                <Comment
                  {...comment}
                  onReply={callbacks.setParent}
                  activeUserId={storeSelect.user._id}
                />
                {comments.answers.has(comment._id) &&
                  comments.answers.get(comment._id).map((answer) => {
                    if (parent._id === answer.targetId) {
                      let inner;
                      if (storeSelect.exists) {
                        inner = (
                          <CommentField
                            title="Новый ответ"
                            onReset={callbacks.clearParent}
                            onSubmit={callbacks.addComment}
                            ref={commentInput}
                          />
                        );
                      } else {
                        inner = (
                          <CommentAuth
                            onSignIn={callbacks.onSignIn}
                            onReset={callbacks.clearParent}
                            label=", чтобы иметь возможность ответить.&nbsp;"
                          />
                        );
                      }
                      return (
                        <div
                          style={{
                            paddingLeft: `${
                              comment.level === answer.offset ? 0 : 30
                            }px`,
                          }}
                        >
                          {inner}
                        </div>
                      );
                    }
                  })}
              </div>
            ))
          : ""}
        {parent._id === productId &&
          (storeSelect.exists ? (
            <CommentField
              title="Новый комментарий"
              onSubmit={callbacks.addComment}
            />
          ) : (
            <CommentAuth
              onSignIn={callbacks.onSignIn}
              label=", чтобы иметь возможность комментировать."
            />
          ))}
      </CommentList>
    </Spinner>
  );
}

export default CommentsContainer;
