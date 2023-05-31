// ==UserScript==
// @name         New Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Sevastianova Nadezhda
// @match        https://www.google.com/*
// @match        https://napli.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let keywords = ["как использовать devtools браузера", "10 самых популярных шрифтов от Google", "Отключение редакций и ревизий", "Вывод произвольных типов записей"];
let keyword = keywords[getrandom(0, keywords.length)];
//let keyword = 'Работа с инструментом разработчика chrome';

let links = document.links;
let btnK = document.getElementsByName("btnK")[0];
let googleInput = document.getElementsByName("q")[0];

if (btnK !== undefined) {
    let i = 0;
    let timerId = setInterval(() => {
        googleInput.value += keyword[i];
        i ++;
        if (i == keyword.length) {
            clearInterval(timerId);
            btnK.click();
        }
    }, 500);
} else if (location.hostname == "napli.ru") {
    //работаем на целевом сайте
    console.log("мы на целевом сайте");
    setInterval(() => {
        let index = getrandom(0, links.length);
        //c долей вероятности 30% уйдем обратно искать
        if (getrandom(0, 101) >= 70) {
            location.href = "https://www.google.com/";
        }
        //перебираем ссылки и проверяем, что по ним можно кликнуть
        if (links[index].href.indexOf("napli.ru") != -1) links[index].click();
    }, getrandom(2000, 5000));
} else {
    let nextGooglePage = true;
    for (let i = 0; i < links.length; i++) {
        if (links[i].href.indexOf("napli.ru") != -1) {
            let link = links[i];
            nextGooglePage = false;
            console.log("нашел строку" + link);
            setTimeout(() => {
                link.click();
            }, getrandom(2500, 5000))
            break;
        }
    }
    //если не нашли на первой странице выдачи
    let elementExist = setInterval(() => {
        let element = document.querySelector(".YyVfkd");
        if (element != null) {
            if (element.innerText == "5") {
                nextGooglePage = false;
                location.href = "https://www.google.com/";
            }
            clearInterval(elementExist);
        }
    }, 100)

    if (nextGooglePage) {
        setTimeout(() => {
            pnnext.click();
        }, getrandom(3000, 8000))
    }
}
function getrandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
