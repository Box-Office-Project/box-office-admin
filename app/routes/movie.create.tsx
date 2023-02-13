import React from "react";
import { TextInput } from "~/components/Input";
import { PageContainer } from "~/components/PageContainer";
import { SectionContainer } from "~/components/SectionContainer";

type Props = {};

const MovieCreate = (props: Props) => {
  return (
    <PageContainer pageTitle="영화 추가">
      <SectionContainer>
        <form className="grid gap-4 grid-cols-2">
          <TextInput id="title" label="영화 제목" placeholder="영화 제목" />
          <TextInput id="director" label="감독" placeholder="감독" />
          <TextInput id="star" label="출연" placeholder="출연" />
          <TextInput id="genre" label="장르" placeholder="장르" />
          <TextInput id="opening-date" label="개봉일" placeholder="개봉일" />
          <TextInput id="rated" label="관람가" placeholder="관람가" />
          <TextInput
            id="running-time"
            label="러닝타임"
            placeholder="러닝타임"
          />
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              id="start-date"
              label="상영시작일"
              placeholder="상영시작일"
            />
            <TextInput
              id="end-date"
              label="상영종료일"
              placeholder="상영종료일"
            />
          </div>
        </form>
      </SectionContainer>
    </PageContainer>
  );
};

export default MovieCreate;
