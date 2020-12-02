const { log } = require('console');
const express = require('express');
const path = require('path');
const request = require('requests');

const API_KEY = '1da36d42156feb64a523c441aafc4f48';
let port = process.env.PORT || 3000; 

const app = express();
app.use(express.static(path.join(__dirname, '../views')));
app.set('view engine', 'hbs');
app.set('views');

app.get('/', (req, res) => {
    let cityName = req.query.city;
    let weather, mainTemp, minTemp,maxTemp, city, weatherInfo, time;
    if (cityName == null) {
        cityName = 'New York';
        console.log("City is Not loaded");
        request(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
        .on('data', (chunks) => {
            // console.log("Chunks Loading : " + chunks);
            console.log(JSON.parse(chunks));
            weather = JSON.parse(chunks);

        }).on('end', (chunks) => {
            console.log("___NO_MORE_DATA____\n____CONNECTION_COSED____");
        }).on('error', (error) => {
            console.log("Error: " + error);
        })
    } else {
        console.log("Lock and Loaded");
        request(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
        .on('data', (chunks) => {
            // console.log("Chunks Loading : " + chunks);

            weather = JSON.parse(chunks);
            console.log(weather);
            console.log("City Name" + cityName);

            if (weather.cod == 404) {
                res.render('index', {
                    city: "Woah! a guy from another planet, we'll be there soon",
                    mainWeather: 0, 
                    desc: 0, 
                    date: 0, 
                    icon: 0,
                    temp: 0, 
                    minTemp: 0, 
                    maxTemp: 0, 
                });
            } else {
                res.render('index', {
                    mainWeather: weather.weather[0].main, 
                    desc: weather.weather[0].description, 
                    date: weather.weather[0].date, 
                    icon: weather.weather[0].icon,
                    temp: weather.main.temp, 
                    minTemp: weather.main.temp_min, 
                    maxTemp: weather.main.temp_max, 
                    city: weather.name, 
    
                });
            }

        }).on('end', (chunks) => {
            console.log("___NO_MORE_DATA____\n____CONNECTION_COSED____");
        }).on('error', (error) => {
            console.log("Error: " + error);
        })
    }
    console.log(cityName);
})

app.listen(port, () => {
    console.log("Listening on PORT : " + port);
})