import Input from "@/components/Input";
import Pagination from "@/components/Pagination";
import Uzumaki from "@/components/Uzumaki";
import useDebounceValue from "@/lib/hooks/useDebounceValue";
import { gameService } from "@/lib/services/game";
import { IGame, IReview } from "@/lib/types/game";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Search } from "iconoir-react";
import { useRouter } from "next/router";
import { useState } from "react";
import StaffComponent from "../Staff";

export default function Staff({ game }: { game: IGame }) {
  const [offset, setOffset] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounceValue(search, 500);

  const {
    data: staff,
    isLoading,
    error,
  } = useQuery(
    ["game_staff", offset, debouncedSearch],
    async () =>
      gameService.getStaff(game.id, {
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
      {!isLoading && !staff?.data.length && (
        <div className="flex flex-col items-center justify-center gap-2">
          <Search />
          <span className="font-medium text-base mx-auto">
            We searched everywhere but couldn{"'t"} find anything (T_T)
          </span>
        </div>
      )}

      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-3">
        {staff ? (
          <StaffComponent staff={staff?.data} />
        ) : (
          <span>No staff ಥ_ಥ</span>
        )}
      </div>
      {!error && staff && staff.data.length > 0 && (
        <Pagination
          total={staff?.pagination.total as number}
          onPageClick={setOffset}
          perPage={16}
        />
      )}
    </div>
  );
}
