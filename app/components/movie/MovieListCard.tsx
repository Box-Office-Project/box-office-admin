import React from "react";
import { compareDate } from "~/utils/dateTime";
import BadgeShow from "./BadgeShow";

export interface MovieData {
  movieId?: number;
  title: string;
  posterImgUrl: string;
  diretor: string;
  actor: string;
  movieRated: string;
  genre: string;
  startDate: string;
  endDate: string;
}

type MovieListCardProps = {
  movie: MovieData;
};

const MovieListCard = ({ movie }: MovieListCardProps) => {
  const {
    title,
    posterImgUrl,
    diretor,
    actor,
    movieRated,
    genre,
    startDate,
    endDate,
  } = movie;
  const isShowing = (startDate: string, endDate: string) => {
    const timeNow = new Date();
    if (compareDate(timeNow, new Date(startDate)) < 0) {
      return "예매중";
    } else if (compareDate(new Date(endDate), timeNow) < 0) {
      return "마감";
    }
    return "상영중";
  };
  return (
    <div className="relative w-full aspect-3/1 border-2 border-gray-200 rounded-sm flex gap-1">
      <div className="absolute top-2 right-2">
        <BadgeShow status="상영중" />
      </div>
      <div className="aspect-3/4">
        <img
          className="w-full h-full object-cover"
          src={
            posterImgUrl ||
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
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
        <p className="text-sm leading-6">관람가: {movieRated} </p>
        <p className="text-sm leading-6">{isShowing(startDate, endDate)}</p>
      </div>
    </div>
  );
};

MovieListCard.defaultProps = {
  movie: {
    title: "영화 이름",
    posterImgUrl: "",
    diretor: "AAA",
    actor: "BBB, CCC",
    genre: "DDD, EEE",
    movieRated: "XX",
    isShowing: true,
  },
};

export default MovieListCard;
