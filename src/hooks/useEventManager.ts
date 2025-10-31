import { useState, useCallback } from 'react';
import type { CalendarEvent } from '../components/calendar/CalendarView.types';
import { generateEventId, validateEvent } from '../utils/event.utils';


export const useEventManager = (
  initialEvents: CalendarEvent[] = [],
  onEventAdd?: (event: Omit<CalendarEvent, 'id'>) => void,
  onEventUpdate?: (id: string, updates: Partial<CalendarEvent>) => void,
  onEventDelete?: (id: string) => void
) => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);

  const addEvent = useCallback((eventData: Omit<CalendarEvent, 'id'>) => {
    const errors = validateEvent(eventData);
    if (errors.length > 0) {
      // Remove console.error and use a different error handling approach
      const errorMessage = errors.join(', ');
      throw new Error(errorMessage);
    }

    const newEvent: CalendarEvent = {
      ...eventData,
      id: generateEventId(),
    };

    setEvents(prev => [...prev, newEvent]);
    onEventAdd?.(eventData);
    
    // Remove any console.log statements
    return newEvent;
  }, [onEventAdd]);

  const updateEvent = useCallback((id: string, updates: Partial<CalendarEvent>) => {
    const errors = validateEvent(updates);
    if (errors.length > 0) {
      const errorMessage = errors.join(', ');
      throw new Error(errorMessage);
    }

    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...updates } : event
    ));
    onEventUpdate?.(id, updates);
    
    return id;
  }, [onEventUpdate]);

  const deleteEvent = useCallback((id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id));
    onEventDelete?.(id);
    
    return id;
  }, [onEventDelete]);

  const getEvent = useCallback((id: string): CalendarEvent | undefined => {
    return events.find(event => event.id === id);
  }, [events]);

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    getEvent,
  };
};