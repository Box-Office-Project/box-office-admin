import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

type InputProps = {
  id: string;
  label: string;
  placeholder?: string;
};

export function TextInput({ id, label, placeholder = "" }: InputProps) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="text-gray-700">
        {label}
      </label>
      <div className="mt-2 rounded-md">
        <input
          type="text"
          name={id}
          id={id}
          className="w-full py-2 px-2 outline-0 rounded-md border-gray-300 border-solid border-2 focus:border-indigo-500"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export function PasswordInput({ id, label, placeholder = "" }: InputProps) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="w-full">
      <label htmlFor={id} className="text-gray-700">
        {label}
      </label>
      <div className="mt-2 rounded-md relative">
        <input
          type={isVisible ? "text" : "password"}
          name={id}
          id={id}
          className="w-full py-2 px-2 outline-0 rounded-md border-gray-300 border-solid border-2  focus:border-indigo-500"
          placeholder={placeholder}
        />
        <div
          className="absolute right-1 top-0.5 cursor-pointer"
          onClick={() => setIsVisible((prev) => !prev)}
        >
          {isVisible ? (
            <EyeSlashIcon className="w-6 h-12 fill-gray-400 mr-2" />
          ) : (
            <EyeIcon className="w-6 h-12 fill-gray-400 mr-2" />
          )}
        </div>
      </div>
    </div>
  );
}
