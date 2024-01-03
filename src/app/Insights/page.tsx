import React from "react";
import Statistics from "./Statistcs";
import RoundStats from "./RoundStats";
import Image from "next/image";
import { faker } from "@faker-js/faker";

type Props = {};

const Insight = (props: Props) => {
  return (
    <div className=" w-[700px] h-auto mx-auto flex items-center ">
      <RoundStats />
    </div>
  );
};

export default Insight;
