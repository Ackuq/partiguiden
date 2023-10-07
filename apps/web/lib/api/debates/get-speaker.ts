import fetchMember from "../member/fetch-member";
import parseSpeaker from "./parsers/speaker";

export default async function getSpeaker(id: string) {
  const data = await fetchMember(id);

  if (!data) {
    return;
  }

  return parseSpeaker(data);
}
