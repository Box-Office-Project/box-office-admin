import React from "react";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  size: "sm" | "md" | "lg";
  onClick?: () => void;
}

function Button(props: ButtonProps) {
  const { children, size, onClick, ...rest } = props;
  const boxSize =
    size === "sm"
      ? "w-24 h-8"
      : size === "md"
      ? "w-32 h-12"
      : size === "lg"
      ? "w-48 h-16"
      : "";
  const fontSize =
    size === "sm"
      ? "text-sm"
      : size === "md"
      ? "text-base"
      : size === "lg"
      ? "text-lg"
      : "";
  return (
    <button
      className={`${boxSize} ${fontSize} bg-indigo-700 text-white rounded-md hover:bg-indigo-800`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
