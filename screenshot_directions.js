import webdriver from 'selenium-webdriver';
import fs from 'fs';
import readline from 'readline';
const googleMaps = "https://www.google.com/maps";
const mapsInputField = "/html/body/div[3]/div[9]/div[3]/div[1]/div[1]/div[1]/div[2]/form/div/div[3]/div/input[1]";
const driver = new webdriver.Builder().forBrowser('chrome').build();
const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getInput = new Promise(resolve => {
    input.question('What address do you want to see?', address => {
        resolve(address);
        input.close();
    });
});

setTimeout(() => {
    driver.get(googleMaps)
    .then(() => {
        getInput.then(address => {
            driver.findElement({xpath: mapsInputField})
            .sendKeys(address, webdriver.Key.ENTER);
        }) 
        return driver.sleep(5000);
    }).then(() => {
        driver.findElement({xpath: '//*[@data-value="Directions"]'}).click();
        return driver.sleep(5000);
    })
    .then(() => {
        return driver.takeScreenshot();
    }).then((value) => {
        fs.writeFile('build/img.png', value, 'base64', (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('File written successfully!');
            };
        })
    });
}, 10000)



















