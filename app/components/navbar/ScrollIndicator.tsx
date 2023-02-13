import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export const ScrollIndicator = () => {
  return (
    <div className="w-sidebar h-8 fixed bottom-0 bg-gradient-to-t from-gray-200 to-transparent">
      <ChevronDownIcon className="w-5 h-5 mx-auto" />
    </div>
  );
};
