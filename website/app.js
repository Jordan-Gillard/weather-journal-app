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

async function getData(data) {
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
        return await response.json();
    } catch (error) {
        console.log("error", error);
    }
}

async function sendAndReceiveProjectData(event) {
    event.preventDefault();
    let date = document.getElementById("date-val").value;
    let zipCode = document.getElementById("zip").value;
    let temp = await getZipCodeWeather(zipCode);

    let userInput = document.getElementById("feelings").value;
    let data = {
        "date": date,
        "temp": temp,
        "userInput": userInput,
    };

    await getData(data)
        .then(updateUI);
}

const form = document.getElementById("generate");
form.addEventListener('click', sendAndReceiveProjectData);

function updateUI(newData) {
    const dataDiv = document.getElementById('allData');
    dataDiv.innerHTML = '';
    function addDiv(dataDict) {
        let newDiv = document.createElement("div");
        newDiv.textContent = "Date: " + dataDict.date + ", Temperature: " + dataDict.temp + ", Response: " + dataDict.userInput + ".";
        dataDiv.appendChild(newDiv);
    }
    newData.forEach(addDiv);
}
