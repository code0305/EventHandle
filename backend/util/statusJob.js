import cron from "node-cron";
import { updateEventStatuses } from "./updateStatus.js";
cron.schedule("* * * * *", async () => {
  await updateEventStatuses();
});