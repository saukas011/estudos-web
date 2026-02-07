function weatherApp(){
    const tempEl = document.querySelector(".temp");
    const referenceTempEl = document.querySelector(".reference-temp");
    const windSpeedEl = document.querySelector(".wind-speed");
    const humidityEl = document.querySelector(".humidity");
    const greaterCitiesEl = document.querySelector(".city-list");
    const standartCityEl = document.querySelector(".standart-city");
    const searchEngine = document.querySelector("#search-input");
    const suggestionsEl = document.querySelector(".suggestions");
    const searchIcon = document.querySelector(".search-icon")
    const candidateCities = ["Rio de Janeiro", "Dubai", "Bangkok", "Las Vegas"];
    const availableCities = [
        "Abu Dhabi", "Amsterdam", "Athens", "Auckland", "Bali", "Bangkok", "Barcelona", "Beijing",
        "Belo Horizonte", "Berlin", "Bogota", "Bora Bora", "Boston", "Brasília", "Brisbane", "Brussels", 
        "Budapest", "Buenos Aires", "Cairo", "Cancun", "Cape Town", "Cartagena", "Casablanca", "Chicago", 
        "Copenhagen", "Curitiba", "Cusco", "Doha", "Dubai", "Dublin", "Edinburgh", "Florence", "Fortaleza", 
        "Geneva", "Hanoi", "Havana", "Ho Chi Minh City", "Hong Kong", "Honolulu","Istanbul", "Jakarta", 
        "Jerusalem", "Johannesburg", "Kuala Lumpur", "Kyoto", "Lagos", "Las Vegas", "Lima", "Lisbon", 
        "Liverpool", "London", "Los Angeles", "Macau", "Madrid", "Manchester", "Manaus", "Manila", 
        "Marrakech", "Medellin", "Melbourne", "Mexico City", "Miami", "Milan", "Monaco", "Montevideo", 
        "Montreal", "Moscow", "Mumbai", "Munich", "Nairobi", "Naples", "New Delhi", "New York", "Orlando", 
        "Osaka", "Oslo", "Panama City", "Paris", "Perth", "Petra", "Phuket", "Porto", "Prague", "Quito", 
        "Recife", "Reykjavik", "Rio de Janeiro", "Riyadh", "Rome", "Salvador", "San Francisco", "Santiago", 
        "Santorini", "São Paulo", "Seattle", "Seoul", "Seville", "Shanghai", "Shenzhen", "Singapore", 
        "Stockholm", "Sydney", "Taipei", "Tel Aviv", "Tokyo", "Toronto", "Vancouver", "Venice", "Vienna", 
        "Warsaw", "Washington", "Zanzibar", "Zurich"
    ];

    async function getWeather(city){
        try{
            //coloque sua key aqui! para cria-la, acesse openweathermap.org
            //const apiKey = process.env.API_KEY;
            const apiKey = '4b9d929503af7af2e14c5bdd0626e1a0';

            let coords = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
            if(!coords){
                throw new Error("erro ao buscar cidade");
            }
            coords = await coords.json();
            const lat = coords[0].lat;
            const lon = coords[0].lon;
            
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4b9d929503af7af2e14c5bdd0626e1a0&units=metric`);
            const data = await res.json();
            if(!data) throw new Error("erro ao buscar informações");
            standartCityEl.innerHTML = city;
            tempEl.innerHTML = `${Math.round(data.main.temp)}°C`;
            referenceTempEl.innerHTML = `${Math.round(data.main.temp)}°C`;
            windSpeedEl.innerHTML = `Vento: ${(data.wind.speed).toFixed(1)}m/s`
            humidityEl.innerHTML = `Umidade: ${data.main.humidity}%`
            greaterCitiesEl.innerHTML = '<p>carregando...</p>'
            
            const referenceTemp = Math.round(data.main.temp);
            getCitiesGreaterThanTemp(availableCities, apiKey, referenceTemp);
        }catch(err){
            console.error(err);
        }
    } 
    getWeather('São Paulo');

    async function getCitiesGreaterThanTemp(availableCities, apiKey, referenceTemp){
        try{
            const foundCities = [];
            for(let city of availableCities){
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
        let greaterCitiesList = '';

        for(let item of foundCities)
            greaterCitiesList += `<li class="city">${item[0]}..................${Math.ceil(item[1])}°C</li>`;

        greaterCitiesEl.innerHTML = greaterCitiesList;
        if (foundCities.length === 0) {
            greaterCitiesEl.innerHTML = `<p style='text-align:center'>Nenhuma cidade da lista está mais quente que ${city}.</p>`;
            return;
        }
    }

    document.addEventListener('click', function(e){
        const clickedElement = e.target;

        if(clickedElement === searchEngine){
            let suggestionsList = '';
            for(let item of candidateCities)
                suggestionsList += `<li class="search-item">${item}</li>`; 
            
            suggestionsEl.innerHTML = suggestionsList;
            suggestionsEl.classList.add("selected");
            searchEngine.classList.add("selected");
            searchIcon.classList.add("selected");
        }else{
            suggestionsEl.classList.remove("selected");
            searchEngine.classList.remove("selected");
            searchIcon.classList.remove("selected");
        }

        if(clickedElement.classList.contains("search-item")){
            getWeather(clickedElement.textContent.trim());
        }
    })

    function search(input){
        if(!input) return [];
        const results = [];
        const userInput = toSearchTerm(input);

        for(let city of availableCities){
            if(toSearchTerm(city).startsWith(userInput)) results.push(city);
            if(results.length>=5) break;
        }
        return results;
    }

    
    let timer = null;
    searchEngine.addEventListener('input', function(e){
        clearTimeout(timer);
        suggestionsEl.innerHTML = "Buscando..."
        timer = setTimeout(() => {
            const results = search(searchEngine.value);
            let matchListEl = '';
            for(let item of results)
                matchListEl += `<li class="search-item">${item}</li>`;

            suggestionsEl.innerHTML = matchListEl;
            if(!matchListEl) suggestionsEl.innerHTML = "Sem resultados para a busca";
        }, 500);
    });

    function toSearchTerm(str) {
        return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    }
}
weatherApp();