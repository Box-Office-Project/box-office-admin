import type { InputHTMLAttributes } from "react";
import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { PhotoIcon } from "@heroicons/react/24/outline";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
}

export function Input({
  id,
  label,
  type = "text",
  placeholder = "",
}: InputProps) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="text-gray-700">
        {label}
      </label>
      <div className="mt-2 rounded-md">
        <input
          type={type}
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

interface FileWithPreview extends File {
  preview: string;
}

export function ImageInput({ id, label, placeholder = "" }: InputProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) {
      return;
    }

    const newFiles = [];
    for (let i = 0; i < fileList?.length; i++) {
      const targetFile = fileList.item(i);
      const preview = URL.createObjectURL(targetFile!);
      newFiles.push(Object.assign(targetFile!, { preview }));
    }

    setFiles(newFiles);
  };

  const thumbs = files.map((file) => (
    <div className="grid content-center" key={file.name}>
      <img
        src={file.preview}
        onLoad={() => URL.revokeObjectURL(file.preview)}
        className="object-fill"
      />
    </div>
  ));

  return (
    <div className="w-full">
      <label htmlFor={id} className="text-gray-700">
        {label}
      </label>
      <div className="mt-2 rounded-md">
        <input
          type="file"
          name={id}
          id={id}
          className="form-control w-full
          outline-0 rounded-md border-gray-300 border-solid border-2
          cursor-pointer
          focus:border-indigo-500
          file:border-0 file:p-2 file:text-gray-700 file:hover:bg-gray-200 file:transition file:cursor-pointer
          "
          placeholder={placeholder}
          accept="image/png, image/jpeg"
          onChange={(e) => onInput(e)}
          multiple
        />
      </div>
      <aside className="relative my-2 h-96 p-2 grid grid-rows-1 grid-flow-col auto-cols-poster gap-2 rounded-md border-gray-300 border-solid border-2 overflow-x-auto bg-gray-100">
        {thumbs.length ? (
          thumbs
        ) : (
          <p className="absolute w-full text-center top-32 py-2 text-gray-400">
            <PhotoIcon className="w-full h-24" />
          </p>
        )}
      </aside>
    </div>
  );
}
