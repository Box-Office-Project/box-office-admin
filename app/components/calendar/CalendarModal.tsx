import React from "react";
import { Input } from "../Input";

type Props = {
  message?: string;
  onHide: () => void;
  onConfirm?: () => void;
  confirmMessage: string;
  cancelMessage: string;
  title: string;
  formId: string;
};

const CalendarModal = (props: Props) => {
  const {
    message,
    onHide,
    confirmMessage,
    cancelMessage,
    title,
    formId,
    onConfirm,
  } = props;
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div> */}
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    상영 일정
                  </h3>
                  <div className="my-2">
                    <p className="text-sm text-gray-500">상영 일정 소제목</p>
                  </div>
                  <div className="flex flex-col gap-4 text-sm">
                    <Input
                      label="영화제목"
                      type="search"
                      id="title"
                      name="q"
                      form={"movie-search-form"}
                      required
                      aria-required
                    />
                    <Input
                      label="날짜"
                      type="date"
                      id="date"
                      form={formId}
                      required
                      aria-required
                    />
                    <Input
                      label="상영관"
                      id="theater"
                      form={formId}
                      required
                      aria-required
                    />
                    <Input
                      label="상영시작시각"
                      type="time"
                      id="start-time"
                      form={formId}
                      min="08:00"
                      max="23:59"
                      required
                      aria-required
                    />
                    <Input
                      label="상영종료시각"
                      type="time"
                      id="end-time"
                      form={formId}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                form={formId}
                onClick={onConfirm}
              >
                {confirmMessage}
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={onHide}
              >
                {cancelMessage}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
