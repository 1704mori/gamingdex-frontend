import { classes } from "@/lib/helpers/common";
import useDebounceValue from "@/lib/hooks/useDebounceValue";
import { listService } from "@/lib/services/list";
import { IGame } from "@/lib/types/game";
import { EListType } from "@/lib/types/list";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useState } from "react";
import Button from "../../Button";
import Input from "../../Input";
import Modal from "../../Modal";
import Uzumaki from "../../Uzumaki";

export default function ListModal({
  game,
  showListModal,
  closeListModal,
}: {
  game: IGame;
  showListModal: boolean;
  closeListModal: () => void;
}) {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounceValue(search, 500);

  const {
    data: lists,
    isLoading,
    error,
  } = useQuery(["user_lists", debouncedSearch], async () => listService.list());

  return (
    <Modal
      width="w-full lg:w-1/3"
      modalOpen={showListModal}
      handleClose={closeListModal}
    >
      <div className="flex items-start flex-col gap-3 max-h-[875px] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Add {game.title} to your list</h3>

          <button onClick={closeListModal}>
            <X />
          </button>
        </div>

        <>
          {isLoading && <Uzumaki className="mx-auto" />}
          {error && (
            <span className="font-medium text-base mx-auto">
              Oh no! Something went wrong :(
            </span>
          )}
        </>
        {!isLoading && !error && !lists?.attributes.length && (
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="font-medium text-base mx-auto">
              You don{"'"}t have any lists yet
            </span>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {lists &&
            lists.attributes.map((list) => (
              <div key={list.id} className="flex items-center gap-2">
                <input type="checkbox" className="hover:cursor-pointer" />
                <div className="flex items-center gap-1">
                  <span>{list.title}</span>
                  <span
                    className={classes(
                      "text-xs p-1 rounded-lg",
                      list.type === EListType.PRIVATE
                        ? "text-status-red border border-status-red"
                        : "text-primary border border-primary"
                    )}
                  >
                    {list.type}
                  </span>
                </div>
              </div>
            ))}
        </div>

        <div className="flex max-md:flex-col-reverse items-center gap-3">
          <Button color="accent" size="small" fit>
            Create new list
          </Button>
          {/* <Input
            placeholder="Search for a list"
            className="md:!h-7"
            fit={false}
            onChange={(e) => setSearch(e.target.value)}
          /> */}
        </div>

        <div className="flex items-center self-end gap-3">
          <Button color="accent" onClick={closeListModal}>
            X
          </Button>
          <Button>Save</Button>
        </div>
      </div>
    </Modal>
  );
}
