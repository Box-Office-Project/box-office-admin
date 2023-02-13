import React from "react";

export const LogoutMenu = () => {
  const handleLogout = () => console.log("로그아웃!");

  return (
    <li className="hover:bg-indigo-100">
      <div
        className={`pl-4 py-2 cursor-pointer text-gray-500`}
        onClick={handleLogout}
      >
        로그아웃
      </div>
    </li>
  );
};
