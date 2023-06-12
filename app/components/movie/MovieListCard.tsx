import { Link } from "@remix-run/react";
import React from "react";
import { compareDate } from "~/utils/dateTime";
import BadgeShow from "./BadgeShow";

export interface MovieData {
  movieId?: number;
  title: string;
  posterImgUrl: string;
  director: string;
  actor: string;
  movieRated: string;
  runningTime?: number;
  genre: string;
  startDate: string;
  endDate: string;
  summary?: string;
}

type MovieListCardProps = {
  movie: MovieData;
};

const MovieListCard = ({ movie }: MovieListCardProps) => {
  const {
    movieId,
    title,
    posterImgUrl,
    director,
    actor,
    movieRated,
    genre,
    startDate,
    endDate,
  } = movie;
  const isShowing: (
    startDate: string,
    endDate: string
  ) => "예매중" | "마감" | "상영중" = (startDate, endDate) => {
    const timeNow = new Date();
    if (compareDate(timeNow, new Date(startDate)) < 0) {
      return "예매중";
    } else if (compareDate(new Date(endDate), timeNow) < 0) {
      return "마감";
    }
    return "상영중";
  };
  return (
    <Link to={`/movie/${movieId}`}>
      <div className="relative w-full min-h-full border-2 border-gray-200 rounded-sm flex gap-1">
        <div className="absolute top-2 right-2">
          <BadgeShow status={isShowing(startDate, endDate)} />
        </div>
        <div className="w-1/5">
          <img
            className="w-full h-full object-cover"
            src={
              posterImgUrl ||
              "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
            }
            alt={title}
          />
        </div>
        <div className="p-2 w-4/5">
          <p className="font-semibold leading-6">{title}</p>
          <p className="text-sm leading-6 truncate">감독: {director}</p>
          <p className="text-sm leading-6 truncate">출연: {actor}</p>
          <p className="text-sm leading-6 truncate">장르: {genre}</p>
          <p className="text-sm leading-6 truncate">관람가: {movieRated} </p>
        </div>
      </div>
    </Link>
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
