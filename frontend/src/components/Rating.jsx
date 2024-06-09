import React from "react";
import { FaStarHalfAlt, FaStar, FaRegStar } from "react-icons/fa";
const Rating = ({ value, text }) => {
  return (
    <div className="rating">
      <span>
        {value >= 1 ? (
          <FaStar style={{ color: "#18bc9c" }} />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt style={{ color: "#18bc9c" }} />
        ) : (
          <FaRegStar style={{ color: "#18bc9c" }} />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <FaStar style={{ color: "#18bc9c" }} />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt style={{ color: "#18bc9c" }} />
        ) : (
          <FaRegStar style={{ color: "#18bc9c" }} />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <FaStar style={{ color: "#18bc9c" }} />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt style={{ color: "#18bc9c" }} />
        ) : (
          <FaRegStar style={{ color: "#18bc9c" }} />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <FaStar style={{ color: "#18bc9c" }} />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt style={{ color: "#18bc9c" }} />
        ) : (
          <FaRegStar style={{ color: "#18bc9c" }} />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <FaStar style={{ color: "#18bc9c" }} />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt style={{ color: "#18bc9c" }} />
        ) : (
          <FaRegStar style={{ color: "#18bc9c" }} />
        )}
      </span>
      <span className="rating-text">{text && text}</span>
    </div>
  );
};

export default Rating;
