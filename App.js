import React from "react";
import ReactDOM from "react-dom";

const heading = React.createElement("h1", {id: "heading"}, "welcome to React Chanda Chandra Mahesh");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(heading);

