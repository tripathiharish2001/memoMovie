import React, { useState } from "react";
import Stars from "./Stars";

const StarRatings = ({ maxRating = 10, handleRate }) => {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);
  return (
    <>
      <div>
        <div>
          {Array.from({ length: maxRating }, (_, i) => {
            return (
              // <span style={{ paddingRight: "5px", color: "red" }}>S{i + 1}</span>
              <Stars
                key={i}
                onRate={() => {
                  setRating(i + 1);
                  handleRate(i + 1);
                }}
                full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
                onHoverIn={() => setTempRating(i + 1)}
                onHoverOut={() => setTempRating(0)}
              />
            );
          })}
          <span>{tempRating || ""}</span>
        </div>
      </div>
    </>
  );
};

export default StarRatings;
