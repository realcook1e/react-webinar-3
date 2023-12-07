import { useCallback } from "react";
import "./style.css";

function Pagination({ currPage, totalPages, changePage }) {
  console.log(currPage);

  const callbacks = {
    // Пагинация
    handleChangePage: useCallback(
      (e) => {
        if (!(e.target instanceof HTMLButtonElement)) return;
        changePage(+e.target.textContent);
      },
      [changePage]
    ),
  };

  let innerContent;

  if (currPage < 3) {
    innerContent = (
      <>
        {Array.from({ length: 3 }, (_, i) => (
          <button className={currPage === i + 1 ? "active" : ""} key={i}>
            {i + 1}
          </button>
        ))}
        <span>...</span>
        <button>{totalPages}</button>
      </>
    );
  } else if (currPage === totalPages || currPage + 1 === totalPages) {
    innerContent = (
      <>
        {<button>1</button>}
        <span>...</span>
        {Array.from({ length: 3 }, (_, i) => (
          <button
            className={currPage === totalPages - 2 + i ? "active" : ""}
            key={i}
          >
            {totalPages - 2 + i}
          </button>
        ))}
      </>
    );
  } else {
    innerContent = (
      <>
        <button>1</button>
        {currPage > 3 && <span>...</span>}
        {Array.from({ length: 3 }, (_, i) => (
          <button
            className={currPage === currPage + i - 1 ? "active" : ""}
            key={i}
          >
            {currPage + i - 1}
          </button>
        ))}
        {currPage < totalPages - 2 && <span>...</span>}
        <button>{totalPages}</button>
      </>
    );
  }

  return (
    <div className="Pagination" onClick={callbacks.handleChangePage}>
      {innerContent}
    </div>
  );
}

export default Pagination;
