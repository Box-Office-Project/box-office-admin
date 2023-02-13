import React, { useRef } from "react";
import { ScrollIndicator } from "../navbar/ScrollIndicator";
import { useIsOverflow } from "../../hooks/useIsOverflow";
import { NavbarMenu } from "./NavbarMenu";
import { LogoutMenu } from "./LogoutMenu";
import { NavbarUserInfo } from "./NavbarUserInfo";
import { NavLink, useLocation } from "@remix-run/react";

export interface NavItem {
  id: string;
  title: string;
  link: string;
  children?: NavItem[];
}

export const Navbar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { refIsOverflow, refIsScrollEnd } = useIsOverflow(ref);

  const shouldHideNavbar = () => {
    const pathname = location?.pathname;
    return pathname === "/login";
  };

  if (shouldHideNavbar()) {
    return null;
  }

  return (
    <nav
      ref={ref}
      className="w-sidebar h-screen overflow-y-auto bg-white scrollbar-hide relative border-gray-200 border-2 border-solid flex flex-col justify-between"
    >
      <div>
        <NavLink className="block pl-4 py-4 font-bold text-lg" to="/home">
          Box Office
        </NavLink>
        <ul>
          {navtree.map((navitem) => (
            <NavbarMenu key={navitem.id} navitem={navitem} />
          ))}
        </ul>
      </div>
      <ul>
        <hr className="mb-4" />
        <NavbarMenu
          key={"setting"}
          navitem={{ title: "설정", link: "/setting", id: "setting" }}
        />
        <LogoutMenu />
        <NavbarUserInfo
          profileImage="img"
          username="Musharof"
          email="hello@tailgrids.com"
        />
      </ul>
      {refIsOverflow && !refIsScrollEnd ? <ScrollIndicator /> : null}
    </nav>
  );
};

const navtree: NavItem[] = [
  { title: "홈", link: "/home", id: "home" },
  { title: "영화 목록 관리", link: "/movie", id: "movie" },
  {
    title: "영화관 관리",
    link: "/theater",
    id: "theater",
    children: [
      { title: "영화관 목록 관리", link: "/theater", id: "theater.theater" },
      {
        title: "상영관 관리",
        link: "/theater/auditorium",
        id: "theater.auditorium",
      },
      {
        title: "상영 영화 관리",
        link: "/theater/playing",
        id: "theater.playing",
      },
    ],
  },
  { title: "사용자 관리", link: "/user", id: "user" },
];
