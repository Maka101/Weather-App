const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const APIKey = " 9c9f93d78e032b5142be9f92c79efe02";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid= " + APIKey +"&unites="+ unit;
    
    https.get(url, function(response){
        console.log(response.statusCode);
    
    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<p>The weather is currently" + weatherDescription);
        res.write("<h1> The Temperature in "+ query +" is " + temp + "degree Celcius</h1>");
        res.write("<img src=" + imageURL + ">");
        res.send();
    
});
    
});
 
});
app.listen(3002, function(){
    console.log("Server is running on port 3002.");
});