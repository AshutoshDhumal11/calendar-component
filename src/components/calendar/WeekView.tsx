import type React from "react";
import type { CalendarEvent } from "./CalendarView.types";
import { useCallback, useMemo } from "react";
import {
  formatDay,
  formatTime,
  formatWeekDay,
  getTimeSlots,
  getWeekDays,
} from "../../utils/date.utils";
import { getEventsforDay } from "../../utils/event.utils";
import clsx from "clsx";
import { isSameDay } from "date-fns";

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onTimeSlotClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  onTimeSlotClick,
  onEventClick,
}) => {
  const weekDays = useMemo(() => getWeekDays(currentDate), [currentDate]);

  const timeSlots = useMemo(() => getTimeSlots(60), []);

  const getEventsForTimeSlot = useCallback(
    (day: Date, timeSlot: Date) => {
      const dayEvents = getEventsforDay(events, day);
      return dayEvents.filter((event) => {
        const eventStart = new Date(event.startDate);
        return (
          eventStart.getHours() === timeSlot.getHours() &&
          eventStart.getMinutes() === timeSlot.getMinutes()
        );
      });
    },
    [events]
  );

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex min-w-max">
        {/* Time column */}
        <div className="w-20 shrink-0">
          <div className="h-16 border-b border-r border-neutral-200"></div>
          {timeSlots.map((slot) => (
            <div
              key={slot.toString()}
              className="h-16 border-b border-r border-neutral-200 p-2 text-xs text-neutral-500"
            >
              {formatTime(slot)}
            </div>
          ))}
        </div>

        {/* Day column */}
        {weekDays.map((day) => (
          <div key={day.toString()} className="flex-1 min-w-32">
            <div className="h-16 border-b border-neutral-200 p-4 text-center">
              <div className="text-sm font-medium text-neutral-900">
                {formatWeekDay(day)}
              </div>
              <div
                className={clsx(
                  "text-sm",
                  isSameDay(day, new Date())
                    ? "w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center mx-auto"
                    : "text-neutral-600"
                )}
              >
                {formatDay(day)}
              </div>
            </div>

            {/* Time slots */}
            {timeSlots.map((slot) => {
              const slotEvents = getEventsForTimeSlot(day, slot);
              return (
                <div
                  key={slot.toString()}
                  className="h-16 border-b border-neutral-200 hover:bg-neutral-50 cursor-pointer transition-colors"
                  onClick={() => {
                    const clickedDate = new Date(day);
                    clickedDate.setHours(slot.getHours(), slot.getMinutes());
                    onTimeSlotClick(clickedDate);
                  }}
                >
                  {slotEvents.map((event) => (
                    <div
                      key={event.id}
                      className="text-xs p-1 m-1 rounded text-white truncate"
                      style={{ backgroundColor: event.color || "#3b82f6" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
