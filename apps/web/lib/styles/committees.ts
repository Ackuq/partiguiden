import { Committee } from "@lib/committes";

export const committeeBackground: {
  [K in Committee]: `bg-committee-${K} dark:bg-committee-dark-${K}`;
} = {
  [Committee.AU]: "bg-committee-AU dark:bg-committee-dark-AU",
  [Committee.CU]: "bg-committee-CU dark:bg-committee-dark-CU",
  [Committee.FiU]: "bg-committee-FiU dark:bg-committee-dark-FiU",
  [Committee.FöU]: "bg-committee-FöU dark:bg-committee-dark-FöU",
  [Committee.JuU]: "bg-committee-JuU dark:bg-committee-dark-JuU",
  [Committee.KU]: "bg-committee-KU dark:bg-committee-dark-KU",
  [Committee.KrU]: "bg-committee-KrU dark:bg-committee-dark-KrU",
  [Committee.MJU]: "bg-committee-MJU dark:bg-committee-dark-MJU",
  [Committee.NU]: "bg-committee-NU dark:bg-committee-dark-NU",
  [Committee.SkU]: "bg-committee-SkU dark:bg-committee-dark-SkU",
  [Committee.SfU]: "bg-committee-SfU dark:bg-committee-dark-SfU",
  [Committee.SoU]: "bg-committee-SoU dark:bg-committee-dark-SoU",
  [Committee.TU]: "bg-committee-TU dark:bg-committee-dark-TU",
  [Committee.UbU]: "bg-committee-UbU dark:bg-committee-dark-UbU",
  [Committee.UU]: "bg-committee-UU dark:bg-committee-dark-UU",
  [Committee.UFöU]: "bg-committee-UFöU dark:bg-committee-dark-UFöU",
};
