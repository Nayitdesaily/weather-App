import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './weather.css'
import weatherVideo from  '../assets/weather.mp4'

const Weather = () => {

    const[weather, setWeather] = useState ({})
    const [isCentigrade, setIsCentigrade] = useState(true)
    const [temperature, setTemperature] = useState(0)

    useEffect (() => {
        const success = (position) => {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=778b6e9960db8300569746f6b31ecedf`)
            .then(res => {
                setWeather(res.data)
                setTemperature( (res.data.main.temp - 273.15).toFixed(2) )
            })
            
        }
        navigator.geolocation.getCurrentPosition(success)
    },[])
    

    const changeTemperature = () => {
        if(isCentigrade) {
            setIsCentigrade(false)
            setTemperature ( (( temperature * 9/5 ) + 32).toFixed(2) )
        }else {
            setIsCentigrade (true)
            setTemperature ( (( temperature - 32 ) * 5/9).toFixed(2) )
        }
    }       
    
    return (
        <div className='container'>
            <h1>Wheater App</h1>
            <h2>{weather.name} {weather.sys?.country}</h2>
            <div className='information'>
                <div className='principal-information'>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
                    <h3>{temperature} {isCentigrade? "°C" : "°F"}</h3>                    
                </div>
                <div className='second-information'>
                    <h4> {weather.weather?.[0].description} </h4>
                    <h4> Wind Speed: {weather.wind?.speed} m/s </h4>
                    <h4>Clouds: {weather.clouds?.all} % </h4>                        
                </div>
            </div>
            <button onClick={changeTemperature}>°C / °F</button>
            <video src={weatherVideo} autoPlay loop muted />
        </div>
    );
};

export default Weather;