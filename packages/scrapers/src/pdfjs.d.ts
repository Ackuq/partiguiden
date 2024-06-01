// Workaround to get typings for the legacy build of pdfjs-dist
declare module "pdfjs-dist/legacy/build/pdf.mjs" {
  export * from "pdfjs-dist";
}
