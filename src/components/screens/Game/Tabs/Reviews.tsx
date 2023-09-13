import Pagination from "@/components/Pagination";
import Uzumaki from "@/components/Uzumaki";
import { gameService } from "@/lib/services/game";
import { IGame, IReview } from "@/lib/types/game";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Search } from "iconoir-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReviewComponent from "../Review";

export default function Reviews({ game }: { game: IGame }) {
  const [offset, setOffset] = useState(1);

  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery(
    ["game_reviews", offset],
    async () =>
      gameService.getReviews(game.id, {
        limit: 6,
        offset,
				includes: ["user", "game"],
      }),
    {
      keepPreviousData: true,
    }
  );

  const router = useRouter();

  return (
    <div className="flex flex-col w-full mt-3">
      <div className="flex items-center gap-1 mb-3">
        <button type="button" onClick={() => router.back()}>
          <ArrowLeft />
        </button>
        <h4 className="text-xl font-medium">Back</h4>
      </div>

      <>
        {isLoading && <Uzumaki className="mx-auto" />}
        {error && (
          <span className="font-medium text-base mx-auto">
            Oh no! Something went wrong :(
          </span>
        )}
      </>
      {!isLoading && !reviews?.attributes.length && (
        <div className="flex flex-col items-center justify-center gap-2">
          <Search />
          <span className="font-medium text-base mx-auto">
            We searched everywhere but couldn{"'t"} find anything (T_T)
          </span>
        </div>
      )}

      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3">
        {reviews ? (
          <ReviewComponent reviews={reviews?.attributes} />
        ) : (
          <span>No reviews ಥ_ಥ</span>
        )}
      </div>
      {!error && reviews && reviews.attributes.length > 0 && (
        <Pagination
          total={reviews?.pagination.total as number}
          onPageClick={setOffset}
          perPage={6}
        />
      )}
    </div>
  );
}
