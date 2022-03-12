import webdriver from "selenium-webdriver";
import fs from "fs";
import readline from "readline";

const googleMaps = "https://www.google.com/maps";
const mapsInputField =
  "/html/body/div[3]/div[9]/div[3]/div[1]/div[1]/div[1]/div[2]/form/div/div[3]/div/input[1]";

const driver = new webdriver.Builder().forBrowser("chrome");
const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const waitForUserInput = new Promise((resolve) => {
  input.question("What address do you want to see?", (address) => {
    if (address) {
      resolve(address);
      input.close();
    }
  });
});

(async () => {
  const address = await waitForUserInput;

  if (address) {
    const browser = await driver.build();
    await browser.get(googleMaps);

    await browser
      .findElement({ xpath: mapsInputField })
      .sendKeys(address, webdriver.Key.ENTER)
      .then(async () => await browser.sleep(5000));

    await browser
      .findElement({ xpath: '//*[@data-value="Directions"]' })
      .click()
      .then(async () => await browser.sleep(5000));

    const screenshot = await browser.takeScreenshot();

    if (screenshot) {
      const path = `./build`;

      fs.access(path, (err) => {
        if (err) {
          fs.mkdirSync(path);
        }

        fs.writeFile(
          `${path}/screenshot-${Date.now()}.png`,
          screenshot,
          "base64",
          (err) => {
            if (err) {
              console.error("error on writeFile", err);
            } else {
              console.log("File written successfully!");
            }
          }
        );
      });
    }
  }
})();
