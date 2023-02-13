import { useNavigate } from "@remix-run/react";
import React, { memo, useState } from "react";
import type { NavItem } from "./Navbar";

export const KEY_SELETED_NAVITEM = "navitem-selected";

type NavbarItemProps = {
  navitem: NavItem;
};

export const NavbarItem = memo(({ navitem }: NavbarItemProps) => {
  const { title, link } = navitem;
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const onClick = () => {
    navigate(link);
  };

  return (
    <div
      className={`pl-4 py-2 cursor-pointer ${
        isSelected
          ? "text-indigo-500 border-r-4 border-solid border-indigo-500"
          : "text-gray-500"
      }`}
      onClick={onClick}
    >
      {title}
    </div>
  );
});

NavbarItem.displayName = "NavbarItem";
