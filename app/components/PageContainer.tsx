import React from "react";

type PageContainerProps = {
  pageTitle: string;
  children?: React.ReactNode;
};

export const PageContainer = ({ pageTitle, children }: PageContainerProps) => {
  return (
    <main className="p-4 w-full h-screen overflow-y-scroll">
      <h2 className="text-lg mb-2">{pageTitle}</h2>
      {children}
    </main>
  );
};
