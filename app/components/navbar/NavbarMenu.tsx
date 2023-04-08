import React, { Fragment } from "react";
import { NavLink } from "@remix-run/react";
import type { NavItem } from "./Navbar";

type NavbarMenuProps = {
  navitem: NavItem;
};

export const NavbarMenu = ({ navitem }: NavbarMenuProps) => {
  const { title, link } = navitem;

  const renderNavItem = (
    link: string,
    title: string,
    isChild: boolean = false
  ) => {
    const activeClassName =
      "block pl-4 py-2 cursor-pointer text-indigo-500 border-r-4 border-solid border-indigo-500";
    const unactiveClassName = "block pl-4 py-2 cursor-pointer";
    return (
      <li className={`hover:bg-indigo-100 ${isChild ? "pl-4" : ""}`}>
        <NavLink
          to={link}
          className={({ isActive }) =>
            isActive ? activeClassName : unactiveClassName
          }
          end={isChild}
        >
          {title}
        </NavLink>
      </li>
    );
  };

  if (!navitem.children) {
    return renderNavItem(link, title);
  }

  return (
    <>
      {renderNavItem(link, title)}
      <ul className="text-gray-500 font-light">
        {navitem.children.map((item) => (
          <Fragment key={item.id}>
            {renderNavItem(item.link, item.title, true)}
          </Fragment>
        ))}
      </ul>
    </>
  );
};
