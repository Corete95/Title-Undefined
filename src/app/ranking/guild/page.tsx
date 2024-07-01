import React from "react";
import type { Metadata } from "next";
import GuildSelect from "./_component/GuildSelect";
import GuildList from "./_component/GuildList";

export const metadata: Metadata = {
  title: "메소야 랭킹 | Mesoya",
  description: "메소야 길드 랭킹 페이지",
};

const page = () => {
  return (
    <div className="max-w-1200 w-full mx-auto ">
      <div className="flex flex-wrap p-3 ">
        <div className="w-full">
          <GuildSelect />
          <GuildList />
        </div>
      </div>
    </div>
  );
};

export default page;
