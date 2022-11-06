import { GetStaticPaths, GetStaticProps } from "next";
import { resolvePromise } from "../../lib/helpers/common";
import { gameService } from "../../lib/services/game";
import Game from "../../components/Game";
import { IGame } from "../../lib/types/game";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useQueries } from "@tanstack/react-query";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const id = String(ctx.params?.id?.[0]);

  const [game, gameErr] = await resolvePromise(
    gameService.getById(id, [
      "developers",
      "developers.developer",
      "publishers",
      "publishers.publisher",
      "genres",
      "genres.genre",
      "platforms",
      "platforms.platform",
    ])
  );

  if (gameErr) {
    return {
      props: { game: null },
    };
  }

  const [reviews, reviewsErr] = await resolvePromise(
    gameService.getReviews(id, {
      includes: ["user", "game"],
    })
  );

  if (!reviewsErr) {
    game.data.reviews = reviews.data;
  }

  const [characters, charactersErr] = await resolvePromise(
    gameService.getCharacters(id, {
      includes: ["character"],
    })
  );

  if (!charactersErr) {
    game.data.characters = characters.data;
  }

  const [staff, staffErr] = await resolvePromise(
    gameService.getStaff(id, {
      includes: ["people"],
    })
  );

  if (!staffErr) {
    game.data.staff = staff.data;
  }


  return {
    props: { game: game.data },
    revalidate: 100, // 3600
  };
};

export default function GamePage({ game }: { game: IGame }) {
  return <Game game={game} />;
}

// GamePage.getLayout = function getLayout(children: any) {
//   return (
//     <div className="flex flex-col mt-16 lg:mt-40">
//       <Navbar />
//       {children}
//       <Footer />
//     </div>
//   );
// };
