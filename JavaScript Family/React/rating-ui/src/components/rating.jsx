import { useState } from "react";

const Rating = () => {
  return (
    <div className="rating-container">
      <h2>Rate Us!!</h2>
      <h3>A simple Rating Component made w/ React</h3>

      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span>{"\u2605"}</span>
        ))}
      </div>
    </div>
  );
};

export default Rating;
