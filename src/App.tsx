import { CalendarView } from "./components/calendar/CalendarView";
import type { CalendarEvent } from "./components/calendar/CalendarView.types";


const sampleEvents: CalendarEvent[] = [
  {
    id: 'evt-1',
    title: 'Team Standup',
    description: 'Daily sync with the team',
    startDate: new Date(2024, 0, 15, 9, 0),
    endDate: new Date(2024, 0, 15, 9, 30),
    color: '#3b82f6',
    category: 'Meeting',
  },
  {
    id: 'evt-2',
    title: 'Design Review',
    description: 'Review new component designs',
    startDate: new Date(2024, 0, 15, 14, 0),
    endDate: new Date(2024, 0, 15, 15, 30),
    color: '#10b981',
    category: 'Design',
  },
  {
    id: 'evt-3',
    title: 'Client Presentation',
    startDate: new Date(2024, 0, 16, 10, 0),
    endDate: new Date(2024, 0, 16, 11, 30),
    color: '#f59e0b',
    category: 'Meeting',
  },
];

function App() {
  const handleEventAdd = (event: Omit<CalendarEvent, 'id'>) => {
    console.log('Event added:', event);
  };

  const handleEventUpdate = (id: string, updates: Partial<CalendarEvent>) => {
    console.log('Event updated:', id, updates);
  };

  const handleEventDelete = (id: string) => {
    console.log('Event deleted:', id);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-8 text-center">
          Calendar View Component
        </h1>
        <div className="bg-white rounded-xl shadow-card border border-neutral-200 overflow-hidden">
          <CalendarView
            events={sampleEvents}
            onEventAdd={handleEventAdd}
            onEventUpdate={handleEventUpdate}
            onEventDelete={handleEventDelete}
            initialView="month"
          />
        </div>
      </div>
    </div>
  );
}

export default App;