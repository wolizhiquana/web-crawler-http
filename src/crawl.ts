import { JSDOM } from "jsdom";

export async function crawlPage(
  baseURL: string,
  currentURL: string,
  pages: Record<string, number>
) {
  console.log(`actively crawling: ${currentURL}`);

  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);

  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }
  const normalizedCurrentURL = normalizedURL(currentURL);
  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }
  pages[normalizedCurrentURL] = 1;

  try {
    const resp = await fetch(currentURL);

    if (resp.status >= 400) {
      console.log(
        `error in fetch with status code: ${resp.status} on page ${currentURL}`
      );
      return pages;
    }

    const contentType = resp.headers.get("content-type");
    if (!contentType?.includes("text/html")) {
      console.log(`non html response: ${contentType} on page ${currentURL}`);
      return pages;
    }

    const htmlBody = await resp.text();
    const nextURLs = getURLsFromHTML(htmlBody, baseURL);

    for (const URL of nextURLs) pages = await crawlPage(baseURL, URL, pages);
  } catch (error) {
    console.log(
      `error in fetch: ${(error as Error).message} on page ${currentURL}`
    );
  }

  return pages;
}

export function getURLsFromHTML(htmlBody: string, baseURL: string) {
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");

  const urls: string[] = [];
  linkElements.forEach((element) => {
    const linkUrl = element.href;

    if (linkUrl[0] === "/") {
      try {
        const urlObj = new URL(baseURL + linkUrl);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(`error with relative url: ${error}`);
      }
    } else
      try {
        const urlObj = new URL(linkUrl);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(`error with absolute url: ${error}`);
      }
  });

  return urls;
}

export function normalizedURL(urlString: string) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}
