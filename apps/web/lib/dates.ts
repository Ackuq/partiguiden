const DEFAULT_LOCALE = "sv-SE";

export const dateString = (date: string | Date) => {
  const dateObject = typeof date === "string" ? new Date(date) : date;
  return dateObject.toLocaleDateString(DEFAULT_LOCALE);
};
