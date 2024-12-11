const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null = document.querySelector("#input-localizacao");
const sectioTempoInfos = document.querySelector("#tempo-info");

form?.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!input || !sectioTempoInfos) return;

    const localizacao = input.value;

    if (localizacao.length < 3) {
        alert("O local precisa ter pelo menos 3 letras");
        return;
    }
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&APPID=dbd3b02d8958d62185d02e944cd5f522&lang=pt_br&units=metric`);
        const data = await response.json();
    
        console.log(data);
    
        const infos = {
            temperatuda: Math.round(data.main.temp),
            local: data.name,
            icone:` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png `,
        };
    
    
        sectioTempoInfos.innerHTML = `
            <div class="tempo-dados">
                <h2>${infos.local}</h2>
                
                <span>${infos.temperatuda}°C</span>
            </div>
    
            <img src="${infos.icone}">
        `;
    } catch (erro){
        console.log("Deu um erro ao consultar a API", erro);
    }
    
});