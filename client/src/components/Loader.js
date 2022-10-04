import { FadeLoader } from "react-spinners";
import React, { useState } from "react";
const override = {
  display: "block",
  margin: "200px auto",
};

function Loader({ wait }) {
  let [color, setColor] = useState("#0f2045e3");
  return (
    <div className="sweet-loading">
      <FadeLoader
        color={color}
        loading={wait}
        cssOverride={override}
        size={40}
      />
    </div>
  );
}

export default Loader;
