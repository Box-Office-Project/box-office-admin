import React from "react";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  children: React.ReactNode;
  size: "sm" | "md" | "lg";
  bgColor?: "indigo" | "red";
}

function Button({ children, size, bgColor = "indigo", ...rest }: ButtonProps) {
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
  const colorVariants = {
    indigo: "bg-indigo-700 hover:bg-indigo-800",
    red: "bg-rose-600 hover:bg-rose-700",
  };
  return (
    <button
      className={`${boxSize} ${fontSize} ${colorVariants[bgColor]} text-white rounded-md transition-colors`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
