import { format, parseISO } from "date-fns";

export const groupSlotsByMonth = (slots) => {
  return slots.reduce((acc, slot) => {
    const key = format(parseISO(slot.startTime), "MMMM yyyy");
    if (!acc[key]) acc[key] = [];
    acc[key].push(slot);
    return acc;
  }, {});
};
