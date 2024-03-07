import { memo } from "react";

function CircleLoadingSpin({ className, color = "#fff", width = "180" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      className={"m-auto bg-transparent " + className}
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke={color}
        strokeWidth="4"
        r="35"
        strokeDasharray="164.93361431346415 56.97787143782138"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1.0101010101010102s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        ></animateTransform>
      </circle>
    </svg>
  );
}

export default memo(CircleLoadingSpin);
