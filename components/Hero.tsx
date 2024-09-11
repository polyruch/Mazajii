import React, { useContext } from "react";
import { Fugaz_One } from "next/font/google";
const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400" });
import Button from "./Button";
import Calender from "./Calender";
import Link from "next/link";
import CallToAction from "./CallToAction";

export default function Hero() {
  return (
    <div className="py-4 md:py-10 flex flex-col gap-8 sm:gap-10 px-5">
      <h1
        className={`${fugaz.className} text-5xl sm:text-6xl md:text-7xl text-center`}
      >
        <span className="textGradient">Mazaji</span> helps you track your{" "}
        <span className="textGradient">daily</span> mood!
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[600px]">
        Create your mood record and see how you feel on{" "}
        <span className="font-semibold">every day of every year.</span>
      </p>

      <CallToAction />
      <Calender demo />
    </div>
  );
}
