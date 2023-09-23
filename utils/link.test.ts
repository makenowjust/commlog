import { expect, test } from "bun:test";

import { parseLink } from "./link";

test("parseLink: empty", () => {
  expect(parseLink("")).toStrictEqual({});
});

test("parseLink: single", () => {
  expect(parseLink('<foo>; rel="bar"')).toStrictEqual({ bar: "foo" });
});

test("parseLink: multiple", () => {
  expect(parseLink('<foo>; rel="bar", <fizz>; rel="buzz"')).toStrictEqual({
    bar: "foo",
    buzz: "fizz",
  });
});

test("parseLink: real-world", () => {
  expect(
    parseLink(
      '<https://api.github.com/repositories/42772934/commits?page=2>; rel="next", <https://api.github.com/repositories/42772934/commits?page=2>; rel="last"',
    ),
  ).toStrictEqual({
    next: "https://api.github.com/repositories/42772934/commits?page=2",
    last: "https://api.github.com/repositories/42772934/commits?page=2",
  });
});
