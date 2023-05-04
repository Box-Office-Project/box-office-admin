import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import axios from "axios";
import React from "react";
import Button from "~/components/Button";
import { ImageInput, Input } from "~/components/Input";
import { SectionContainer } from "~/components/SectionContainer";
import ValiadationErrorMessage from "~/components/ValiadationErrorMessage";
import { badRequest } from "~/utils/request.server";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const director = formData.get("director");
  const actor = formData.get("actor");
  const movieRated = formData.get("movieRated");
  const genre = formData.get("genre");
  const runningTime = formData.get("runningTime");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const posterImage = formData.get("posterImage");

  // TODO: form data validation

  const movieInfo = {
    title,
    director,
    actor,
    movieRated,
    genre,
    runningTime,
    startDate,
    endDate,
  };
  const fields = {
    movieInfo,
    posterImage,
  };
  console.log({ fields });

  try {
    const res = axios.post("http://localhost:8080/api/movies", fields);
    if ((await res).data.code === 2002) {
      return redirect("/movie");
    }
    return badRequest({
      fields,
      formError: "Create failed",
    });
  } catch (error) {
    return badRequest({
      formError: "Somethin unexpected",
    });
  }
};

type Props = {};

const MovieCreate = (props: Props) => {
  const actionData = useActionData<typeof action>();
  return (
    <SectionContainer>
      <form
        className="grid gap-4 grid-cols-2"
        method="post"
        encType="multipart/form-data"
      >
        <div className="grid gap-2">
          <Input id="title" label="영화 제목" placeholder="영화 제목" />
          <Input id="director" label="감독" placeholder="감독" />
          <Input id="actor" label="출연" placeholder="출연" />
          <Input id="genre" label="장르" placeholder="장르" />
          <Input id="opening-date" label="개봉일" placeholder="개봉일" />
          <Input id="movieRated" label="관람가" placeholder="관람가" />
          <Input
            id="runningTime"
            label="러닝타임"
            placeholder="러닝타임"
            type="number"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="startDate"
              label="상영시작일"
              placeholder="상영시작일"
              type="date"
            />
            <Input
              id="endDate"
              label="상영종료일"
              placeholder="상영종료일"
              type="date"
            />
          </div>
        </div>
        <ImageInput id="posterImage" label="포스터" placeholder="포스터" />
        <div></div>
        <div className="flex flex-row-reverse">
          {actionData?.formError ? (
            <ValiadationErrorMessage message={actionData?.formError} />
          ) : null}
          <Button size="md" type="submit">
            제출
          </Button>
        </div>
      </form>
    </SectionContainer>
  );
};

export default MovieCreate;
