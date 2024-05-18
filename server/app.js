const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const routes = require('./routes/apiRoutes');

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

// Set up CORS and JSON parsing middleware
app.use(cors(corsOptions));

app.use(bodyParser.json()); // For parsing application/json

app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 5001;

app.use('/entity', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
