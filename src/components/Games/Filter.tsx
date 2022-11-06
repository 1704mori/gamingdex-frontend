import { AnimatePresence, motion, useCycle } from "framer-motion";
import { ViewGrid, List, Filter as FilterIcon, ArrowDown } from "iconoir-react";
import Button from "../Button";
import { Select, SelectItem } from "../Select";
import Tippy from "@tippyjs/react";
import { useAtom } from "jotai";
import { filterAtom } from "@/lib/stores";
import { useRef, useState } from "react";
import useClickOutside from "@/lib/hooks/useClickOutside";

export default function Filter() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useAtom(filterAtom);
  const filterRef = useRef<HTMLDivElement>(null);

  useClickOutside(filterRef, () => setShowFilters(false));

  return (
    <div className="relative z-50 select-none" ref={filterRef}>
      <Button
        color="transparent"
        icon={<FilterIcon />}
        onClick={() => setShowFilters(!showFilters)}
        className="relative"
      >
        Filter
        {filters && Object.values(filters).filter((f) => !!f).length > 0 && (
          <span className="badge">
            {Object.values(filters).filter((f) => !!f).length}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 right-0 flex flex-col gap-3 bg-gray-200 dark:bg-gray-500 rounded-lg px-5 py-3 min-w-[250px] shadow-ni"
          >
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <h3 className="whitespace-nowrap font-semibold">
                  Display Options
                </h3>
                <h3
                  className="whitespace-nowrap hover:underline cursor-pointer"
                  onClick={() => setFilters(undefined as any)}
                >
                  Reset All
                </h3>
              </div>

              <div className="flex gap-2">
                <Tippy
                  placement="bottom"
                  content="Grid"
                  className="!bg-primary [&>.tippy-arrow]:!text-primary"
                >
                  <Button
                    icon={<ViewGrid />}
                    rounded
                    color={
                      filters?.display === "grid" ? "primary" : "secondary"
                    }
                    onClick={() => {
                      if (filters?.display === "grid") {
                        setFilters({ ...filters, display: null });
                        return;
                      }
                      setFilters({ ...filters, display: "grid" });
                    }}
                  />
                </Tippy>
                <Tippy
                  placement="bottom"
                  content="List"
                  className="!bg-primary [&>.tippy-arrow]:!text-primary"
                >
                  <Button
                    icon={<List />}
                    rounded
                    color={
                      filters?.display === "list" ? "primary" : "secondary"
                    }
                    onClick={() => {
                      if (filters?.display === "list") {
                        setFilters({ ...filters, display: null });
                        return;
                      }
                      setFilters({ ...filters, display: "list" });
                    }}
                  />
                </Tippy>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="whitespace-nowrap font-semibold">Sort By</h3>

              <div className="flex flex-col gap-2">
                <Select
                  onSelect={(value) => {
                    setFilters({
                      ...filters,
                      [value.split("_")[0]]: value.split("_")[1],
                    });
                    setShowFilters(false);
                  }}
                  clean={!filters}
                >
                  <SelectItem value="title_asc">Title A-Z</SelectItem>
                  <SelectItem value="title_desc">Title Z-A</SelectItem>
                  <SelectItem value="score_asc">Score Ascending</SelectItem>
                  <SelectItem value="score_desc">Score Descending</SelectItem>
                  <SelectItem value="recently_added">Recently Added</SelectItem>
                </Select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
