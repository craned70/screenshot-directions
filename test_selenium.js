import {Blob} from 'node:buffer';
import webdriver from 'selenium-webdriver';
let mapsInput = "/html/body/div[3]/div[9]/div[3]/div[1]/div[1]/div[1]/div[2]/form/div/div[3]/div/input[1]";

let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get("https://www.google.com/maps");

driver.findElement({xpath: mapsInput}).sendKeys("740 Blackford Avenue San Jose CA", webdriver.Key.ENTER);

let blobToFile = (theBlob, fileName) => {
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
};

let handleImage = (value) => {
    const blobValue = new Array(value);
    const myBlob = new Blob(blobValue);
    blobToFile(myBlob, 'lol.jpg');
}

 driver.takeScreenshot().then(handleImage);







