import { cn } from "@/lib/utils"

function Skeleton({
  className,
  color = "accent",
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  { color: "accent" | "accent2" | "accent3" | "accent 4" }
) {
  return (
    <div
      className={cn("animate-pulse rounded-lg", `bg-${color}`, className)}
      {...props}
    />
  )
}

export { Skeleton }

