export default function titleTrim(title: string) {
  return title.split(/([0-9]{4}\/[0-9]{2}:[A-ö]{0,4}[0-9]{0,4})/)[2].trim();
}
