import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import React from "react";
import ErrorContainer from "~/components/ErrorContainer";
import MovieList from "~/components/movie/MovieList";
import { badRequest } from "~/utils/request.server";
import { requireUser } from "~/utils/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  try {
    const token = await requireUser(request);
    const res = await axios.get("http://localhost:8080/api/movies", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data.code === 2000) {
      return res.data.data;
    }
    return badRequest({ message: res.data.message });
  } catch (error) {
    throw new Error("Something wrong");
  }
};

type Props = {};

const Movie = (props: Props) => {
  const data = useLoaderData<typeof loader>();

  return <MovieList movies={data} />;
};

export default Movie;

export function ErrorBoundary() {
  return <ErrorContainer>{"영화 조회에 실패했습니다."}</ErrorContainer>;
}
