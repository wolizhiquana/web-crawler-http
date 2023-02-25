export function sortPages(pages: Record<string, number>) {
  return Object.entries(pages).sort(([, aHits], [, bHits]) => bHits - aHits);
}

export function printReport(pages: Record<string, number>) {
  console.log("============");
  console.log("REPORT!");
  console.log("============");

  sortPages(pages).forEach(([url, hits]) =>
    console.log(`Found ${hits} links to page: ${url}`)
  );

  console.log("============");
  console.log("END REPORT!");
  console.log("============");
}
