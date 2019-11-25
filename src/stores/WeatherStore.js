import { observable, action } from "mobx";
import axios from 'axios'


class WeatherStore {
    @observable showFav = false
    @observable cityCondArr = []
    @observable theCity = ""
    @observable currentText = ""
    @observable tempCelcius = ""
    @observable tempImperial = ""
    
    @action handleCityChange = (e) => this.theCity = e.target.value ;


    @action saveCityToFav = (key, city) => {
        let cityCurrentCondition = {
            key: key,
            cityName: city,
            currentText: this.currentText,
            tempCelcius: this.tempCelcius,
            tempImperial: this.tempImperial
        }
        console.log(cityCurrentCondition)
        this.cityCondArr.push(cityCurrentCondition)
    }

    @action removeCityFromFav = (name) => {
        let cityToDelete = this.cityCondArr.find(c => c.cityName == name)
        let newCityArr = [...this.cityCondArr]
        let index = newCityArr.indexOf(cityToDelete)
        newCityArr.splice(index, 1)
        console.log(newCityArr)
        this.cityCondArr =newCityArr
    }


    @action findCityCurrentCond = async (key) => {
            let currentCondition = await axios.get(`/cityCurrent/${key}`)
            this.currentText = currentCondition.data[0].WeatherText
            this.tempCelcius = currentCondition.data[0].tempCelcius
            this.tempImperial = currentCondition.data[0].tempImperial 
            console.log(currentCondition)
        }

}

export default new WeatherStore()