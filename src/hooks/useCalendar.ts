import { useCallback, useState } from "react";
import {
  type CalendarState,
  type CalendarView,
} from "../components/calendar/CalendarView.types";
import {
  addMonths,
  addWeeks,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks,
} from "date-fns";

export const useCalendar = (
  initialDate: Date = new Date(),
  initialView: CalendarView = "month"
) => {
  const [state, setState] = useState<CalendarState>({
    currentDate: initialDate,
    view: initialView,
    selectedDate: null,
    selectedEvent: null,
    isModalOpen: false,
    modalMode: "create",
  });

  const goToNextPeriod = useCallback(() => {
    setState((prev) => {
      const newDate =
        prev.view === "month"
          ? addMonths(prev.currentDate, 1)
          : addWeeks(prev.currentDate, 1);

      return { ...prev, currentDate: newDate };
    });
  }, []);

  const goToPreviousPeriod = useCallback(() => {
    setState((prev) => {
      const newDate =
        prev.view === "month"
          ? subMonths(prev.currentDate, 1)
          : subWeeks(prev.currentDate, 1);

      return { ...prev, currentDate: newDate };
    });
  }, []);

  const goToToday = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentDate: new Date(),
    }));
  }, []);

  const setView = useCallback((view: CalendarView) => {
    setState((prev) => {
      let newDate = prev.currentDate;

      if (view === "week") {
        newDate = startOfWeek(prev.currentDate);
      } else if (view === "month") {
        newDate = startOfMonth(prev.currentDate);
      }

      return { ...prev, view, currentDate: newDate };
    });
  }, []);

  const openCreateModal = useCallback((date: Date) => {
    setState((prev) => ({
      ...prev,
      selectedDate: date,
      isModalOpen: true,
      modalMode: "create",
      selectedEvent: null,
    }));
  }, []);

  const openEditModal = useCallback((event: any) => {
    setState((prev) => ({
      ...prev,
      selectedEvent: event,
      isModalOpen: true,
      modalMode: "edit",
      selectedDate: event.startDate,
    }));
  }, []);

  const closeModal = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isModalOpen: false,
      selectedDate: null,
      selectedEvent: null,
    }));
  }, []);

  return {
    ...state,
    goToNextPeriod,
    goToPreviousPeriod,
    goToToday,
    setView,
    openCreateModal,
    openEditModal,
    closeModal,
  };
};
