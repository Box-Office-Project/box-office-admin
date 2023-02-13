import React from "react";
import type { NavItem } from "./Navbar";
import { NavbarItem } from "./NavbarItem";

type NavbarMenuProps = {
  navitem: NavItem;
};

export const NavbarMenu = ({ navitem }: NavbarMenuProps) => {
  const { title, id, link } = navitem;

  if (!navitem.children) {
    return (
      <li className="hover:bg-indigo-100">
        <NavbarItem navitem={navitem} />
      </li>
    );
  }

  return (
    <>
      <li className="hover:bg-indigo-100">
        <NavbarItem navitem={{ title, id, link }} />
      </li>
      <ul>
        {navitem.children.map((item) => (
          <li key={item.id} className="pl-4 hover:bg-indigo-100">
            <NavbarItem navitem={item} />
          </li>
        ))}
      </ul>
    </>
  );
};
