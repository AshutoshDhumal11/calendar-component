import type React from "react";
import type { CalendarEvent } from "./CalendarView.types";
import { formatWeekDay, getCalendarGrid } from "../../utils/date.utils";
import { useMemo } from "react";
import { CalendarCell } from "./CalendarCell";

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  selectedDate: Date | null;
  onDateClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  events,
  selectedDate,
  onDateClick,
  onEventClick,
}) => {
  const calendarGrid = useMemo(
    () => getCalendarGrid(currentDate),
    [currentDate]
  );

  const weekdays = useMemo(() => {
    const weekStart = new Date(calendarGrid[0]);
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(weekStart);
      day.setDate(day.getDate() + i);
      return day;
    });
  }, [calendarGrid]);

  return (
    <div className="w-full">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 border-b border-neutral-200">
        {weekdays.map((day) => (
          <div
            key={day.toString()}
            className="p-4 text-center text-sm font-medium text-neutral-700"
          >
            {formatWeekDay(day)}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {calendarGrid.map((date) => (
          <CalendarCell
            key={date.toString()}
            date={date}
            events={events}
            currentDate={currentDate}
            isSelected={
              selectedDate ? date.getTime() === selectedDate.getTime() : false
            }
            onClick={onDateClick}
            onEventClick={onEventClick}
          />
        ))}
      </div>
    </div>
  );
};
