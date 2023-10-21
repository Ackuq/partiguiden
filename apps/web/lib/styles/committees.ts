import { Committee } from "@lib/committees";

type CommitteeColorStyleProp<S extends string, E extends string = ""> = {
  [C in Committee]: `${S}-committee-${C}${E} dark:${S}-committee-${C}-dark${E}`;
};

export const committeeBackground: CommitteeColorStyleProp<"bg"> = {
  [Committee.AU]: "bg-committee-AU dark:bg-committee-AU-dark",
  [Committee.CU]: "bg-committee-CU dark:bg-committee-CU-dark",
  [Committee.FiU]: "bg-committee-FiU dark:bg-committee-FiU-dark",
  [Committee.FöU]: "bg-committee-FöU dark:bg-committee-FöU-dark",
  [Committee.JuU]: "bg-committee-JuU dark:bg-committee-JuU-dark",
  [Committee.KU]: "bg-committee-KU dark:bg-committee-KU-dark",
  [Committee.KrU]: "bg-committee-KrU dark:bg-committee-KrU-dark",
  [Committee.MJU]: "bg-committee-MJU dark:bg-committee-MJU-dark",
  [Committee.NU]: "bg-committee-NU dark:bg-committee-NU-dark",
  [Committee.SkU]: "bg-committee-SkU dark:bg-committee-SkU-dark",
  [Committee.SfU]: "bg-committee-SfU dark:bg-committee-SfU-dark",
  [Committee.SoU]: "bg-committee-SoU dark:bg-committee-SoU-dark",
  [Committee.TU]: "bg-committee-TU dark:bg-committee-TU-dark",
  [Committee.UbU]: "bg-committee-UbU dark:bg-committee-UbU-dark",
  [Committee.UU]: "bg-committee-UU dark:bg-committee-UU-dark",
  [Committee.UFöU]: "bg-committee-UFöU dark:bg-committee-UFöU-dark",
};
