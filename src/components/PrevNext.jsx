import { useState } from "react";

export default function PrevNext({setCurrentPage, currentPage, dataLength, itemsPerPage}) {
  return (
    <div>
      <button
        className="btn"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage <= 0}>
        Prev
      </button>
      <button
        className="btn"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage + 1 >= Math.ceil(dataLength / itemsPerPage)}>
        Next
      </button>
    </div>
  );
}
