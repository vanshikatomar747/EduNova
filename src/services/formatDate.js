// Utility function to format a given date string into "Month Day, Year | HH:MM AM/PM" format
export const formatDate = (dateString) => {
  // Convert input string to a Date object
  const date = new Date(dateString);

  // Format date: e.g., "September 5, 2025"
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  // Extract hours and minutes for time formatting
  let hour = date.getHours();
  const minutes = date.getMinutes();

  // Determine AM/PM
  const period = hour >= 12 ? "PM" : "AM";

  // Convert 24-hour to 12-hour format and ensure two-digit minutes
  const formattedTime = `${hour % 12 || 12}:${minutes.toString().padStart(2, "0")} ${period}`;

  // Return combined formatted date and time
  return `${formattedDate} | ${formattedTime}`;
};
