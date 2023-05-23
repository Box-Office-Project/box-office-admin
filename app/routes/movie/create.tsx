import type { ActionArgs } from "@remix-run/node";
import { unstable_createMemoryUploadHandler } from "@remix-run/node";
import {
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import axios from "axios";
import React from "react";
import Button from "~/components/Button";
import { ImageInput, Input } from "~/components/Input";
import { SectionContainer } from "~/components/SectionContainer";
import ValiadationErrorMessage from "~/components/ValiadationErrorMessage";
import { dateTimeParser } from "~/utils/dateTime";
import { badRequest } from "~/utils/request.server";
import { requireUser } from "~/utils/session.server";

export const action = async ({ request }: ActionArgs) => {
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
  const startDate = dateTimeParser(formData.get("startDate") as string);
  const endDate = dateTimeParser(formData.get("endDate") as string);
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

  try {
    const token = await requireUser(request);
    const res = await axios.post(
      "http://localhost:8080/api/movies",
      requestFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data.code === 2002) {
      return redirect("/movie");
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

type Props = {};

const MovieCreate = (props: Props) => {
  const actionData = useActionData<typeof action>();
  console.log({ actionData });
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
            defaultValue={"titltlel"}
            aria-invalid={Boolean(actionData?.formError)}
            aria-errormessage={
              actionData?.formError ? "Wrong title data" : undefined
            }
          />
          <Input
            id="summary"
            label="줄거리"
            placeholder="줄거리"
            defaultValue={actionData?.fields?.movieInfo?.summary || ""}
            aria-invalid={Boolean(actionData?.formError)}
            aria-errormessage={
              actionData?.formError ? "Wrong summary data" : undefined
            }
          />
          <Input
            id="director"
            label="감독"
            placeholder="감독"
            defaultValue={actionData?.fields?.movieInfo?.director || ""}
            aria-invalid={Boolean(actionData?.formError)}
            aria-errormessage={
              actionData?.formError ? "Wrong director data" : undefined
            }
          />
          <Input
            id="actor"
            label="출연"
            placeholder="출연"
            defaultValue={actionData?.fields?.movieInfo?.actor || ""}
            aria-invalid={Boolean(actionData?.formError)}
            aria-errormessage={
              actionData?.formError ? "Wrong actor data" : undefined
            }
          />
          <Input
            id="genre"
            label="장르"
            placeholder="장르"
            defaultValue={actionData?.fields?.movieInfo?.genre || ""}
            aria-invalid={Boolean(actionData?.formError)}
            aria-errormessage={
              actionData?.formError ? "Wrong genre data" : undefined
            }
          />
          {/* TODO: movieRated "ALL" | "R12" | "R15" | "R18" */}
          <Input
            id="movieRated"
            label="관람가"
            placeholder="관람가"
            defaultValue={actionData?.fields?.movieInfo?.movieRated || ""}
            aria-invalid={Boolean(actionData?.formError)}
            aria-errormessage={
              actionData?.formError ? "Wrong movie rated data" : undefined
            }
          />
          <Input
            id="runningTime"
            label="러닝타임"
            placeholder="러닝타임"
            type="number"
            defaultValue={actionData?.fields?.movieInfo?.runningTime || ""}
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
              type="datetime-local"
              defaultValue={actionData?.fields?.movieInfo?.startDate || ""}
              aria-invalid={Boolean(actionData?.formError)}
              aria-errormessage={
                actionData?.formError ? "Wrong start date data" : undefined
              }
            />
            <Input
              id="endDate"
              label="상영종료일"
              placeholder="상영종료일"
              type="datetime-local"
              defaultValue={actionData?.fields?.movieInfo?.endDate || ""}
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

export default MovieCreate;
