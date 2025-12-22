export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, "0");
  const monthShort = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear().toString().slice(-2); // last 2 digits

  return `${day} ${monthShort}, ${year}`;
};
