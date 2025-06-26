const weatherApiKey = '6ae0db5472cb64623d67ab312ca105f6';

const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search_bar button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(weatherApiUrl + city + `&appid=${weatherApiKey}`);

    // If fetch data unsuccessful
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        if(window.innerWidth < 600){
            document.body.style.background = "url('img/bgmob.webp') no-repeat center center/cover fixed";
        }
        else{
            document.body.style.background = "url('img/bg.webp') no-repeat center center/cover fixed";
        }
    }
    
    // If fetch data successful
    else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".visibility").innerHTML = data.visibility + "m";

        document.querySelector(".container").style.color = "#000";
        document.querySelector(".hum").style.filter = "invert(1)";
        document.querySelector(".win").style.filter = "invert(1)";
        document.querySelector(".vis").style.filter = "invert(1)";
        
        // Cloudy Weather
        if (data.weather[0].main == 'Clouds') {
            weatherIcon.src = "img/clouds.svg";
            document.body.style.background = "url('gif/clouds.gif') no-repeat center center/cover fixed";
        }
        
        // Clear Weather
        else if (data.weather[0].main == 'Clear') {
            weatherIcon.src = "img/clear.svg";
            document.body.style.background = "url('gif/clear.gif') no-repeat center center/cover fixed";
        }
        
        // Rainy Weather
        else if (data.weather[0].main == 'Rain') {
            weatherIcon.src = "img/rain.svg";
            document.body.style.background = "url('gif/rain.gif') no-repeat center center/cover fixed";
            document.querySelector(".container").style.color = "#fff";
            document.querySelector(".hum").style.filter = "invert(0)";
            document.querySelector(".win").style.filter = "invert(0)";
            document.querySelector(".vis").style.filter = "invert(0)";
        }
        
        // Drizzle Weather
        else if (data.weather[0].main == 'Drizzle') {
            weatherIcon.src = "img/drizzle.svg";
            document.body.style.background = "url('gif/drizzle.gif') no-repeat center center/cover fixed";
            document.querySelector(".container").style.color = "#fff";
            document.querySelector(".hum").style.filter = "invert(0)";
            document.querySelector(".win").style.filter = "invert(0)";
            document.querySelector(".vis").style.filter = "invert(0)";
        }
        
        // Misty Weather
        else if (data.weather[0].main == 'Mist') {
            weatherIcon.src = "img/mist.svg";
            document.body.style.background = "url('gif/mist.gif') no-repeat center center/cover fixed";
        }
        
        // Smokey Weather
        else if (data.weather[0].main == 'Smoke') {
            weatherIcon.src = "img/smoke.svg";
            document.body.style.background = "url('gif/smoke.gif') no-repeat center center/cover fixed";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === "q") {
        searchBox.focus();
    }
});
