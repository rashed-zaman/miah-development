import React from "react";

export default function FilterLabel({ filter }) {
  return (
    <span>
      <span
        style={{
          width: "10px",
          height: "10px",
          background: `${filter.code}`,
          display: "inline-block",
          marginRight: "10px",
          marginTop: "5px",
          boxShadow:"1px 2px 3px"
        }}
      ></span>
      {filter.name}
    </span>
  );
}
