import { parseISO, format } from "date-fns";

export const groupSlotsByDate = (slots) => {
  return slots.reduce((acc, slot) => {
    const date = format(parseISO(slot.startTime), "yyyy-MM-dd");
    if (!acc[date]) acc[date] = [];
    acc[date].push(slot);
    return acc;
  }, {});
};

