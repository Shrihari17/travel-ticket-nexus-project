
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  if (!dateString) return "";
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function formatTime(timeString: string): string {
  if (!timeString) return "";
  
  // Assuming timeString is in HH:MM format
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours, 10);
  const amPm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  
  return `${formattedHour}:${minutes} ${amPm}`;
}

export function calculateTimeDifference(start: string, end: string): string {
  // Assuming start and end are in HH:MM format
  const [startHours, startMinutes] = start.split(':').map(Number);
  const [endHours, endMinutes] = end.split(':').map(Number);
  
  let diffMinutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
  if (diffMinutes < 0) diffMinutes += 24 * 60; // Handle overnight trips
  
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  
  return `${hours}h ${minutes}m`;
}
