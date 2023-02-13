import React from "react";

type NavbarUserInfoProps = {
  profileImage: string;
  username: string;
  email: string;
};

export const NavbarUserInfo = ({
  profileImage,
  username,
  email,
}: NavbarUserInfoProps) => {
  return (
    <div className="w-full h-24 flex items-center gap-4 pl-4">
      <div className="w-12 h-12 rounded-full bg-gray-400">
        <img
          src={
            "https://cdn.pixabay.com/photo/2020/10/05/10/51/cat-5628953_960_720.jpg"
          }
          alt={username}
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
      <div className="text-gray-500">
        <div className="font-semibold">{username}</div>
        <div className="text-sm">{email}</div>
      </div>
    </div>
  );
};
