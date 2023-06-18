import React, { useState } from "react";
import { useNavigate } from "@remix-run/react";
import { isShowing } from "~/utils/dateTime";
import Button from "../Button";
import BadgeShow from "./BadgeShow";
import type { MovieData } from "./MovieListCard";
import ConfirmModal from "../ConfirmModal";

type Props = {
  movie: MovieData;
};

const MovieDetailCard = ({ movie }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const {
    movieId,
    title,
    posterImgUrl,
    director,
    actor,
    movieRated,
    genre,
    summary,
    runningTime,
    startDate,
    endDate,
  } = movie;

  function handleClickUpdate() {
    navigate(`/movie/update/${movieId}`);
  }

  return (
    <div className="relative w-full flex gap-1">
      <div className="absolute top-2 right-2">
        <BadgeShow status={isShowing(startDate, endDate)} />
      </div>
      <div className="w-96 h-64">
        <img
          className="w-full h-full object-cover"
          src={
            posterImgUrl ||
            "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
          }
          alt={title}
        />
      </div>
      <div className="p-2">
        <p className="py-2 font-semibold leading-6">{title}</p>
        <p className="py-2 text-sm leading-6">줄거리: {summary}</p>
        <p className="py-2 text-sm leading-6">
          감독: {director} / 출연: {actor}
        </p>
        <p className="py-2 text-sm leading-6">장르: {genre}</p>
        <p className="py-2 text-sm leading-6">관람가: {movieRated} </p>
        <p className="py-2 text-sm leading-6">상영시간: {runningTime} 분</p>
        <p className="py-2 text-sm leading-6">
          상영기간: {`${startDate.split("T")[0]} ~ ${endDate.split("T")[0]}`}{" "}
        </p>
        <div>
          <Button size="sm" onClick={handleClickUpdate}>
            수정
          </Button>
          <Button size="sm" bgColor="red" onClick={() => setShowModal(true)}>
            삭제
          </Button>
        </div>
      </div>
      {showModal && (
        <ConfirmModal
          title={"영화 삭제"}
          message={"삭제하면 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?"}
          onHide={() => setShowModal(false)}
          cancelMessage="취소"
          confirmMessage="삭제"
          formId="detail-form"
        />
      )}
    </div>
  );
};

export default MovieDetailCard;
