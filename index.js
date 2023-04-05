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
    await page.click('#contents > ytd-video-renderer:nth-child(1) img');
    
    await page.waitForNavigation(); 
    await browser.close();
    }
)();

//
    