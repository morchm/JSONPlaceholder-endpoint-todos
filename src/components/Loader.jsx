import React, { useEffect } from "react";
import "./loader.css";

const Loader = () => {
  useEffect(() => {
    // Man skal have ".showModal()", før at dialog kan virke
    document.querySelector("dialog").showModal();
  }, []);

  return (
    // Dialog - Har allerede en set-setting hvor boksen vil være i midten af hjemmesiden
    <dialog>
      <div className="loader" id="loader-2">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </dialog>
  );
};

export default Loader;
