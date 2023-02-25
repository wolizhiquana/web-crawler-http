import { normalizedURL } from "./crawl";
import { sortPages } from "./report";

test("sortPages", () => {
  const input = {
    "https://wagslane.dev/path3": 3,
    "https://wagslane.dev": 0,
    "https://wagslane.dev/path2": 2,
    "https://wagslane.dev/path5": 5,
    "https://wagslane.dev/path4": 4,
  };
  const actual = sortPages(input);
  const expected = [
    ["https://wagslane.dev/path5", 5],
    ["https://wagslane.dev/path4", 4],
    ["https://wagslane.dev/path3", 3],
    ["https://wagslane.dev/path2", 2],
    ["https://wagslane.dev", 0],
  ];

  expect(actual).toEqual(expected);
});
