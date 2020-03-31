const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 3000;

app.use(express.static('website'));

app.get('/', function (req, res) {
    console.log("Get method received.");
    res.send("hello world");
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

const weatherAPIKey = 'e542f831aca4693ae9887bddb0efe71d';
// full URL=api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
const openWeatherMapBaseUrl = 'http://api.openweathermap.org/data/2.5/weather?q={';

let projectData = {'fake': 1};

async function getCityWeather(url='') {
    const cityWeather = await fetch(url);
    try {
        return cityWeather.json();
    } catch (error) {
        console.log('error', error);
    }
}

function returnProjectdata (req, res) {
    res.send(projectData);
}

app.get('/project-data', returnProjectdata);