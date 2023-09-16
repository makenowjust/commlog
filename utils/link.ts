// Parses the given HTTP "Link" header value.
export const parseLink = (link: string): Record<string, string> => {
  return Object.fromEntries(
    link
      .split(",")
      .filter(Boolean)
      .map((s) => {
        const m = s.trim().match(/^<(?<url>[^<>]*)>; rel="(?<rel>[^"]*)"$/)!;
        return [m.groups!.rel, m.groups!.url];
      }),
  );
};
