import { crawlPage } from "./crawl";

function main() {
  if (process.argv.length < 3) {
    console.log("no website provided");
    process.exit();
  }
  if (process.argv.length > 3) {
    console.log("to many command line args");
    process.exit();
  }

  const baseURL = process.argv[2];

  console.log("starting crawl");
  crawlPage(baseURL);
}

main();
