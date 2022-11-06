import { IGame } from "@/lib/types/game";
import { Cancel } from "iconoir-react";
import Modal from "../Modal";

export default function ListModal({
  game,
  showListModal,
  closeListModal,
}: {
  game: IGame;
  showListModal: boolean;
  closeListModal: () => void;
}) {
  return (
    <Modal
      width="w-full lg:w-1/3"
      modalOpen={showListModal}
      handleClose={closeListModal}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Add {game.title} to your list</h3>
          <button onClick={closeListModal}>
            <Cancel />
          </button>
        </div>
      </div>
    </Modal>
  );
}
