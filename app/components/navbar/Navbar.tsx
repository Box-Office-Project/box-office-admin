import React, { useRef, useState, useEffect } from "react";
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

const Navbar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);
  const location = useLocation();
  const { refIsOverflow, refIsScrollEnd } = useIsOverflow(ref);

  useEffect(() => {
    const pathname = location?.pathname;

    if (pathname !== "/login") {
      setIsShow(true);
    }
  }, [location]);

  if (!isShow) {
    return null;
  }

  return (
    <nav
      ref={ref}
      className="w-sidebar min-w-sidebar relative h-screen overflow-y-auto bg-white scrollbar-hide border-gray-200 border-2 border-solid flex flex-col justify-between"
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
        <NavbarUserInfo username="Musharof" email="hello@tailgrids.com" />
      </ul>
      {refIsOverflow && !refIsScrollEnd ? <ScrollIndicator /> : null}
    </nav>
  );
};

const navtree: NavItem[] = [
  { title: "홈", link: "/home", id: "home" },
  {
    title: "전체 영화 관리",
    link: "/movie",
    id: "movie",
    children: [
      { title: "영화 목록 조회", link: "/movie", id: "movie.movie" },
      { title: "영화 추가", link: "/movie/create", id: "movie.manage" },
    ],
  },
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

export default Navbar;
