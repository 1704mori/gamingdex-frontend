import { GetStaticPaths, GetStaticProps } from "next";
import { resolvePromise } from "../../../../lib/helpers/common";
import { gameService } from "../../../../lib/services/game";
import Game from "../../../../components/screens/Game";
import { IGame } from "../../../../lib/types/game";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import { useQueries } from "@tanstack/react-query";

// export const getStaticPaths: GetStaticPaths = async () => {
//   return {
//     paths: [], //indicates that no page needs be created at build time
//     fallback: "blocking", //indicates the type of fallback
//   };
// };

// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const id = String(ctx.params?.id?.[0]);

//   const [game, gameErr] = await resolvePromise(
//     gameService.getById(id, [
//       "developers",
//       "developers.developer",
//       "publishers",
//       "publishers.publisher",
//       "genres",
//       "genres.genre",
//       "platforms",
//       "platforms.platform",
//     ])
//   );

//   if (gameErr) {
//     return {
//       props: { game: null },
//     };
//   }

//   const [reviews, reviewsErr] = await resolvePromise(
//     gameService.getReviews(id, {
//       includes: ["user", "game"],
//     })
//   );

//   if (!reviewsErr) {
//     data.reviews = reviews.data;
//   }

//   const [characters, charactersErr] = await resolvePromise(
//     gameService.getCharacters(id, {
//       includes: ["character"],
//     })
//   );

//   if (!charactersErr) {
//     data.characters = characters.data;
//   }

//   const [staff, staffErr] = await resolvePromise(
//     gameService.getStaff(id, {
//       includes: ["people"],
//     })
//   );

//   if (!staffErr) {
//     data.staff = staff.data;
//   }

//   console.log(game)

//   return {
//     props: { game: data },
//     revalidate: 100, // 3600
//   };
// };

export const revalidate = 100;

export default async function GamePage({ params }: { params: { id: string[] } }) {
  const id = String(params?.id?.[0]);

  const [data, gameErr] = await resolvePromise(
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

  const game = data?.attributes as IGame;

  const [reviews, reviewsErr] = await resolvePromise(
    gameService.getReviews(id, {
      includes: ["user", "game"],
    })
  );

  if (!reviewsErr) {
    game.reviews = reviews?.attributes;
  }

  const [characters, charactersErr] = await resolvePromise(
    gameService.getCharacters(id, {
      includes: ["character"],
    })
  );

  if (!charactersErr) {
    game.characters = characters?.attributes;
  }

  const [staff, staffErr] = await resolvePromise(
    gameService.getStaff(id, {
      includes: ["people"],
    })
  );

  if (!staffErr) {
    game.staff = staff?.attributes;
  }

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
