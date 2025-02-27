"use client";

import { UserDetailContext } from "@/context/userDetailContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { useSidebar } from "../ui/sidebar";
import { format, isToday, isYesterday, subDays, isAfter } from "date-fns";
import { ChatSkeletonCard } from "./ChatSkelenton";

function SidebarHistory() {
  const { userDetail } = useContext(UserDetailContext);
  const { toggleSidebar } = useSidebar();
  const [workplaceList, setWorkPlaceList] = useState([]);
  const convex = useConvex();

  useEffect(() => {
    if (userDetail) {
      GetAllWorkplace();
    }
  }, [userDetail]);

  const GetAllWorkplace = async () => {
    const result = await convex.query(api.workplace.GetAllWorkplace, {
      userId: userDetail?._id,
    });
    setWorkPlaceList(result);
  };

  // Function to group workplaces by date and sort them in descending order
  const groupWorkplaces = () => {
    const todayList = [];
    const yesterdayList = [];
    const previous7DaysList = [];
    const sevenDaysAgo = subDays(new Date(), 7);

    workplaceList.forEach((workplace) => {
      const createdAt = new Date(workplace._creationTime);
      if (isToday(createdAt)) {
        todayList.push(workplace);
      } else if (isYesterday(createdAt)) {
        yesterdayList.push(workplace);
      } else if (isAfter(createdAt, sevenDaysAgo)) {
        previous7DaysList.push(workplace);
      }
    });

    return {
      todayList: todayList.reverse(),
      yesterdayList: yesterdayList.reverse(),
      previous7DaysList: previous7DaysList.reverse(),
    };
  };

  const { todayList, yesterdayList, previous7DaysList } = groupWorkplaces();

  return (
    <>
      {!groupWorkplaces < 0 && <ChatSkeletonCard />}
      <div>
        {/* Today */}
        {todayList.length > 0 && (
          <div>
            <h3 className="text-white font-semibold mt-4">Today</h3>
            {todayList.map((workplace) => (
              <Link key={workplace._id} href={`/workplace/${workplace._id}`}>
                <h2
                  onClick={toggleSidebar}
                  className="text-zinc-400 mt-2 hover:text-white cursor-pointer truncate"
                >
                  {workplace?.messages[0]?.content}
                </h2>
              </Link>
            ))}
          </div>
        )}

        {/* Yesterday */}
        {yesterdayList.length > 0 && (
          <div>
            <h3 className="text-white font-semibold mt-4">Yesterday</h3>
            {yesterdayList.map((workplace) => (
              <Link key={workplace._id} href={`/workplace/${workplace._id}`}>
                <h2
                  onClick={toggleSidebar}
                  className="text-zinc-400 mt-2 hover:text-white cursor-pointer truncate"
                >
                  {workplace?.messages[0]?.content}
                </h2>
              </Link>
            ))}
          </div>
        )}

        {/* Previous 7 Days */}
        {previous7DaysList.length > 0 && (
          <div>
            <h3 className="text-white font-semibold mt-4">Previous 7 Days</h3>
            {previous7DaysList.map((workplace) => (
              <Link key={workplace._id} href={`/workplace/${workplace._id}`}>
                <h2
                  onClick={toggleSidebar}
                  className="text-zinc-400 mt-2 hover:text-white cursor-pointer truncate"
                >
                  {workplace?.messages[0]?.content}
                </h2>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SidebarHistory;
