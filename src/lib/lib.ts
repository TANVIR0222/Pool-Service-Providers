// utils/time.ts
export const instagramTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = (now.getTime() - date.getTime()) / 1000; // seconds difference

  if (diff < 60) return "Just now";
  if (diff < 3600) return Math.floor(diff / 60) + "m"; // minutes
  if (diff < 86400) return Math.floor(diff / 3600) + "h"; // hours
  if (diff < 604800) return Math.floor(diff / 86400) + "d"; // days
  if (diff < 2419200) return Math.floor(diff / 604800) + "w"; // weeks
  return date.toLocaleDateString(); // fallback (MM/DD/YYYY)
};
