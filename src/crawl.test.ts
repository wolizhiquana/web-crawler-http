import { getURLsFromHTML, normalizeURL } from "./crawl";

describe("normalizeURL", () => {
  it("输入有协议的url", () => {
    const input = "https://blog.boot.dev";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev";

    expect(actual).toEqual(expected);
  });

  it("输入有路径的url", () => {
    const input = "https://blog.boot.dev/path";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";

    expect(actual).toEqual(expected);
  });

  it("输入以斜杠结尾的url", () => {
    const input = "https://blog.boot.dev/";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev";

    expect(actual).toEqual(expected);
  });

  it("输入有大写的url", () => {
    const input = "https://BLOG.boot.dev/path/";
    const actual = normalizeURL(input);
    const expected = "blog.boot.dev/path";

    expect(actual).toEqual(expected);
  });
});

describe("getURLsFromHTML", () => {
  it("绝对路径", () => {
    const inputHTMLBody = `
<html>
  <body>
    <a href="https://blog.boot.dev/">
      Boot.dev Blog
    </a>
  </body>
</html>
`;
    const inputBaseURL = "https://blog.boot.dev";

    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/"];
    expect(actual).toEqual(expected);
  });

  it("相对路径", () => {
    const inputHTMLBody = `
<html>
  <body>
    <a href="/path/">
      Boot.dev Blog
    </a>
  </body>
</html>
`;
    const inputBaseURL = "https://blog.boot.dev";

    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
  });

  it("相对路径和绝对路径", () => {
    const inputHTMLBody = `
<html>
  <body>
    <a href="https://blog.boot.dev/path1/">
      Boot.dev Blog
    </a>
    <a href="/path2/">
      Boot.dev Blog
    </a>
  </body>
</html>
`;
    const inputBaseURL = "https://blog.boot.dev";

    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [
      "https://blog.boot.dev/path1/",
      "https://blog.boot.dev/path2/",
    ];
    expect(actual).toEqual(expected);
  });

  it("不应该包括无效路径", () => {
    const inputHTMLBody = `
<html>
  <body>
    <a href="invalid">
      Boot.dev Blog
    </a>
  </body>
</html>
`;
    const inputBaseURL = "https://blog.boot.dev";

    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected: string[] = [];
    expect(actual).toEqual(expected);
  });
});
