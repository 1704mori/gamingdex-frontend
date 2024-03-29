import { AnimatePresence, motion, useCycle } from "framer-motion";
import { Grid, List, Filter as FilterIcon, ArrowDown } from "lucide-react";
import Button from "../../Button";
import { Select, SelectItem } from "../../Select";
import Tippy from "@tippyjs/react";
import { useAtom } from "jotai";
import { filterAtom } from "@/lib/stores";
import { useRef, useState } from "react";
import useClickOutside from "@/lib/hooks/useClickOutside";
import { classes } from "@/lib/helpers/common";

export default function Filter() {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useAtom(filterAtom);
  const filterRef = useRef<HTMLDivElement>(null);

  useClickOutside(filterRef, () => setShowFilters(false));

  return (
    <div className="relative z-10 select-none" ref={filterRef}>
      <Button
        onClick={() => setShowFilters(!showFilters)}
        color="accent"
        className="relative focus:!border focus:border-primary"
      >
        <FilterIcon />
        Filter
        {filters && Object.values(filters).filter((f) => !!f).length > 0 && (
          <span className="badge text-white">
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
            className="absolute top-12 right-0 flex flex-col gap-3 bg-accent rounded-lg px-5 py-3 min-w-[250px] shadow-ni"
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
                    rounded
                    color={filters?.display === "grid" ? "primary" : "accent2"}
                    onClick={() => {
                      if (filters?.display === "grid") {
                        setFilters({ ...filters, display: undefined });
                        return;
                      }
                      setFilters({ ...filters, display: "grid" });
                    }}
                  >
                    <Grid
                      className={classes(
                        filters?.display === "grid" ? "text-white" : "text-text"
                      )}
                    />
                  </Button>
                </Tippy>
                <Tippy
                  placement="bottom"
                  content="List"
                  className="!bg-primary [&>.tippy-arrow]:!text-primary"
                >
                  <Button
                    rounded
                    disabled
                    color={filters?.display === "list" ? "primary" : "accent2"}
                    onClick={() => {
                      if (filters?.display === "list") {
                        setFilters({ ...filters, display: undefined });
                        return;
                      }
                      setFilters({ ...filters, display: "list" });
                    }}
                  >
                    <List
                      className={classes(
                        filters?.display === "list" ? "text-white" : "text-text"
                      )}
                    />
                  </Button>
                </Tippy>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="whitespace-nowrap font-semibold">Sort By</h3>

              <div className="flex flex-col gap-2">
                <Select
                  color="accent2"
                  onSelect={(value) => {
                    setFilters({
                      ...filters,
                      sort: {
                        [value.split("_")[0]]: value.split("_")[1],
                      },
                    });
                    setShowFilters(false);
                  }}
                  clean={!filters?.sort}
                >
                  <SelectItem value="title_asc">Title A-Z</SelectItem>
                  <SelectItem value="title_desc">Title Z-A</SelectItem>
                  <SelectItem value="score_asc">Score Ascending</SelectItem>
                  <SelectItem value="score_desc">Score Descending</SelectItem>
                  <SelectItem value="createdAt_desc">Recently Added</SelectItem>
                </Select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
