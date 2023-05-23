import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import React from "react";
import Navbar from "~/components/navbar/Navbar";
import { getToken } from "~/utils/session.server";

type Props = {};

// TODO: 로그인하지 않은 사용자 /login으로 redirect
export const loader = async ({ request }: LoaderArgs) => {
  const token = await getToken(request);
  if (!token) {
    return redirect("/login");
  }
  return null;
};

const index = (props: Props) => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default index;
