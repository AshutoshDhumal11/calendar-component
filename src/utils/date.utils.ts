import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    format,
    isSameMonth,
    isSameDay,
} from "date-fns";

export const getCalendarGrid = (date: Date): Date[] => {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);

    return eachDayOfInterval({start: calendarStart, end: calendarEnd})
}

export const isToday = (date: Date): boolean => {
    return isSameDay(date, new Date());
}

export const isCurrentMonth = (date: Date, currentDate: Date): boolean => {
    return isSameMonth(date, currentDate)
}

export const formatMonthYear = (date: Date): string => {
    return format(date, "MMMM yyyy");
}

export const formatDay = (date: Date): string => {
    return format(date, "d");
}

export const formatWeekDay = (date: Date): string => {
    return format(date, "EEE");
}

export const getWeekDays = (date: Date): Date[] => {
    const weekStart = startOfWeek(date);
    return eachDayOfInterval({start: weekStart, end: endOfWeek(weekStart)});
}

export const getTimeSlots = (interval: number = 60): Date[] => {
    const slots: Date[] = [];
    const baseDate = new Date();
    baseDate.setHours(0, 0, 0, 0);

    for(let i = 0; i < 24; i++) {
        for(let j = 0; j < 60; j += interval) {
            const slot = new Date(baseDate);
            slot.setHours(i, j);
            slots.push(slot);
        }
    }

    return slots;
}

export const formatTime = (date: Date): string => {
    return format(date, "HH:mm");
}

export const isSameDateTime = (date1: Date, date2: Date): boolean => {
    return date1.getTime() === date2.getTime();
}