import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import axios from "axios";
import React from "react";
import { useLoaderData, useParams } from "@remix-run/react";
import ErrorContainer from "~/components/ErrorContainer";
import { badRequest } from "~/utils/request.server";
import { requireUser } from "~/utils/session.server";
import MovieDetailCard from "~/components/movie/MovieDetailCard";

export const loader = async ({ request, params }: LoaderArgs) => {
  const { movieId } = params;
  try {
    const token = await requireUser(request);
    const res = await axios.get(`http://localhost:8080/api/movies/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.code === 2001) {
      return json(res.data.data);
    }

    return badRequest(res.data.message);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data.code === 3003) {
        throw new Response(`Movie with "Id: ${movieId}" not exists.`, {
          status: 404,
        });
      }
    }
    throw Error(`Failed to retrieve movie with "id: ${movieId}"`);
  }
};

export const action = async ({ request, params }: ActionArgs) => {
  const { movieId } = params;
  const token = await requireUser(request);
  const res = await axios.delete(
    `http://localhost:8080/api/movies/${movieId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.data.code === 2004) {
    return redirect("/movie");
  }
  throw Error("Delete failed");
};

type Props = {};

const MovieDetail = (props: Props) => {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="h-full">
      <form id="detail-form" method="post"></form>
      <MovieDetailCard movie={data} />
    </div>
  );
};

export default MovieDetail;

export function ErrorBoundary() {
  const { movieId } = useParams();

  return (
    <ErrorContainer>{`영화 조회에 실패했습니다 id: ${movieId}`}</ErrorContainer>
  );
}

export function CatchBoundary() {
  const { movieId } = useParams();

  return (
    <ErrorContainer>{`영화 조회에 실패했습니다 id: ${movieId}`}</ErrorContainer>
  );
}
