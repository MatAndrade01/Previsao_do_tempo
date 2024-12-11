"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("#search-form > form");
const input = document.querySelector("#input-localizacao");
const sectioTempoInfos = document.querySelector("#tempo-info");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    if (!input || !sectioTempoInfos)
        return;
    const localizacao = input.value;
    if (localizacao.length < 3) {
        alert("O local precisa ter pelo menos 3 letras");
        return;
    }
    try {
        const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&APPID=dbd3b02d8958d62185d02e944cd5f522&lang=pt_br&units=metric`);
        const data = yield response.json();
        console.log(data);
        const infos = {
            temperatuda: Math.round(data.main.temp),
            local: data.name,
            icone: ` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png `,
        };
        sectioTempoInfos.innerHTML = `
            <div class="tempo-dados">
                <h2>${infos.local}</h2>
                
                <span>${infos.temperatuda}°C</span>
            </div>
    
            <img src="${infos.icone}">
        `;
    }
    catch (erro) {
        console.log("Deu um erro ao consultar a API", erro);
    }
}));
