import { useState } from "react";

export default function PrevNext({
  setCurrentPage,
  currentPage,
  dataLength,
  itemsPerPage,
}) {
  return (
    <div>
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l m-1 rounded"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage <= 0}
      >
        Prev
      </button>
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l m-1 rounded"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage + 1 >= Math.ceil(dataLength / itemsPerPage)}
      >
        Next
      </button>
    </div>
  );
}
