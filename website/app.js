const weatherAPIKey = '&appid=e542f831aca4693ae9887bddb0efe71d';
const openWeatherMapBaseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';

async function getZipCodeWeather(zipCode = '') {
    const url = openWeatherMapBaseUrl + zipCode + "&units=imperial" + weatherAPIKey;
    const cityWeather = await fetch(url);
    try {
        const cityWeatherJson = await cityWeather.json();
        console.log("Temp:", cityWeatherJson.main.temp);
        return cityWeatherJson.main.temp;
    } catch (error) {
        console.log('error', error);
    }
}

const form = document.getElementById("temp-form");

async function sendAndReceiveProjectData (event) {
    event.preventDefault();
    let date = document.getElementById("date").value;
    let zipCode = document.getElementById("zip-code").value;
    let temp = await getZipCodeWeather(zipCode);

    let userInput = document.getElementById("user-input").value;
    let data = {
        "date": date,
        "temp": temp,
        "userInput": userInput,
    };
    const response = await fetch('http://localhost:3000/project-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        body: JSON.stringify(data),
    });
    console.log("response:", response);
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}
form.addEventListener('submit', sendAndReceiveProjectData);
