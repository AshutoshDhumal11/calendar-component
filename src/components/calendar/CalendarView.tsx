import type React from "react";
import type { CalendarViewProps } from "./CalendarView.types";
import { useCalendar } from "../../hooks/useCalendar";
import { useEventManager } from "../../hooks/useEventManager";
import { EventModal } from "./EventModal";
import { WeekView } from "./WeekView";
import { Select } from "../../primitives/Select";
import { formatMonthYear } from "../../utils/date.utils";
import { Button } from "../../primitives/Button";
import { MonthView } from "./MonthView";

export const CalendarView: React.FC<CalendarViewProps> = ({
  events: initialEvents,
  onEventAdd,
  onEventUpdate,
  onEventDelete,
  initialView = "month",
  initialDate = new Date(),
}) => {
  const calendar = useCalendar(initialDate, initialView);
  const eventManager = useEventManager(
    initialEvents,
    onEventAdd,
    onEventUpdate,
    onEventDelete
  );

  const handleDateClick = (date: Date) => {
    calendar.openCreateModal(date);
  };

  const handleTimeSlotClick = (date: Date) => {
    calendar.openCreateModal(date);
  };

  const handleEventClick = (event: any) => {
    calendar.openEditModal(event);
  };

  const handleSaveEvent = (eventData: any) => {
    if (calendar.modalMode === "create") {
      eventManager.addEvent(eventData);
    } else if (calendar.modalMode === "edit" && calendar.selectedEvent) {
      eventManager.updateEvent(calendar.selectedEvent.id, eventData);
    }
  };

  const handleDeleteEvent = (id: string) => {
    eventManager.deleteEvent(id);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-neutral-200">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={calendar.goToToday}>
            Today
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={calendar.goToPreviousPeriod}
              aria-label="Previous period"
            >
              ‹
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={calendar.goToNextPeriod}
              aria-label="Next period"
            >
              ›
            </Button>
          </div>

          <h2 className="text-xl font-semibold text-neutral-900">
            {formatMonthYear(calendar.currentDate)}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <Select
            value={calendar.view}
            onChange={(e) =>
              calendar.setView(e.target.value as "month" | "week")
            }
            options={[
              { value: "month", label: "Month" },
              { value: "week", label: "Week" },
            ]}
          />
        </div>
      </div>

      {/* Calendar View */}
      <div className="flex-1 overflow-auto">
        {calendar.view === "month" ? (
          <MonthView
            currentDate={calendar.currentDate}
            events={eventManager.events}
            selectedDate={calendar.selectedDate}
            onDateClick={handleDateClick}
            onEventClick={handleEventClick}
          />
        ) : (
          <WeekView
            currentDate={calendar.currentDate}
            events={eventManager.events}
            onTimeSlotClick={handleTimeSlotClick}
            onEventClick={handleEventClick}
          />
        )}
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={calendar.isModalOpen}
        onClose={calendar.closeModal}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        event={calendar.selectedEvent}
        mode={calendar.modalMode}
        initialDate={calendar.selectedDate || undefined}
      />
    </div>
  );
};
