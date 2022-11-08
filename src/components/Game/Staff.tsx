import { displayImage } from "@/lib/helpers/common";
import { IGameStaff } from "@/lib/types/game";

export default function Staff({ staff }: { staff: IGameStaff[] }) {
  return (
    <>
      {staff.map((staff) => (
        <div
          key={staff.id}
          className="grid grid-cols-[max-content_minmax(0,_1fr)] items-center gap-1 bg-accent rounded-lg w-full"
        >
          <img
            className="w-12 h-16 rounded-lg rounded-r-none object-cover"
            src={displayImage(staff.people.photo)}
            alt={staff.people.name}
          />
          <div className="flex flex-col px-3 py-2 w-full">
            <span className="truncate font-medium">
              {staff.people.name}
            </span>
            <span>{staff.role ?? "No role"}</span>
          </div>
        </div>
      ))}
    </>
  );
}
