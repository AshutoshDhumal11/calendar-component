import { useCallback, useState } from "react";
import type { CalendarEvent } from "../components/calendar/CalendarView.types";
import { generateEventId, validateEvent } from "../utils/event.utils";
import { error } from "console";

export const useEventManager = (
  initialEvents: CalendarEvent[] = [],
  onEventAdd?: (event: Omit<CalendarEvent, "id">) => void,
  onEventUpdate?: (id: string, updates: Partial<CalendarEvent>) => void,
  onEventDelete?: (id: string) => void
) => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

  const addEvent = useCallback(
    (eventData: Omit<CalendarEvent, "id">) => {
      const errors = validateEvent(eventData);
      if (error.length > 0) {
        throw new Error(errors.join(", "));
      }

      const newEvent: CalendarEvent = {
        ...eventData,
        id: generateEventId(),
      };

      setEvents((prev) => [...prev, newEvent]);
      onEventAdd?.(eventData);
    },
    [onEventAdd]
  );

  const updateEvent = useCallback(
    (id: string, updates: Partial<CalendarEvent>) => {
      const errors = validateEvent(updates);
      if (errors.length > 0) {
        if (errors.length > 0) {
          throw new Error(errors.join(", "));
        }
      }

      setEvents((prev) =>
        prev.map((event) =>
          event.id === id ? { ...event, ...updates } : event
        )
      );
      onEventUpdate?.(id, updates);
    },
    [onEventUpdate]
  );

  const deleteEvent = useCallback(
    (id: string) => {
      setEvents((prev) => prev.filter((event) => event.id !== id));
      onEventDelete?.(id);
    },
    [onEventDelete]
  );

  const getEvent = useCallback((id: string): CalendarEvent | undefined => {
    return events.find((event) => event.id === id);
  }, []);

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEvent,
  };
};
