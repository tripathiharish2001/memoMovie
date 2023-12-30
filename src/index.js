import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarRatings from "./components/StarRatings";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <h1>Please rate service provided by Batra:</h1>
    <StarRatings maxRating={5} />
    <StarRatings maxRating={10} />
    <StarRatings /> */}
  </React.StrictMode>
);
