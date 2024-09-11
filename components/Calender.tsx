"use client";
import React, { useState } from "react";
import { gradients, baseRating } from "@/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Fugaz_One } from "next/font/google";
const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400" });

const months = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sept",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};
const monthsArr = Object.keys(months);
const dayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function Calender(props: any) {
  const { demo, completeData, handleSetMood } = props;
  const now = new Date();
  const currMonth = now.getMonth();
  const [selectedMonth, setSelectedMonth] = useState(monthsArr[currMonth]);
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());

  const numericMonth = monthsArr.indexOf(selectedMonth);
  const data = completeData?.[selectedYear]?.[numericMonth] || {};

  function handleIncrementMonth(val: number) {
    // value +1 -1
    //  if we hit bounds of the months, then we can just adjust the year is displayed
    if (numericMonth + val < 0) {
      // set month value = 11 and decrement year
      setSelectedYear((curr) => curr - 1);
      setSelectedMonth(monthsArr[monthsArr.length - 1]);
    } else if (numericMonth + val > 11) {
      // set month val = 0 and increment the year
      setSelectedYear((curr) => curr + 1);
      setSelectedMonth(monthsArr[0]);
    } else {
      setSelectedMonth(monthsArr[numericMonth + val]);
    }
  }

  // const year = 2024;
  // const month = "September";
  const monthNow = new Date(selectedYear, monthsArr.indexOf(selectedMonth), 1); // returns (2023-11-30T23:00:00.000Z)
  const firstDayOfMonth = monthNow.getDay(); // returns index of day 0-6
  const daysInMonth = new Date(
    selectedYear,
    Object.keys(selectedMonth).indexOf(selectedMonth) + 1,
    0
  ).getDate();

  const daysToDisplay = firstDayOfMonth + daysInMonth;
  const numRows = Math.floor(daysToDisplay / 7) + (daysToDisplay % 7 ? 1 : 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-5 gap-4 ">
        <button
          onClick={() => handleIncrementMonth(-1)}
          className="text-center capitalize mr-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60"
        >
          <FontAwesomeIcon icon={faCircleChevronLeft} />
        </button>
        <p
          className={`text-center capitalize ${fugaz.className} textGradient whitespace-nowrap col-span-3 `}
        >
          {selectedMonth}, {selectedYear}
        </p>
        <button
          onClick={() => handleIncrementMonth(1)}
          className="ml-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60"
        >
          <FontAwesomeIcon icon={faCircleChevronRight} />
        </button>
      </div>
      <div className="flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10">
        {[...Array(numRows).keys()].map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="grid grid-cols-7 gap-1">
              {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                let dayIndex =
                  rowIndex * 7 + dayOfWeekIndex - (firstDayOfMonth - 1);

                let dayDisplay =
                  dayIndex > daysInMonth
                    ? false
                    : row === 0 && dayOfWeekIndex < firstDayOfMonth
                    ? false
                    : true;

                let isToday = dayIndex === now.getDate();

                if (!dayDisplay) {
                  return <div className="bg-white" key={dayOfWeekIndex}></div>;
                }

                let color = demo
                  ? gradients.indigo[baseRating[dayIndex.toString()]]
                  : dayIndex in data
                  ? gradients.indigo[data[dayIndex]]
                  : "white";

                return (
                  <div
                    style={{ background: color }}
                    className={`text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ${
                      isToday ? "border-indigo-400" : "border-indigo-100"
                    } ${color === "white" ? "text-indigo-400" : "text-white"}`}
                    key={dayOfWeekIndex}
                  >
                    <p>{dayIndex}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
