import { normalizeURL } from "./crawl";

describe("normalizeURL function", () => {
  it("带有协议的url", () => {
    const input = "https://blog.boot.dev";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev";

    expect(actual).toEqual(expected);
  });

  it("带有路径的url", () => {
    const input = "https://blog.boot.dev/path";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";

    expect(actual).toEqual(expected);
  });

  it("以斜杠结尾的url", () => {
    const input = "https://blog.boot.dev/";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev";

    expect(actual).toEqual(expected);
  });

  it("有大写的url", () => {
    const input = "https://BLOG.boot.dev/path/";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";

    expect(actual).toEqual(expected);
  });
});
