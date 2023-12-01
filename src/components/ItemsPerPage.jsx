export default function ItemsPerPage({ setItemsPerPage, setCurrentPage, options }) {
  return (
    <>
    {/* Options svarer til fx [10, 50, 100] */}
      {options.map(o => (
        <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-thin text-sm  py-2 px-4 rounded-l m-1 rounded"
          onClick={() => {
            setItemsPerPage(o);
            setCurrentPage(0);
          }}>
          {o} pr. side
        </button>
      ))}
    </>
  );
}
