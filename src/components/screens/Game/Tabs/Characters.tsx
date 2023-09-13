import Input from "@/components/Input";
import Pagination from "@/components/Pagination";
import Uzumaki from "@/components/Uzumaki";
import useDebounceValue from "@/lib/hooks/useDebounceValue";
import { gameService } from "@/lib/services/game";
import { IGame, IReview } from "@/lib/types/game";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Search } from "iconoir-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CharacterComponent from "../Character";

export default function Characters({ game }: { game: IGame }) {
  const [offset, setOffset] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounceValue(search, 500);

  const {
    data: characters,
    isLoading,
    error,
  } = useQuery(
    ["game_characters", offset, debouncedSearch],
    async () =>
      gameService.getCharacters(game.id, {
        limit: 16,
        ...(debouncedSearch.length >= 2 && {
          search: debouncedSearch,
        }),
        offset,
      }),
    {
      keepPreviousData: true,
    }
  );

  const router = useRouter();

  return (
    <div className="flex flex-col w-full mt-3">
      <div className="flex flex-col gap-3 mb-3">
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => router.back()}>
            <ArrowLeft />
          </button>
          <h4 className="text-xl font-medium">Back</h4>
        </div>

        <Input
          fit={false}
          className="w-72"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <>
        {isLoading && <Uzumaki className="mx-auto" />}
        {error && (
          <span className="font-medium text-base mx-auto">
            Oh no! Something went wrong :(
          </span>
        )}
      </>
      {!isLoading && !characters?.attributes.length && (
        <div className="flex flex-col items-center justify-center gap-2">
          <Search />
          <span className="font-medium text-base mx-auto">
            We searched everywhere but couldn{"'t"} find anything (T_T)
          </span>
        </div>
      )}

      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-3">
        {characters ? (
          <CharacterComponent characters={characters?.attributes} />
        ) : (
          <span>No characters ಥ_ಥ</span>
        )}
      </div>
      {!error && characters && characters.attributes.length > 0 && (
        <Pagination
          total={characters?.pagination.total as number}
          onPageClick={setOffset}
          perPage={16}
        />
      )}
    </div>
  );
}
