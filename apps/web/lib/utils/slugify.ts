export default function slugify(text: string) {
  const slug = text
    .toLowerCase()
    .normalize("NFD") // separate accent from letter
    .replace(/[\u0300-\u036f]/g, "") // remove all separated accents
    .replace(/\s+/g, "-") // replace spaces with -
    .replace(/[\u2010\u2011\u2012\u2013\u2014\u2015\u2212]/g, "-") // Replace special dashes with normal dash
    .replace(/--+/g, "-") // replace multiple '-' with single '-'
    .replace(/[,:]/g, "") // replace some special characters
    .replace(/\.$/g, ""); // replace trailing dots

  return trimSlug(slug, 50);
}

function trimSlug(slug: string, length: number) {
  if (slug.length <= length) {
    return slug;
  }
  if (slug.charAt(50) === "-") {
    return slug.substring(0, 50);
  }
  let trimmedSlug = slug.substring(0, 50);
  const lastSpace = trimmedSlug.lastIndexOf("-");
  if (lastSpace > -1) {
    trimmedSlug = slug.substring(0, lastSpace);
  }
  return trimmedSlug;
}
