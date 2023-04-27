import React from "react";
import ErrorContainer from "~/components/ErrorContainer";
import MovieList from "~/components/movie/MovieList";

type Props = {};

const index = (props: Props) => {
  return <MovieList />;
};

export default index;

export function ErrorBoundary() {
  return <ErrorContainer>{"영화 조회에 실패했습니다."}</ErrorContainer>;
}
