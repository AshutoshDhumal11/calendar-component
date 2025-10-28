import type React from "react";
import type { CalendarEvent } from "./CalendarView.types";
import { useEffect, useState } from "react";
import { getEventColors } from "../../utils/event.utils";
import { format } from "date-fns";
import { Modal } from "../../primitives/Modal";
import clsx from "clsx";
import { Select } from "../../primitives/Select";
import { Button } from "../../primitives/Button";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, "id">) => void;
  onDelete?: (id: string) => void;
  event?: CalendarEvent | null;
  mode: "create" | "edit";
  initialDate?: Date;
}

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  event,
  mode,
  initialDate,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    color: "#3b82f6",
    category: "",
  });
  const [errors, setErrors] = useState<string[]>([]);

  const eventColors = getEventColors();
  const categories = [
    { value: "meeting", label: "Meeting" },
    { value: "personal", label: "Personal" },
    { value: "work", label: "Work" },
    { value: "travel", label: "Travel" },
    { value: "other", label: "Other" },
  ];

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description || "",
        startDate: format(event.startDate, "yyyy-MM-dd"),
        startTime: format(event.startDate, "HH:mm"),
        endDate: format(event.endDate, "yyyy-MM-dd"),
        endTime: format(event.endDate, "HH:mm"),
        color: event.color || "#3b82f6",
        category: event.category || "",
      });
    } else if (initialDate) {
      const defaultEndDate = new Date(initialDate);
      defaultEndDate.setHours(initialDate.getHours() + 1);

      setFormData({
        title: "",
        description: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        color: "#3b82f6",
        category: "",
      });
    }
  }, [event, initialDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const startDateTime = new Date(
      `${formData.startDate}T${formData.startTime}`
    );
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);

    if (endDateTime <= startDateTime) {
      setErrors(["End time must be after start time"]);
      return;
    }

    if (!formData.title.trim()) {
      setErrors(["Title is required"]);
      return;
    }

    const eventData: Omit<CalendarEvent, "id"> = {
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      startDate: startDateTime,
      endDate: endDateTime,
      color: formData.color,
      category: formData.category || undefined,
    };

    try {
      onSave(eventData);
      onClose();
    } catch (error) {
      setErrors([
        error instanceof Error ? error.message : "Failed to save event",
      ]);
    }
  };

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event.id);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "create" ? "Create Event" : "Edit Event"}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.length > 0 && (
          <div className="p-4 bg-error-50 border border-error-200 rounded-lg">
            <ul className="text-sm text-error-700">
              {errors.map((error, index) => (
                <li key={index}>• {error}</li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:border-primary-500"
            maxLength={100}
            required
          />
          <div className="text-xs text-neutral-500 mt-1 text-right">
            {formData.title.length}/100
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            rows={3}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:border-primary-500"
            maxLength={500}
          />
          <div className="text-xs text-neutral-500 mt-1 text-right">
            {formData.description.length}/500
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Start Date *
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, startDate: e.target.value }))
              }
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:border-primary-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Start Time *
            </label>
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, startTime: e.target.value }))
              }
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:border-primary-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              End Date *
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, endDate: e.target.value }))
              }
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:border-primary-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              End Time *
            </label>
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, endTime: e.target.value }))
              }
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:border-primary-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Color
          </label>
          <div className="flex gap-2">
            {eventColors.map((color) => (
              <button
                key={color}
                type="button"
                className={clsx(
                  "w-8 h-8 rounded-full border-2 transition-all",
                  formData.color === color
                    ? "border-neutral-700 scale-110"
                    : "border-transparent"
                )}
                style={{ backgroundColor: color }}
                onClick={() => setFormData((prev) => ({ ...prev, color }))}
              />
            ))}
          </div>
        </div>

        <div>
          <Select
            label="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
            options={[{ value: "", label: "Select category" }, ...categories]}
          />
        </div>

        <div className="flex justify-between pt-4">
          <div>
            {mode === "edit" && onDelete && (
              <Button type="button" variant="danger" onClick={handleDelete}>
                Delete Event
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === "create" ? "Create Event" : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
