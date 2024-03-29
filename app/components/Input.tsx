import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";
import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
// import { PhotoIcon } from "@heroicons/react/24/outline";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder?: string;
}

export function Input({
  id,
  label,
  type = "text",
  placeholder = "",
  ...res
}: InputProps) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="text-gray-700">
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          name={id}
          id={id}
          className="w-full py-2 px-2 outline-0 rounded-md border-gray-300 border-solid border-2 focus:border-indigo-500"
          placeholder={placeholder}
          {...res}
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
      <div className="mt-2 relative">
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

// interface FileWithPreview extends File {
//   preview: string;
// }

export function ImageInput({ id, label }: InputProps) {
  // TODO: 이미지 미리보기 기능 수정

  // const [files, setFiles] = useState<FileWithPreview[]>([]);

  // const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(e);
  //   const fileList = e.target.files;
  //   if (!fileList) {
  //     return;
  //   }

  //   const newFiles = [];
  //   for (let i = 0; i < fileList?.length; i++) {
  //     const targetFile = fileList.item(i);
  //     const preview = URL.createObjectURL(targetFile!);
  //     newFiles.push(Object.assign(targetFile!, { preview }));
  //   }

  //   setFiles(newFiles);
  // };

  // const thumbs = files.map((file) => (
  //   <div className="grid content-center" key={file.name}>
  //     <img
  //       src={file.preview}
  //       alt={file.name}
  //       onLoad={() => URL.revokeObjectURL(file.preview)}
  //       className="object-fill"
  //     />
  //   </div>
  // ));

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
          accept="image/png, image/jpeg"
          multiple
        />
      </div>
      {/* <aside className="relative my-2 h-96 p-2 grid grid-rows-1 grid-flow-col auto-cols-poster gap-2 rounded-md border-gray-300 border-solid border-2 overflow-x-auto bg-gray-100">
        {thumbs.length ? (
          thumbs
        ) : (
          <p className="absolute w-full text-center top-32 py-2 text-gray-400">
            <PhotoIcon className="w-full h-24" />
          </p>
        )}
      </aside> */}
    </div>
  );
}

export type Option<T> = {
  value: T;
  text: string;
};

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option<any>[];
}

export function Select({ label, options, ...res }: SelectProps) {
  const { name, id, value } = res;
  return (
    <div className="w-full">
      <label htmlFor={id} className="text-gray-700">
        {label}
      </label>
      <div className="mt-2">
        <select
          name={name}
          id={id}
          defaultValue={value}
          className="w-full py-2 px-2 outline-0 rounded-md border-gray-300 border-solid border-2 focus:border-indigo-500 cursor-pointer"
        >
          {options.map((option, index) => (
            <option value={option.value} key={index} className="py-2">
              {option.text}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
