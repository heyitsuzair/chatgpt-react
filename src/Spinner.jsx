import React from "react";

export default function Spinner() {
  return (
    <>
      <div className="spinner">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h1 style={{ color: "black" }}>Processing....</h1>
      </div>
    </>
  );
}
