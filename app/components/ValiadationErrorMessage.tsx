import React from "react";

type Props = {
  message: string;
};

const ValiadationErrorMessage = ({ message }: Props) => {
  return (
    <p className="text-red-600" role="alert">
      {message}
    </p>
  );
};

export default ValiadationErrorMessage;
