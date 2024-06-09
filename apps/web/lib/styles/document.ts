import type { CheerioAPI } from "cheerio";

export function addStylesToDocument($: CheerioAPI) {
  // Replace all occurrences of class names with Tailwind classes
  $("[class]").each(function (_, element) {
    const classes = $(element).attr("class");
    if (!classes) {
      return;
    }
    const newClasses = classes.split(" ").map((className) => {
      if (!(className in classMap)) {
        return className;
      }
      const tailwindClass = classMap[className as keyof typeof classMap];
      return `${className} ${tailwindClass}`;
    });
    $(element).attr("class", newClasses.join(" "));
  });
}

const textDefault = "text-black dark:text-white";

const classMap = {
  // Document structure
  Rubrik1Dokumentinformation: "text-2xl",
  Dokumentbeteckning: "text-lg",
  DokumentRubrik:
    "text-2xl mb-4 border-b-2 border-gray-300 dark:border-gray-700",
  Sammanfattning: "text-lg mb-1",
  Innehllsfrteckning: "text-2xl mb-4",
  Avsnittsrubrik: "mb-4 text-xl",
  // Element types
  Hyperlink: "text-teal-800 dark:text-teal-500",
  NormalIndent: "text-sm indent-4",
  Normalinskjuten: "text-sm pl-4",
  Normalinskjutenindrag: "text-sm pl-8",
  Normalinskjutenkursiv: "text-sm italic pl-4",
  Normalkursiv: "text-sm italic",
  Normalruta: "text-sm border border-black dark:border-white p-2",
  Normalrutafett: "text-sm font-bold border border-black dark:border-white p-2",
  Normalrutaindrag:
    "text-sm indent-4 border border-black dark:border-white p-2",
  Normalutanluftfre: "text-sm",

  // Text types
  tBilagaJA: textDefault,
  tSidrubrikJA: textDefault,
  // Rows
  R1: "",
  R1bilaga: "",
  R2: "text-2xl mt-4",
  R3: "text-xl mt-4",
  R4: "text-md mt-2",
  R5: "text-md mt-1",
  R6: "text-sm mt-1",
  // Table of contents
  TOC1: "",
  TOC2: "ml-4",
  TOC3: "ml-8",
  TOC4: "ml-12",
  TOC5: "ml-16",
  TOC6: "ml-4",
  TOC7: "ml-4",
  TOC8: "",
  TOC9: "ml-4",
  // Miscellaneous
  Mellanrum: "text-[1px]",
} as const;
