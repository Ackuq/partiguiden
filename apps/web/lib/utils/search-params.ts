import type { FilterToggle } from "@components/filter/filter-context";

export function parseNumberSearchParam(
  param?: string | string[],
): number | undefined {
  if (!param) {
    return undefined;
  }
  const parsed = parseInt(param.toString());
  if (Number.isNaN(parsed)) {
    return undefined;
  }
  return parsed;
}

export function parseStringSearchParam(
  param?: string | string[],
): string | undefined {
  if (!param) {
    return undefined;
  }
  if (Array.isArray(param)) {
    return param[0];
  }
  return param;
}

export function parseStringArraySearchParam(
  param?: string | string[],
): string[] {
  if (!param) {
    return [];
  }
  if (Array.isArray(param)) {
    return param;
  }
  return [param];
}

interface SearchParameters {
  search: string;
  toggles: FilterToggle<string>;
  page?: number;
}

export function buildSearchParameters({
  search,
  toggles,
  page,
}: SearchParameters) {
  const query = new URLSearchParams();
  const activeToggles = Object.entries(toggles)
    .filter(([, value]) => value.value)
    .map(([key]) => key);
  for (const toggle of activeToggles) {
    query.append("utskott", toggle);
  }
  if (search) {
    query.set("sok", search);
  }

  if (page) {
    query.set("sida", page.toString());
  }

  return query;
}
