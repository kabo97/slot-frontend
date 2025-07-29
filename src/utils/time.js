import { format } from "date-fns";

export function formatKsaTime(utcString) {
  const utcDate = new Date(utcString);
  const ksaDate = new Date(utcDate.getTime() + 3 * 60 * 60 * 1000);
  return format(ksaDate, "hh:mm a");
}
export function convertKsaDateTimeToUtc(dateStr, timeStr) {
  const localDateTime = new Date(`${dateStr}T${timeStr}:00`);
  const utcDateTime = new Date(localDateTime.getTime() - 3 * 60 * 60 * 1000);
  return utcDateTime;
}
export function extractKsaTimeParts(utcString) {
  const utcDate = new Date(utcString);
  const ksaDate = new Date(utcDate.getTime() + 3 * 60 * 60 * 1000);
  
  const hh = String(ksaDate.getHours()).padStart(2, '0');
  const mm = String(ksaDate.getMinutes()).padStart(2, '0');
  const dateStr = ksaDate.toISOString().slice(0, 10);

  return { time: `${hh}:${mm}`, date: dateStr };
}
