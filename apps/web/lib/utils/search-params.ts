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
