import { Form } from "@remix-run/react";
import React from "react";
import CalendarModal from "~/components/calendar/CalendarModal";

type Props = {};

const Calendar = (props: Props) => {
  return (
    <div>
      index
      <Form id="movie-search-form" method="get"></Form>
      <Form id="calendar-manage-form" method="post"></Form>
      <CalendarModal
        title="캘린더"
        onHide={() => console.log("hide")}
        cancelMessage={"취소"}
        confirmMessage={"확인"}
        formId="calendar-manage-form"
      />
    </div>
  );
};

export default Calendar;
