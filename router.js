const puppeteer = require('puppeteer');
const express = require('express');
const router = express.Router();
router.post('/scraping', async (req, res) => {
    const body = req.body
    const username = body.username //'104716652'
    const password = body.password //'vbp197111'
    const browser = await puppeteer.launch({
        headless: true, // The browser is visible
        ignoreHTTPSErrors: true,
        args:[
            '--start-maximized' // you can also use '--start-fullscreen'
        ]
    });
    const page = await browser.newPage();
    await page.goto('https://www.scotiabank.cl/login/personas/');
    await page.type('#Validate_rut', username);
    await page.type('#pass', password);
    await page.click('.login_pass');
    setTimeout(async () => {
        const getData = async() => {
            return await page.evaluate(async () => {
                return await new Promise(async (resolve) => {
                    const iframe =  await document.querySelectorAll('iframe')
                    const value1 = iframe[0].contentWindow.document.body.getElementsByClassName('avatar__wrap')[0].innerText
                    const value2 = iframe[0].contentWindow.document.body.getElementsByClassName('subheading')[0].innerText
                    const value3 = iframe[0].contentWindow.document.body.querySelectorAll('.card--flat .text--roman')[0].innerText
                    resolve ({
                        value1: value1, 
                        value2: value2,
                        value3: value3
                    })
                })
            })
        }  
        
        result = await getData();
        res.send({
            success: 1,
            data: result
        })
    }, 10000)
})

module.exports = router;