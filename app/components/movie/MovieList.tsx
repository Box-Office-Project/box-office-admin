import React from "react";
import MovieListCard from "./MovieListCard";

type Props = {};

const MovieList = (props: Props) => {
  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
      <MovieListCard />
      <MovieListCard />
      <MovieListCard />
    </div>
  );
};

export default MovieList;
