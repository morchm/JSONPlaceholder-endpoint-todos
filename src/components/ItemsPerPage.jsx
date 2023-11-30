export default function ItemsPerPage({ setItemsPerPage, setCurrentPage, options }) {
  return (
    <>
    {/* Options svarer til fx [10, 50, 100] */}
      {options.map(o => (
        <button
          className="btn"
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
