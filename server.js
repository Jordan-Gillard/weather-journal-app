const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 3000;

app.use(express.static('website'));

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

let projectData = [];

function returnProjectData (req, res) {
    res.send(projectData);
}

app.get('/project-data', returnProjectData);

function addProjectData(req, res) {
    console.log("Received Data:", req.body);
    projectData.push(req.body);
    res.send(projectData);
}

app.post('/project-data', addProjectData);
