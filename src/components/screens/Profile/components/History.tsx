import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { classes } from '@/lib/helpers/common';
import { useMemo } from 'react'

type Props = {
  data?: {
    day: string;
    value: number
  }[]
}

export default function History({ data = [] }: Props) {
  const buildDayColor = (value: number) => {
    if (value == 0) return 'bg-accent2'

    if (value > 0 && value < 5) return "bg-[#5DB1FF]"
    if (value >= 5 && value < 10) return "bg-[#46A6FF]"
    if (value >= 10 && value < 15) return "bg-[#2F9BFF]"
    if (value >= 15 && value < 20) return "bg-[#1890FF]"
    if (value >= 20) return "bg-[#1890FF]"
  }

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const today = currentDate.getDate();

  const startMonth = currentMonth - 5;
  const adjustedStartMonth = startMonth <= 0 ? 12 + startMonth : startMonth;

  const buildDays = useMemo(() => {
    const squares = [];

    for (let month = adjustedStartMonth; month <= currentMonth; month++) {
      const daysInMonth = new Date(currentYear, month, 0).getDate();

      const endDay = month === currentMonth ? today : daysInMonth;

      for (let day = 1; day <= endDay; day++) {
        const dateString = `${currentYear}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
        const dayData = data.find((item) => item.day === dateString);
        const value = dayData ? dayData.value : 0; // Default value to 0 if data is not found.
        const backgroundColor = buildDayColor(value);

        squares.push(
          <TooltipProvider>
            <Tooltip delayDuration={50}>
              <TooltipTrigger asChild>
                <div
                  key={day}
                  className={classes(
                    "w-3 h-3 rounded-sm",
                    !data.length && "animate-pulse",
                    backgroundColor
                  )}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs font-medium">{dateString}</p>
                <p className="text-xs font-medium">Total: {value}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )

      }
    }

    return squares;
  }, [data, currentYear, adjustedStartMonth, currentMonth, today]);

  return (
    <div className="bg-accent rounded-lg grid grid-rows-[repeat(7,1fr)] justify-center grid-flow-col-dense gap-x-2.5 gap-y-2.5 p-4">
      {buildDays}
    </div>
  )
}
