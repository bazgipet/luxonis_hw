const puppeteer = require('puppeteer');
//const {db_saveData} = require('./db');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const AllApartments: {
    img: string;
    name: string;
    locality: string;
    price: string;
  }[] = [];

  for (let i = 1; i <= 25; i++) {
    await page.goto(`https://www.sreality.cz/en/search/for-sale/apartments?page=${i}`);
    await page.waitForSelector('.ng-isolate-scope');
    await page.waitForTimeout(3000);

    // Get the information for each apartment
    const apartments = await page.$$eval('.property', (elements: Element[]) => {
      return elements.map((el) => {
        const img = (el.querySelector('img') as HTMLImageElement).src;
        const name = (el.querySelector('.name') as HTMLElement).innerText;
        const locality = (el.querySelector('.locality') as HTMLElement).innerText;
        const price = (el.querySelector('.norm-price') as HTMLElement).innerText;

        return { img, name, locality, price };
      });
    });

    AllApartments.push(...apartments);
    console.log(apartments);
    console.log('*************************');
  }

  console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
  console.log(AllApartments);
  console.log(AllApartments.length);

  //await db_saveData(AllApartments);   will save data to database
  await browser.close();
})();
