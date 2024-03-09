export const buildURL = (
  baseuri: string,
  queryParams: Record<string, string | number | null | undefined>
) => {
  return `${baseuri}?${Object.keys(queryParams)
    .map((e) => {
      if (queryParams[e] === null || queryParams[e] === undefined) return null;
      return e + '=' + queryParams[e];
    })
    .filter((e) => e !== null)
    .join('&')}`;
};
