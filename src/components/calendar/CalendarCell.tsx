import React, { useCallback, useMemo } from "react";
import type { CalendarEvent } from "./CalendarView.types";
import { getEventsforDay } from "../../utils/event.utils";
import { formatDay, isCurrentMonth } from "../../utils/date.utils";
import clsx from "clsx";
import { isToday } from "date-fns";

interface CalendarCellProps {
  date: Date;
  events: CalendarEvent[];
  currentDate: Date;
  isSelected: boolean;
  onClick: (date: Date) => void;
  onEventClick: (event: CalendarEvent) => void;
}

export const CalendarCell: React.FC<CalendarCellProps> = React.memo(
  ({ date, events, currentDate, isSelected, onClick, onEventClick }) => {
    const dayEvents = useMemo(
      () => getEventsforDay(events, date),
      [events, date]
    );

    const handleClick = useCallback(() => {
      onClick(date);
    }, [date, onClick]);

    const handleEventClick = useCallback(
      (event: CalendarEvent, e: React.MouseEvent) => {
        e.stopPropagation();
        onEventClick(event);
      },
      [onEventClick]
    );

    const isTodayCell = isToday(date);
    const isCurrentMonthCell = isCurrentMonth(date, currentDate);
    const displayEvents = dayEvents.slice(0, 3);
    const hasMoreEvents = dayEvents.length > 3;

    return (
      <div
        role="button"
        tabIndex={0}
        aria-label={`${formatDay(date)} ${
          isCurrentMonthCell ? "" : "previous month"
        } ${dayEvents.length} events`}
        className={clsx(
          "border border-neutral-200 h-32 p-2 transition-colors cursor-pointer focus:outline-none focus:visible:ring-2 focus-visible:ring-primary-500",
          {
            "bg-white hover:bg-neutral-50": isCurrentMonthCell,
            "bg-neutral-50 text-neutral-400": !isCurrentMonthCell,
            "bg-primary-50 border-primary-200": isSelected,
          }
        )}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <div className="flex justify-between items-start mb-1">
          <span
            className={clsx("text-sm font-medium", {
              "text-neutral-900": isCurrentMonthCell,
              "text-neutral-400": !isCurrentMonthCell,
            })}
          >
            {formatDay(date)}
          </span>
          {isTodayCell && (
            <span className="w-6 h-6 bg-primary-500 rounded-full text-white text-xs flex items-center justify-center">
              {formatDay(date)}
            </span>
          )}
        </div>

        <div className="space-y-1 overflow-hidden">
          {displayEvents.map((event) => (
            <div
              key={event.id}
              className="text-xs px-2 py-1 rounded truncate text-white cursor-pointer transition-opacity hover:opacity-50"
              style={{ backgroundColor: event.color || "#3b82f6" }}
              onClick={(e) => handleEventClick(event, e)}
              title={`${event.title} - ${
                event.description || "No description"
              }`}
            >
              {event.title}
            </div>
          ))}
          {hasMoreEvents && (
            <button
              className="text-xs text-primary-600 hover:underline focus:outline-none foucs-vibible:ring-1 focus-visible:ring-primary-500"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              +{dayEvents.length - 3} more
            </button>
          )}
        </div>
      </div>
    );
  }
);

CalendarCell.displayName = "CalendarCell";
