import React from "react";
import Button from "~/components/Button";
import { ImageInput, TextInput } from "~/components/Input";
import { PageContainer } from "~/components/PageContainer";
import { SectionContainer } from "~/components/SectionContainer";

type Props = {};

const MovieCreate = (props: Props) => {
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(e);
  };
  return (
    <SectionContainer>
      <form className="grid gap-4 grid-cols-2">
        <div className="grid gap-2">
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
        </div>
        <ImageInput id="poster-image" label="포스터" placeholder="포스터" />
        <div></div>
        <div className="flex flex-row-reverse">
          <Button size="md" type="submit" onClick={onSubmit}>
            제출
          </Button>
        </div>
      </form>
    </SectionContainer>
  );
};

export default MovieCreate;
