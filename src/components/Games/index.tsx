import { buildGameUrl, displayImage } from "@/lib/helpers/common";
import useDebounceValue from "@/lib/hooks/useDebounceValue";
import { gameService } from "@/lib/services/game";
import { filterAtom } from "@/lib/stores";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Plus, Search } from "iconoir-react";
import { useAtom } from "jotai";
import Link from "next/link";
import { useState } from "react";
import Footer from "../Footer";
import Input from "../Input";
import Navbar from "../Navbar";
import Pagination from "../Pagination";
import Slider from "../Slider";
import Uzumaki from "../Uzumaki";
import Filter from "./Filter";

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
    ["games", filters, offset, debouncedSearch],
    async () =>
      gameService.get({
        ...(debouncedSearch.length >= 3 && {
          title: debouncedSearch,
        }),
        order: {
          ...filters,
        },
        limit: 24,
        offset,
      }),
    {
      keepPreviousData: true,
    }
  );

  return (
    <div className="flex flex-col gap-3 lg:max-w-5xl w-full px-5 lg:px-0 mb-auto">
      <h3 className="text-2xl font-medium">Advanced Search</h3>
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center gap-3 w-full">
          <Input
            placeholder="Search"
            icon={<Search />}
            iconAlign="left"
            onChange={(e) => setSearch(e.target.value)}
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
        {!isLoading && !games?.data.length && (
          <div className="flex flex-col items-center justify-center gap-2">
            <Search />
            <span className="font-medium text-base mx-auto">
              We searched everywhere but couldn{"'t"} find anything (T_T)
            </span>
          </div>
        )}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {games &&
            games.data.map((game) => (
              <div className="flex flex-col gap-2 group" key={game.id}>
                <div className="relative overflow-hidden">
                  <Link href={buildGameUrl(game)}>
                    <img
                      className="rounded-lg w-56 h-64 object-cover shadow-san group-hover:blur-[0.5px]"
                      src={displayImage(game.cover)}
                      alt={game.title}
                    />
                  </Link>
                  <div className="flex items-center justify-between absolute opacity-100 top-0 lg:opacity-0 lg:-top-8 group-hover:opacity-100 group-hover:top-0 transition-all ease-in-out w-full px-2 py-1 bg-gradient-to-b from-black/75 to-transparent rounded-t-lg">
                    <div className="inline-flex justify-center items-center text-xs w-6 h-6 bg-primary rounded-full cursor-pointer">
                      {game?.score ?? "?"}
                    </div>

                    <div
                      onClick={() => alert("alo")}
                      className="inline-flex justify-center items-center w-6 h-6 bg-accent border border-accent-light2 rounded-full cursor-pointer"
                    >
                      <Plus width="1.3em" />
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
        {!error && games && games.data.length > 0 && (
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