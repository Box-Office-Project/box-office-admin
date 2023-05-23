import React from "react";
import type { MovieData } from "./MovieListCard";

type Props = {
  movie: MovieData;
};

const MovieDetailCard = ({ movie }: Props) => {
  const {
    title,
    posterImgUrl,
    diretor,
    actor,
    movieRated,
    genre,
    summary,
    runningTime,
    startDate,
    endDate,
  } = movie;
  return (
    <div className="relative w-full flex gap-1">
      <div className="w-96 h-64">
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
        <p className="py-2 font-semibold leading-6">{title}</p>
        <p className="py-2 text-sm leading-6">줄거리: {summary}</p>
        <p className="py-2 text-sm leading-6">
          감독: {diretor} / 출연: {actor}
        </p>
        <p className="py-2 text-sm leading-6">장르: {genre}</p>
        <p className="py-2 text-sm leading-6">관람가: {movieRated} </p>
        <p className="py-2 text-sm leading-6">상영시간: {runningTime} 분</p>
        <p className="py-2 text-sm leading-6">
          상영기간: {`${startDate} ~ ${endDate}`}{" "}
        </p>
        {/* <p className="text-sm leading-6">{isShowing(startDate, endDate)}</p> */}
      </div>
    </div>
  );
};

export default MovieDetailCard;
