import puppeteer from "puppeteer";

const URL = "https://ipm.ucanr.edu/agriculture/";

// The function that initiates the scraping process and returns the data
export const scrapePlantDisease = async (plant, disease) => {
  let browser;
  try {
    // Launch the browser and create a new page
    browser = await puppeteer.launch({
      headless: "new",
    });

    const page = await browser.newPage();

    page.on("console", (msg) => console.log("PAGE LOG:", msg.text()));
    // Visit the page
    await page.goto(URL + plant.toLowerCase());
    console.log("Navigating to " + URL + plant.toLowerCase());

    // Get the appropriate link and click it
    let linkHandlers = await page.$x(`//a[contains(text(), '${disease}')]`);
    if (linkHandlers.length > 0) {
      await linkHandlers[0].evaluate((elem) => elem.click());
      // Wait for the page to load
      await page.waitForNavigation();
      await page.waitForSelector("#SYMPTOMS");

      // Get the content of the sections and store them in an array
      const selectors = [
        "#SYMPTOMS",
        "#COMMENTS",
        "#MANAGEMENT",
        "#ORGANICALLY",
        "#MONITORING",
      ];
      const sectionContents = await Promise.all(
        selectors.map((selector) => getSpecificSection(selector, page))
      );

      return sectionContents;
    } else {
      throw new Error("Link not found");
    }
  } catch (err) {
    console.error(err);
  } finally {
    await browser?.close();
  }
};

const getSpecificSection = async (selector, page) => {
  return await page.evaluate(async (selector) => {
    // Find the h2 element with the text "How to identify"
    const span = document.querySelector(selector);
    if (!span) return null;
    const heading = span.nextElementSibling;
    let paragraph = heading.nextElementSibling;
    let text = paragraph.innerText;
    return {
      heading: heading.innerText,
      text: text.split("\n"),
    };
  }, selector);
};
