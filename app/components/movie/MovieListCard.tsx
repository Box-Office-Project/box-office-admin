import React from "react";
import BadgeShow from "./BadgeShow";

type MovieListCardProps = {
  title: string;
  posterImgUrl: string;
  diretor: string;
  actor: string;
  genre: string;
  movieRated: string;
  isShowing: boolean;
};

const MovieListCard = ({
  title,
  posterImgUrl,
  diretor,
  actor,
  genre,
  movieRated,
  isShowing,
}: MovieListCardProps) => {
  return (
    <div className="relative w-full aspect-3/1 border-2 border-gray-200 rounded-sm flex gap-1">
      <div className="absolute top-2 right-2">
        <BadgeShow status="상영중" />
      </div>
      <div className="aspect-3/4">
        <img
          className="w-full h-full object-cover"
          src={
            "https://newsimg-hams.hankookilbo.com/2022/10/24/8d55455e-b92e-4159-80e1-de2a3275960f.jpg"
          }
          alt={title}
        />
      </div>
      <div className="p-2">
        <p className="font-semibold leading-6">{title}</p>
        <p className="text-sm leading-6">
          감독: {diretor} / 출연: {actor}
        </p>
        <p className="text-sm leading-6">장르: {genre}</p>
        <p className="text-sm leading-6">{movieRated} 관람가</p>
        <p className="text-sm leading-6">{isShowing}</p>
      </div>
    </div>
  );
};

MovieListCard.defaultProps = {
  title: "영화 이름",
  posterImgUrl: "",
  diretor: "AAA",
  actor: "BBB, CCC",
  genre: "DDD, EEE",
  movieRated: "XX",
  isShowing: true,
};

export default MovieListCard;
