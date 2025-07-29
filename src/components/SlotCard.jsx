import { format } from "date-fns";
import { toZonedTime  } from "date-fns-tz";
import { formatKsaTime } from "../utils/time";

const SlotCard = ({ slot, role, onBook }) => {
  const timeZone = 'Asia/Riyadh';
  const start = toZonedTime(new Date(slot.startTime), timeZone);
  const end = toZonedTime(new Date(slot.endTime), timeZone);
console.log({
  raw: slot.startTime,
  parsed: new Date(slot.startTime),
  saTime: toZonedTime(new Date(slot.startTime), 'Asia/Riyadh'),
  formatted: format(toZonedTime(new Date(slot.startTime), 'Asia/Riyadh'), 'hh:mm a')
});

  return (
    <div
      className={`border px-4 py-3 rounded-xl text-center shadow ${
        slot.status === "Available"
          ? "border-purple-400 text-purple-500"
          : "border-gray-300 text-gray-400 line-through"
      }`}
    >
      {formatKsaTime(slot.startTime)} - {formatKsaTime(slot.endTime)}

      {role === "User" && slot.status === "Available" && (
        <button
          onClick={() => onBook(slot.slotId)}
          className="mt-2 bg-purple-600 hover:bg-purple-700 text-white text-sm w-full py-1 rounded-md"
        >
          Book
        </button>
      )}
    </div>
  );
};

export default SlotCard;
