import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import React from "react";

export const LogoutMenu = () => {
  const handleLogout = () => {
    console.log("logout");
    redirect("/logout");
  };

  return (
    <Form action="/logout" method="post">
      <li className="hover:bg-indigo-100 cursor-pointer" onClick={handleLogout}>
        <button type="submit" className={`pl-4 py-2`}>
          로그아웃 1!!!
        </button>
      </li>
    </Form>
  );
};
