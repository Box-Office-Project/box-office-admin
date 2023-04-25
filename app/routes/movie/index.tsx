import React from "react";
import MovieList from "~/components/movie/MovieList";
import { PageContainer } from "~/components/PageContainer";
import { SectionContainer } from "~/components/SectionContainer";

const Movie = () => {
  return (
    <PageContainer pageTitle="영화 조회">
      <SectionContainer>
        <MovieList />
      </SectionContainer>
    </PageContainer>
  );
};
export default Movie;
