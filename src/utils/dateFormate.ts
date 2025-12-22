const dateFormate = (
  dateInput: string | number | Date,
  referenceDate: string | number | Date | null = null
): string => {
  // 1. Parse the date
  const parsedDate = new Date(dateInput);
  if (isNaN(parsedDate.getTime())) {
    // console.error("Invalid date input:", dateInput);
    return "Invalid date";
  }

  // 2. Handle reference date (default to current date)
  const refDate = referenceDate
    ? referenceDate instanceof Date
      ? referenceDate
      : new Date(referenceDate)
    : new Date();

  // 3. Check for "Today"
  if (parsedDate.toDateString() === refDate.toDateString()) {
    return "Today";
  }

  // 4. Get date suffix (st, nd, rd, th)
  const day = parsedDate.getDate();
  let suffix = "th";
  if (day % 100 < 11 || day % 100 > 13) {
    switch (day % 10) {
      case 1:
        suffix = "st";
        break;
      case 2:
        suffix = "nd";
        break;
      case 3:
        suffix = "rd";
        break;
    }
  }

  // 5. Format month name
  const month = parsedDate.toLocaleString("default", { month: "long" });

  // 6. Final output: e.g. "June 19th, 2025"
  return ` ${day} ${month}, ${parsedDate.getFullYear()}`;
};

export default dateFormate;
