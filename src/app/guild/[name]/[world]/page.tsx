import React from "react";
import type { Metadata } from "next";
import GuildDetail from "./GuildDetail";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import {
  fetchGuildBasic,
  fetchGuildId,
  fetchGuildRanking,
} from "@/hooks/queries/useGuildBasicQuery";
import dayjs from "@/lib/dayjs-ssr";

export const metadata: Metadata = {
  title: "메소야 길드 | Mesoya",
  description: "메소야 길드 페이지",
};

const page = async ({ params }: any) => {
  const day = dayjs().format("YYYY-MM-DD");
  const queryClient = new QueryClient();

  const guildId = await queryClient.fetchQuery({
    queryKey: ["guild-id", params.name],
    queryFn: () => fetchGuildId(params.name, params.world),
  });

  if (guildId?.oguild_id) {
    await queryClient.fetchQuery({
      queryKey: ["guild-basic", guildId?.oguild_id],
      queryFn: () => fetchGuildBasic(guildId?.oguild_id),
    });
    await queryClient.fetchQuery({
      queryKey: ["guild-ranking", guildId?.oguild_id],
      queryFn: () => fetchGuildRanking(day, params.name, params.world, [0, 2]),
    });
  }

  const dehydratedState = dehydrate(queryClient);
  return (
    <div>
      <HydrationBoundary state={dehydratedState}>
        <GuildDetail params={params} />
      </HydrationBoundary>
    </div>
  );
};

export default page;
