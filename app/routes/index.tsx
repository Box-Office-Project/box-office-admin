import { Outlet } from "@remix-run/react";
import React from "react";
import Navbar from "~/components/navbar/Navbar";

type Props = {};

const index = (props: Props) => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default index;
