import { Committee, committeeInfo } from "@lib/committes";
import type { FilterToggle } from "./filter-context";

export default function initialFilterToggles(
  committees: string[],
): FilterToggle<Committee> {
  return Object.values(Committee).reduce(
    (prev, committee) => ({
      ...prev,
      [committee]: {
        title: committeeInfo[committee].desc,
        value: committees.includes(committee),
      },
    }),
    {} as FilterToggle<Committee>,
  );
}
