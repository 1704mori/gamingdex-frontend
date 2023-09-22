import { displayImage, humanize } from "@/lib/helpers/common";
import { IGameCharacter } from "@/lib/types/game";

export default function Character({
  characters,
}: {
  characters: IGameCharacter[];
}) {
  return (
    <>
      {characters.slice(0, 5).
        // sort by role "main"
        sort((a, b) => {
          if (a.role === "main") return -1;
          if (b.role === "main") return 1;
          return 0;
        }).
        map((character) => (
          <div
            key={character.id}
            className="grid grid-cols-[max-content_minmax(0,_1fr)] items-center gap-1 bg-accent rounded-lg w-full"
          >
            <img
              className="w-12 h-16 rounded-lg rounded-r-none object-cover"
              src={displayImage(character.character.photo)}
              alt={character.character.name}
            />
            <div className="flex flex-col px-3 py-2">
              <span className="truncate font-medium">
                {character.character.name}
              </span>
              <span>{character.role ?? "No role"}</span>
            </div>
          </div>
        ))}
    </>
  );
}
