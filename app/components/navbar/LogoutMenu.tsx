import { Form, useNavigate } from "@remix-run/react";
import React from "react";

export const LogoutMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout");
  };

  return (
    <Form action="/logout" method="post">
      <li className="hover:bg-indigo-100 cursor-pointer" onClick={handleLogout}>
        <button type="submit" className={`pl-4 py-2`}>
          로그아웃
        </button>
      </li>
    </Form>
  );
};
