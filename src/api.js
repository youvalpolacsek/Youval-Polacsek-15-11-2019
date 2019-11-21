const express = require('express')
const router = express.Router()
const request = require(`request`)

//EZk7lwCgvMxLZ63jopfsNElyE4m0gzoH
// IBznG3HBLq1SGn1H89QUPGRISzmCs1C3
//Y4u8Yl9CLxtB6jVvMW3dIaAvHEDHxGGq
const apiKey = "RvOxpml8AjPaLka9rDtiuDAA6UIhms90"


router.get(`/city/:cityName`, function(req,res){
    let theCity = req.params.cityName
    request(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${theCity}`, function(err,response){
        let cityNames = JSON.parse(response.body)
        console.log(cityNames)
        let cityData = cityNames.map(c => c ={
            name:c.LocalizedName,
            key: c.Key
        })
        res.send(cityData)
    })
})

router.get(`/cityCurrent/:cityKey`, function(req, res){
    let cityKey = req.params.cityKey
    request(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`, function(err, response){
        let cityCurrentCondition = JSON.parse(response.body)
        // console.log("cityKey")
        let cityCurrentData = cityCurrentCondition.map(c=>c={
            tempCelcius: c.Temperature.Metric.Value,
            tempImperial: c.Temperature.Imperial.Value,
            WeatherIcon: c.WeatherIcon,
            WeatherText: c.WeatherText,
            Link: c.Link
        })
            res.send(cityCurrentData)
    }
    
    )
})

router.get(`/cityForecast/:cityKey`, function(req,res){
    let cityKey = req.params.cityKey
    request(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apiKey}&metric=true`, function(err,response){
        let data = JSON.parse(response.body)
        // console.log(data)
        let cityFiveDayForecast = data.DailyForecasts
        let fiveDayForecast = cityFiveDayForecast.map(d => d = {
                     date: d.Date,
                      minTemperature: d.Temperature.Minimum.Value,
                     maxTemperature: d.Temperature.Maximum.Value,
                     unit: d.Temperature.Maximum.Unit,
                     dayWeather: d.Day.IconPhrase,
                     dayIcon: d.Day.Icon,
                     nightWeather: d.Night.IconPhrase,
                       nightIcon: d.Night.icon,
                     })
        res.send(fiveDayForecast)
    })
})


// router.get(`/city/:cityName`, function(req,res){
//     let theCity = req.params.cityName
//     // console.log(theCity)
//     request(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${theCity}`, function(err,response){
//     let theData= JSON.parse(response.body)
//     let cityKey = theData[0].Key
//      console.log(cityKey)
//     // res.send()
//     request(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${apiKey}`, function (req,res){
//         let cityForecast = JSON.parse(res.body)
//         // console.log(cityForecast.DailyForecasts[0])
//          
//         console.log(fiveDayForecast)
//         res.send(fiveDayForecast)
//     }
//     )
// }
//     )
// }
//     )


module.exports = router