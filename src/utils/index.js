export function formatDateToMMDDYYYY(isoString) {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(date.getUTCDate()).padStart(2, "0");
    const yyyy = date.getUTCFullYear();

    return `${mm}/${dd}/${yyyy}`;
  } catch (error) {
    console.error("Error formatting date:", error.message);
    return null; // or return a fallback value like "Invalid Date"
  }
}

export const convertDateYYYYMMDD = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toISOString().slice(0, 10);
  return formattedDate;
};
