import React from "react";
import { Navbar } from "~/components/navbar/Navbar";

type HomeProps = {};

export default function Home({}: HomeProps) {
  return (
    <div>
      <Navbar />
    </div>
  );
}
