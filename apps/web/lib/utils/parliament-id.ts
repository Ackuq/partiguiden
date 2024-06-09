export const urlEncodedToParliamentId = (urlEncoded: string) => {
  // For the parliament API, we need å, ä, and ö to not be url encoded
  return urlEncoded
    .replace(/%C3%A5/g, "å")
    .replace(/%C3%A4/g, "ä")
    .replace(/%C3%B6/g, "ö");
};
