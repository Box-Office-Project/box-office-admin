import React from "react";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import MovieListCard from "./MovieListCard";

export const loader = async () => {
  try {
    const { data } = await axios.get("https://localhost:8080/api/movies");
    return data;
  } catch (error) {
    throw new Error("Something wrong");
  }
};

type Props = {};

const MovieList = (props: Props) => {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2">
      {data.map((item: any) => (
        <MovieListCard key={item.movieId} movie={data} />
      ))}
    </div>
  );
};

export default MovieList;
