export const ImageUrl = "https://poolvalet.com";

export const makeImage = (url: string): string => {
  if (!url) return "";

  // Check if full URL (http or https)
  const isFullUrl = /^https?:\/\//.test(url);

  const fullUrl = isFullUrl ? url : `${ImageUrl}${url}`;

  // Encode only if special characters exist
  return encodeURI(fullUrl);
};
