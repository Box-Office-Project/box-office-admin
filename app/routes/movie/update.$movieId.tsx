import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { unstable_createMemoryUploadHandler } from "@remix-run/node";
import {
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import axios from "axios";
import React from "react";
import Button from "~/components/Button";
import type { Option } from "~/components/Input";
import { ImageInput, Input, Select } from "~/components/Input";
import { SectionContainer } from "~/components/SectionContainer";
import ValiadationErrorMessage from "~/components/ValiadationErrorMessage";
import type { MovieRate } from "~/type";
import { dateTimeParser } from "~/utils/dateTime";
import { badRequest } from "~/utils/request.server";
import { requireUser } from "~/utils/session.server";

export const action = async ({ request, params }: ActionArgs) => {
  const { movieId } = params;
  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      maxPartSize: 5000000,
      file: ({ filename }) => filename,
    }),
    unstable_createMemoryUploadHandler()
  );

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );
  // const formData = await request.formData();
  const title = formData.get("title");
  const summary = formData.get("summary");
  const director = formData.get("director");
  const actor = formData.get("actor");
  const movieRated = formData.get("movieRated");
  const genre = formData.get("genre");
  const runningTime = formData.get("runningTime");
  const startDate = `${formData.get("startDate")} 00:00:00`;
  const endDate = `${formData.get("endDate")} 23:59:59`;
  const posterImg = formData.get("posterImg");

  // TODO: form data validation

  const movieInfo = {
    title,
    summary,
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
    posterImg,
  };

  const requestFormData = new FormData();

  requestFormData.append(
    "movieInfo",
    new Blob([JSON.stringify(movieInfo)], { type: "application/json" })
  );
  requestFormData.append(
    "posterImg",
    // new Blob([JSON.stringify(posterImg)], { type: "appliction/json" })
    ""
  );
  debugger;

  try {
    const token = await requireUser(request);
    const res = await axios.put(
      `http://localhost:8080/api/movies/${movieId}`,
      requestFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data.code === 2003) {
      return redirect(`/movie/${movieId}`);
    }
    return badRequest({
      fields,
      formError: "Create failed",
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data.message);
    }
    return badRequest({
      fields,
      formError: "Something unexpected",
    });
  }
};

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

type Props = {};

const MovieUpdate = (props: Props) => {
  const actionData = useActionData<typeof action>();
  const data = useLoaderData<typeof loader>();
  const movieRatedOptions: Option<MovieRate>[] = [
    { value: "ALL", text: "전체" },
    { value: "R12", text: "12세" },
    { value: "R15", text: "15세" },
    { value: "R18", text: "18세" },
  ];
  return (
    <SectionContainer>
      <Form
        className="grid gap-4 grid-cols-2"
        method="post"
        encType="multipart/form-data"
      >
        <div className="grid gap-2">
          <Input
            id="title"
            label="제목"
            placeholder="제목"
            defaultValue={data.title}
            aria-invalid={Boolean(actionData?.formError)}
            aria-errormessage={
              actionData?.formError ? "Wrong title data" : undefined
            }
          />
          <Input
            id="summary"
            label="줄거리"
            placeholder="줄거리"
            defaultValue={data.summary}
            aria-invalid={Boolean(actionData?.formError)}
            aria-errormessage={
              actionData?.formError ? "Wrong summary data" : undefined
            }
          />
          <Input
            id="director"
            label="감독"
            placeholder="감독"
            defaultValue={data.director}
            aria-invalid={Boolean(actionData?.formError)}
            aria-errormessage={
              actionData?.formError ? "Wrong director data" : undefined
            }
          />
          <Input
            id="actor"
            label="출연"
            placeholder="출연"
            defaultValue={data.actor}
            aria-invalid={Boolean(actionData?.formError)}
            aria-errormessage={
              actionData?.formError ? "Wrong actor data" : undefined
            }
          />
          <Input
            id="genre"
            label="장르"
            placeholder="장르"
            defaultValue={data.genre}
            aria-invalid={Boolean(actionData?.formError)}
            aria-errormessage={
              actionData?.formError ? "Wrong genre data" : undefined
            }
          />
          {/* <Input
            id="movieRated"
            label="관람가"
            placeholder="관람가"
            defaultValue={data.movieRated}
            aria-invalid={Boolean(actionData?.formError)}
            aria-errormessage={
              actionData?.formError ? "Wrong movie rated data" : undefined
            }
          /> */}
          <Select
            id="movieRated"
            name="movieRated"
            options={movieRatedOptions}
            label="관람가"
            value={data.movieRated}
            aria-invalid={Boolean(actionData?.formError)}
            aria-errormessage={
              actionData?.formError ? "Wrong movie rated data" : undefined
            }
            required
            aria-required
          />
          <Input
            id="runningTime"
            label="러닝타임"
            placeholder="러닝타임"
            type="number"
            defaultValue={data.runningTime}
            aria-invalid={Boolean(actionData?.formError)}
            aria-errormessage={
              actionData?.formError ? "Wrong running time data" : undefined
            }
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              id="startDate"
              label="상영시작일"
              placeholder="상영시작일"
              type="date"
              defaultValue={data.startDate.split("T")[0]}
              aria-invalid={Boolean(actionData?.formError)}
              aria-errormessage={
                actionData?.formError ? "Wrong start date data" : undefined
              }
            />
            <Input
              id="endDate"
              label="상영종료일"
              placeholder="상영종료일"
              type="date"
              defaultValue={data.endDate.split("T")[0]}
              aria-invalid={Boolean(actionData?.formError)}
              aria-errormessage={
                actionData?.formError ? "Wrong end date data" : undefined
              }
            />
          </div>
        </div>
        <ImageInput id="posterImg" label="포스터" placeholder="포스터" />
        <div></div>
        <div className="flex flex-row-reverse">
          {actionData?.formError ? (
            <ValiadationErrorMessage message={actionData?.formError} />
          ) : null}
          <Button size="md" type="submit">
            제출
          </Button>
        </div>
      </Form>
    </SectionContainer>
  );
};

export default MovieUpdate;
