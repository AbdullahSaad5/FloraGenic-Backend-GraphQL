import puppeteer from "puppeteer";

export const scrapeGoogleResults = async (query) => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  // Navigate to Google Search
  await page.goto(
    `https://www.google.com/search?q=${encodeURIComponent(query)}`
  );

  // Wait for the search results to load
  await page.waitForSelector("div#search");

  // Extract the search results
  const results = await page.evaluate((query) => {
    // Select all search result elements

    const title = document.querySelector('div[data-attrid="title"]');

    const parent = document.querySelector(".yxjZuf");
    const quickFacts = parent?.children;
    if (!quickFacts) return null;

    // Get text content from quick facts
    const quickFactsText = [...quickFacts]?.map((h2) => {
      if (!h2.hasAttribute("data-ved")) {
        return null;
      }
      const text = h2.innerText;
      let object = {};
      if (text.includes("\n")) {
        object = text.split("\n");
      } else if (text.includes(":")) {
        object = text.split(":");
      } else {
        return {
          [text]: null,
        };
      }
      return {
        [object[0]]: object[1],
      };
    });

    return {
      title: title?.innerText || query,
      quickFacts: quickFactsText.filter((item) => item !== null),
    };
  }, query);

  // Close the browser
  await browser.close();

  return results;
};
