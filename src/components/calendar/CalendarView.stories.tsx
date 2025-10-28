import type { Meta, StoryObj } from '@storybook/react';
import { CalendarView } from './CalendarView';
import type { CalendarEvent } from './CalendarView.types';

const meta: Meta<typeof CalendarView> = {
  title: 'Components/CalendarView',
  component: CalendarView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CalendarView>;

// Sample events data
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
    startDate: new Date(2025, 0, 15, 14, 0),
    endDate: new Date(2025, 0, 15, 15, 30),
    color: '#10b981',
    category: 'Design',
  },
  {
    id: 'evt-3',
    title: 'Client Presentation',
    startDate: new Date(2025, 0, 16, 10, 0),
    endDate: new Date(2025, 0, 16, 11, 30),
    color: '#f59e0b',
    category: 'Meeting',
  },
];

// Default story
export const Default: Story = {
  args: {
    events: sampleEvents,
    initialView: 'month',
    onEventAdd: (event) => console.log('Add event:', event),
    onEventUpdate: (id, updates) => console.log('Update event:', id, updates),
    onEventDelete: (id) => console.log('Delete event:', id),
  },
};

// Empty state
export const Empty: Story = {
  args: {
    events: [],
    initialView: 'month',
  },
};

// Week view
export const WeekView: Story = {
  args: {
    events: sampleEvents,
    initialView: 'week',
  },
};

// Many events
const manyEvents: CalendarEvent[] = Array.from({ length: 25 }, (_, i) => ({
  id: `evt-${i}`,
  title: `Event ${i + 1}`,
  description: `Description for event ${i + 1}`,
  startDate: new Date(2025, 0, 15 + Math.floor(i / 5), 9 + (i % 8), 0),
  endDate: new Date(2025, 0, 15 + Math.floor(i / 5), 10 + (i % 8), 0),
  color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][i % 5],
  category: ['Meeting', 'Work', 'Personal', 'Travel', 'Other'][i % 5],
}));

export const WithManyEvents: Story = {
  args: {
    events: manyEvents,
    initialView: 'month',
  },
};

// Interactive demo
export const InteractiveDemo: Story = {
  args: {
    events: [],
    initialView: 'month',
  },
  parameters: {
    docs: {
      description: {
        story: 'Fully interactive calendar where you can add, edit, and delete events.',
      },
    },
  },
};