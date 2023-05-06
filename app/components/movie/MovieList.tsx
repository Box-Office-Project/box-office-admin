import React from "react";
import type { MovieData } from "./MovieListCard";
import MovieListCard from "./MovieListCard";

type Props = {
  movies: MovieData[];
};

const MovieList = ({ movies }: Props) => {
  if (movies.length === 0) {
    return (
      <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
        {/* TODO: No data component 만들기 */}
        영화 데이터가 없습니다.
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
      {movies?.map((item: any) => (
        <MovieListCard key={item.movieId} movie={item} />
      ))}
    </div>
  );
};

MovieList.defaultProps = {
  movies: [],
};

export default MovieList;
