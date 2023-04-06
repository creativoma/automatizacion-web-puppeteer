const puppeteer = require('puppeteer');

// Retorna el precio del euro en pesos argentinos en su valor Venta
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.infodolar.com/cotizacion-euro.aspx');
    await page.setViewport({width: 1080, height: 1024});
    await page.screenshot({path: './src/screenshot/infodolar.jpg'});

    // Seleccionamos este <td> document.querySelector("#CompraVenta > tbody > tr > td:nth-child(3)") y lo guardamos en una variable
    const td = await page.$("#CompraVenta > tbody > tr > td:nth-child(3)");
    // Obtenemos el texto de ese <td> y lo guardamos en una variable
    const text = await page.evaluate(td => td.dataset.order, td);
    // Imprimimos el texto
    console.log(text);
                
    await browser.close();
    }
)();

// Ejecuta una busqueda en youtube y reproduce el video de "Miley Cyrus - River ""
(async () => {
    const browser = await puppeteer.launch( { headless: false, slowMo: 50 });
    const page = await browser.newPage();

    await page.goto('https://www.youtube.com/');
    await page.setViewport({width: 1080, height: 1024});

    await page.click('#content > div.body.style-scope.ytd-consent-bump-v2-lightbox > div.eom-buttons.style-scope.ytd-consent-bump-v2-lightbox > div:nth-child(1) > ytd-button-renderer:nth-child(2) > yt-button-shape > button');

    await page.waitForSelector('input#search');   
    await page.type('input#search', 'Miley Cyrus - River');
    await page.keyboard.press('Enter');

    await page.waitForSelector('#contents > ytd-video-renderer:nth-child(1) img');
    await page.screenshot({path: './src/screenshot/youtube.jpg'});
    await page.click('#contents > ytd-video-renderer:nth-child(1) img');
    
    await page.waitForNavigation(); 
    await browser.close();
    }
)();

// Ejecuta una busqueda en Media Markt y hace captura de los 10 primeros productos de la busqueda "Playstation 5".
(async () => {
    const browser = await puppeteer.launch( { headless: false, slowMo: 50 });
    // const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.mediamarkt.es/');
    await page.setViewport({width: 1080, height: 1024});

    await page.waitForSelector('button#pwa-consent-layer-accept-all-button');   
    await page.keyboard.press('Enter');
    await page.screenshot({path: './src/screenshot/mediamarkt.jpg'});

    await page.waitForSelector('input.SearchForm__StyledTextInput-sc-2778fe1b-1');
    await page.type('input.SearchForm__StyledTextInput-sc-2778fe1b-1', 'Playstation 5');
    await page.keyboard.press('Enter');

    await page.waitForTimeout(2000);
    await page.screenshot({path: './src/screenshot/mediamarkt-productos.jpg'});

    const enlaces = await page.evaluate(() => {
        const products = document.querySelectorAll('a[data-test="mms-product-list-item-link"]');
        const titles = [];
        for (let i = 0; i < 3; i++) {
            titles.push(products[i].href);
        }
        return titles;
    });
    
    for (let i = 0; i < enlaces.length; i++) {
        await page.goto(enlaces[i]);
        await page.waitForSelector('h1.sc-hLBbgP');
        await page.evaluate(() => {
            window.scrollBy(0, 100);
        });
        await page.waitForTimeout(2000);
        await page.screenshot({path: `./src/screenshot/mediamarkt-producto-${i}.jpg`});
    }

    await browser.close();
    }
)();