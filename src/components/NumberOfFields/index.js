import React from "react";

export default function index({ numbers, setNum }) {
  return (
    <div>
      <select
        onChange={(e) => {
          e.persist();
          setNum(e.target.value);
        }}
        value={numbers}
      >
        <option value=""> Number of fields</option>
        {numbers.map((number) => {
          return <option value={number}>{number}</option>;
        })}
      </select>
    </div>
  );
}
