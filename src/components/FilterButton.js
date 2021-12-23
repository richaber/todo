import React from "react";

function FilterButton(props) {
  return (
    <button
      type="button"
      className="mx-4 font-semibold transition-colors duration-150 bg-white hover:bg-green-400 text-blue-dark hover:text-white py-2 px-4 border border-slate-500 hover:border-transparent rounded"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.name)}
    >
      <span className="screen-reader-text">Show </span>
      <span>{props.name}</span>
      <span className="screen-reader-text"> tasks</span>
    </button>
  );
}


export default FilterButton;
