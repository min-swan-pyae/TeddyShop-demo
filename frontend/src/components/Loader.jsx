import { Spinner } from "react-bootstrap";
import React from "react";

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      variant="success"
      style={{
        width: "100px",
        height: "100px",
        margin: "auto",
        display: "block",
      }}
    >
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default Loader;
