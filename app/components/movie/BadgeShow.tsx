import React from "react";

type BadgeShowProps = {
  status: "상영중" | "예매중" | "미정";
};

const BadgeShow = ({ status }: BadgeShowProps) => {
  const ColorClassName =
    status === "상영중"
      ? "border-red-600 text-red-600"
      : status === "예매중"
      ? "border-yellow-600 text-yellow-600"
      : "border-green-600 text-green-600";
  return (
    <div
      className={`w-12 h-6 box-border text-xs font-semibold text-center leading-6 ${ColorClassName} border-2 rounded-md`}
    >
      {status}
    </div>
  );
};

export default BadgeShow;
