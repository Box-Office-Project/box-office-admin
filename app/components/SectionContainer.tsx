import React from "react";

type SectionContainerProps = {
  children?: React.ReactNode;
};

export const SectionContainer = ({ children }: SectionContainerProps) => {
  return (
    <div className="bg-white rounded-sm p-2 w-full shadow-sm">{children}</div>
  );
};
