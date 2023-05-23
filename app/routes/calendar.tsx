import { Outlet } from "@remix-run/react";
import React from "react";
import Navbar from "~/components/navbar/Navbar";
import { PageContainer } from "~/components/PageContainer";
import { SectionContainer } from "~/components/SectionContainer";

const Calendar = () => {
  return (
    <>
      <Navbar />
      <PageContainer pageTitle="상영 일정 관리">
        <SectionContainer>
          <Outlet />
        </SectionContainer>
      </PageContainer>
    </>
  );
};
export default Calendar;
