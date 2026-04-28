import { Event } from "../model/Event.js";

export const updateEventStatuses = async () => {
  try {
    const now = new Date();

    await Event.updateMany(
      {
        status: { $ne: "Cancelled" },
        "schedule.startDate": { $gt: now }
      },
      { status: "Upcoming" }
    );

    await Event.updateMany(
      {
        status: { $ne: "Cancelled" },
        "schedule.startDate": { $lte: now },
        "schedule.endDate": { $gte: now }
      },
      { status: "Ongoing" }
    );

    await Event.updateMany(
      {
        status: { $ne: "Cancelled" },
        "schedule.endDate": { $lt: now }
      },
      { status: "Completed" }
    );

  } catch (error) {
    console.error(" Status update error:", error.message);
  }
};