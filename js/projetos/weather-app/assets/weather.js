function weatherApp(){
    const tempEl = document.querySelector(".temp");
    const referenceTempEl = document.querySelector(".reference-temp");
    const windSpeedEl = document.querySelector(".wind-speed");
    const humidityEl = document.querySelector(".humidity");
    const greaterEl = document.querySelector(".city-list");
    const candidateCities = [
        "Rio de Janeiro", "Fortaleza", "Cuiabá", "Dubai", "Bangkok", 
        "Miami", "Cairo", "Riyadh", "Singapore", "Jakarta", 
        "Manaus", "New Delhi", "Doha", "Phoenix", "Las Vegas"
    ];

    async function getWeather(city){
        try{
            //coloque sua key aqui! para cria-la, acesse openweathermap.org
            const apiKey = process.env.API_KEY;

            let coords = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},BR&limit=1&appid=${apiKey}`);
            if(!coords){
                throw new Error("erro ao buscar cidade");
            }
            coords = await coords.json();
            const lat = coords[0].lat;
            const lon = coords[0].lon;
            
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4b9d929503af7af2e14c5bdd0626e1a0&units=metric`);
            const data = await res.json();
            if(!data) throw new Error("erro ao buscar informações");
            greaterEl.innerHTML += '<p>carregando...</p>'
            tempEl.innerHTML = `${Math.round(data.main.temp)}°C`;
            referenceTempEl.innerHTML = `${Math.round(data.main.temp)}°C`;
            windSpeedEl.innerHTML = `Vento: ${(data.wind.speed).toFixed(1)}m/s`
            humidityEl.innerHTML = `Umidade: ${data.main.humidity}%`
            
            const referenceTemp = Math.round(data.main.temp);
            getCitiesGreaterThanTemp(candidateCities, apiKey, referenceTemp);
        }catch(err){
            console.error(err);
        }
    }
    getWeather('Joinville');

    async function getCitiesGreaterThanTemp(candidateCities, apiKey, referenceTemp){
        try{
            const foundCities = [];
            for(let city of candidateCities){
                let coords = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
                coords = await coords.json();
                if(!coords) throw new Error("erro ao buscar coordenadas de cidades extras");
                
                const lat = coords[0].lat;
                const lon = coords[0].lon;
                const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4b9d929503af7af2e14c5bdd0626e1a0&units=metric`)
                const data = await res.json();
                if(!data) throw new Error("erro ao buscar cidades");
                if (data.main.temp > referenceTemp) foundCities.push([city, data.main.temp]);
                if (foundCities.length >= 5) break; 
            }
            addCitiesToDOM(foundCities);
        }catch(err){
            console.log("erro ao buscar cidades extras:", err)
        }
    }
    function addCitiesToDOM(foundCities){
        let cityList = '';
        for(let item of foundCities){
            cityList += `<p class="city">${item[0]}..................${Math.ceil(item[1])}°C</p>`;
        }
        greaterEl.innerHTML = cityList;
        if (foundCities.length === 0) {
            greaterEl.innerHTML = "<p style='text-align:center'>Nenhuma cidade da lista é mais quente que aqui.</p>";
            return;
        }
    }
}
weatherApp();