"use client";
import { buildGameUrl, displayImage } from "@/lib/helpers/common";
import useDebounceValue from "@/lib/hooks/useDebounceValue";
import { gameService } from "@/lib/services/game";
import { filterAtom } from "@/lib/stores";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Plus, Search } from "lucide-react";
import { useAtom } from "jotai";
import Link from "next/link";
import { useEffect, useState } from "react";
import Filter from "./Filter";
import Uzumaki from "@/components/Uzumaki";
import Pagination from "@/components/Pagination";
import Input from "@/components/Input";

export default function Games() {
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(1);
  const [filters] = useAtom(filterAtom);

  const debouncedSearch = useDebounceValue(search, 500);

  const {
    data: games,
    isLoading,
    error,
  } = useQuery(
    ["games", filters?.sort, offset, debouncedSearch],
    async () =>
      gameService.get({
        ...(debouncedSearch.length >= 3 && {
          title: debouncedSearch,
        }),
        order: {
          ...filters.sort,
        },
        limit: 25,
        offset,
      }),
    {
      keepPreviousData: true,
    }
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setOffset(1);
  };

  return (
    <div className="flex flex-col gap-3 lg:max-w-5xl w-full px-5 mb-auto mt-4 lg:mt-0">
      <h3 className="text-2xl font-medium">Advanced Search</h3>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center gap-3 w-full">
          <Input
            autoFocus
            placeholder="Search"
            icon={<Search />}
            iconAlign="left"
            onChange={handleSearch}
          />
          <Filter />
        </div>

        <>
          {isLoading && <Uzumaki className="mx-auto" />}
          {error && (
            <span className="font-medium text-base mx-auto">
              Oh no! Something went wrong :(
            </span>
          )}
        </>
        {!isLoading && !games?.attributes.length && (
          <div className="flex flex-col items-center justify-center gap-2">
            <Search />
            <span className="font-medium text-base mx-auto">
              We searched everywhere but couldn{"'t"} find anything (T_T)
            </span>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {games &&
            games.attributes.map((game) => (
              <div className="flex flex-col gap-2 group" key={game.id}>
                <div className="relative overflow-hidden">
                  <Link href={buildGameUrl(game)}>
                    <img
                      className="rounded-lg w-full h-64 lg:w-56 object-cover shadow-san group-hover:blur-[0.5px]"
                      src={displayImage(game.cover)}
                      alt={game.title}
                    />
                  </Link>
                  <div className="flex items-start justify-between absolute opacity-100 top-0 lg:opacity-0 lg:-top-8 group-hover:opacity-100 group-hover:top-0 transition-all ease-in-out w-full p-2 bg-transparent bg-gradient-to-t from-transparent to-black to-80% rounded-t-md">
                    <div className="inline-flex justify-center items-center text-xs w-6 h-6 bg-primary rounded-full cursor-pointer">
                      {game?.score ?? "?"}
                    </div>

                    <div
                      // onClick={() => alert("alo")}
                      className="inline-flex justify-center items-center w-6 h-6 bg-accent border border-accent3 rounded-full cursor-pointer"
                    >
                      <Plus width="1em" />
                    </div>
                  </div>
                </div>
                <Link className="flex flex-col" href={buildGameUrl(game)}>
                  <h4
                    className="text-base font-semibold truncate hover:underline"
                    title={game.title}
                  >
                    {game.title}
                  </h4>
                  <h5 className="text-sm truncate">
                    {game.releaseDate
                      ? dayjs(game.releaseDate).format("YYYY")
                      : "Unknown date"}
                  </h5>
                </Link>
              </div>
            ))}
        </div>
        {!error && games && games.attributes.length > 0 && (
          <Pagination
            total={games?.pagination.total as number}
            onPageClick={setOffset}
            perPage={24}
          />
        )}
      </div>
    </div>
  );
}
