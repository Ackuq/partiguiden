import type { UnknownDocumentStatus } from "./parliament";

export type DocumentResponse = {
  html: string;
} & UnknownDocumentStatus;
