import { isSameDay, isWithinInterval } from "date-fns";
import type { CalendarEvent } from "../components/calendar/CalendarView.types";

export const getEventsforDay = (
  events: CalendarEvent[],
  date: Date
): CalendarEvent[] => {
  return events.filter(
    (event) =>
      isSameDay(event.startDate, date) ||
      isWithinInterval(date, { start: event.startDate, end: event.endDate })
  );
};

export const generateEventId = (): string => {
  return `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const validateEvent = (event: Partial<CalendarEvent>): string[] => {
  const errors: string[] = [];

  if (!event.title?.trim()) {
    errors.push("Title is required");
  }

  if (event.title && event.title.length > 100) {
    errors.push("Title must be less than 100 characters");
  }

  if (event.description && event.description.length > 500) {
    errors.push("Description must be less than 500 characters");
  }

  if (!event.startDate || !event.endDate) {
    errors.push("Start and end dates are required");
  }

  if (event.startDate && event.endDate && event.startDate > event.endDate) {
    errors.push("End date must be after start date");
  }

  return errors;
};

export const getEventColors = (): string[] => [
  "#3b82f6", // blue
  "#10b981", // green
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#84cc16", // lime
];
