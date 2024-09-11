"use client";
import React, { useEffect, useState } from "react";
import { Fugaz_One } from "next/font/google";
import Calender from "./Calender";
import { useAuth } from "@/context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Login from "./Login";
import Loading from "./loading";
import Logout from "./Logout";
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

interface DataStructure {
  [year: string]: {
    [month: string]: {
      [day: string]: number; // Day contains a number representing the mood
    };
  };
}

interface AuthContextType {
  currentUser: any; // Replace with actual type of currentUser
  userDataObj: any; // Replace with actual type of userDataObj
  setUserDataObj: (data: any) => void;
  loading: boolean;
}

const Dashboard = () => {
  const { currentUser, userDataObj, setUserDataObj, loading } =
    useAuth() as AuthContextType;
  const [data, setData] = useState<DataStructure>({});
  const now = new Date();

  function countValues() {
    let total_number_of_days = 0;
    let sum_moods = 0;
    for (let year in data) {
      for (let month in data[year]) {
        for (let day in data[year][month]) {
          let days_mood = data[year][month][day];
          total_number_of_days++;
          sum_moods += days_mood;
        }
      }
    }
    return {
      num_days: total_number_of_days,
      average_mood: (
        Math.round((sum_moods / total_number_of_days) * 100) / 100
      ).toFixed(1),
    };
  }

  const statuses = {
    ...countValues(),
    time_remaining: `${23 - now.getHours()}H ${60 - now.getMinutes()}M`,
  };

  async function handleSetMood(mood: number) {
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    try {
      const newData = { ...userDataObj };
      if (!newData?.[year]) {
        newData[year] = {};
      }
      if (!newData?.[year]?.[month]) {
        newData[year][month] = {};
      }
      newData[year][month][day] = mood;

      // update the cureent state
      setData(newData);
      // update global state
      setUserDataObj(newData);
      // update firebase
      const docRef = doc(db, "users", currentUser.uid);
      const res = await setDoc(
        docRef,
        {
          [year]: {
            [month]: {
              [day]: mood,
            },
          },
        },
        { merge: true }
      );
    } catch (err) {
      console.log("Failed to set data: ", err);
    }
  }

  const moods = {
    "&*@#": "😭",
    Sad: "😢",
    Existing: "😶",
    Good: "😊",
    Amazing: "😍",
  };

  useEffect(() => {
    if (!currentUser || !userDataObj) {
      return;
    }
    setData(userDataObj);
  }, [currentUser, userDataObj]);

  if (loading) {
    return <Loading />;
  }
  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16 mx-4">
      <div className="grid grid-cols-3 bg-indigo-50 text-indigo-500 rounded-lg p-4 gap-4">
        {Object.keys(statuses).map((status, statusIndex) => {
          return (
            <div key={statusIndex} className="flex flex-col gap-1 sm:gap-2">
              <p className="font-medium capitalize text-xs sm:text-sm truncate">
                {status.replaceAll("_", " ")}
              </p>
              <p className={`${fugaz.className} text-base sm:text-lg truncate`}>
                {statuses[status as keyof typeof statuses]}
                {status === "num_days" && " 🔥"}
              </p>
            </div>
          );
        })}
      </div>
      <h4
        className={`text-5xl sm:text-6xl md:text-7xl text-center ${fugaz.className} leading-tight`}
      >
        How Are You <span className="textGradient">feeling</span> today?
      </h4>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {Object.keys(moods).map((mood, moodIndex) => {
          return (
            <button
              onClick={() => {
                const currentMoodValue = moodIndex + 1;
                handleSetMood(currentMoodValue);
              }}
              key={moodIndex}
              className={`${
                moodIndex === 4 && "col-span-2 sm:col-span-1 "
              } p-4 px-5 rounded-lg purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 text-center flex flex-col gap-2 items-center`}
            >
              <p className="text-4xl sm:text-5xl md:text-6xl">
                {moods[mood as keyof typeof moods]}
              </p>
              <p className={`${fugaz.className} text-indigo-500`}>{mood}</p>
            </button>
          );
        })}
      </div>
      <Calender completeData={data} handleSetMood={handleSetMood} />
    </div>
  );
};

export default Dashboard;
