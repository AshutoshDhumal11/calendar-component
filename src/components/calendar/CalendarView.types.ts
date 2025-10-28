export interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    color?: string;
    category?: string;
}

export interface CalendarViewProps {
    events: CalendarEvent[];
    onEventAdd: (event: Omit<CalendarEvent, "id">) => void;
    onEventUpdate: (id: string, updates: Partial<CalendarEvent>) => void;
    onEventDelete: (id: string) => void;
    initialView?: "month" | "week";
    initialDate?: Date;
}

export type CalendarView = "month" | "week";

export interface CalendarState {
    currentDate: Date;
    view: CalendarView;
    selectedDate: Date | null;
    selectedEvent: CalendarEvent | null;
    isModalOpen: boolean;
    modalMode: "create" | "edit";
}