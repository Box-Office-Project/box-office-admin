import React from "react";

type Props = {
  children: React.ReactNode;
};

const ErrorContainer = ({ children }: Props) => {
  return (
    <div className="w-full h-10 py-2 px-4 rounded-md bg-red-600 text-white">
      {children}
    </div>
  );
};

export default ErrorContainer;
