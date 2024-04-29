import React from "react";
import TrackerBoard from "./_components/traker-board";
import { api } from "@/trpc/server";

const ProfileTrackerPage = async () => {
  const userInfo = await api.userDetails.getUserInfo();
  const userPillars = await api.userDetails.getUserPillars();

  return (
    <div className="h-full w-full p-4 pb-1 pr-0">
      <TrackerBoard userInfo={userInfo} userPillars={userPillars} />
    </div>
  );
};

export default ProfileTrackerPage;
