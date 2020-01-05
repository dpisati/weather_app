import React, { Component } from "react";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";
import "./App.css";

const API_KEY = "6449bc47480892a73c673c47e860d735";

export class App extends Component {
  state = {
    temperature: undefined,
    temp_min: undefined,
    temp_max: undefined,
    wind: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: undefined,
    error: undefined
  };

  capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await api_call.json();

    if (data.cod === "404") {
      console.log(data);
      this.setState({
        temperature: undefined,
        temp_min: undefined,
        temp_max: undefined,
        wind: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        icon: undefined,
        error: "Please enter a valid city name."
      });
    } else if (city) {
      console.log(data);
      this.setState({
        temperature: data.main.temp,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        wind: data.wind.speed,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: this.capitalizeFirstLetter(data.weather[0].description),
        icon: data.weather[0].icon,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        temp_min: undefined,
        temp_max: undefined,
        wind: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        icon: undefined,
        error: "Please enter a value."
      });
    }
  };
  render() {
    return (
      <div className="main">
        <div className="titles">
          <Titles />
        </div>
        <div className="form">
          <Form getWeather={this.getWeather} />
        </div>
        <div className="weather">
          <Weather
            temperature={this.state.temperature}
            temp_min={this.state.temp_min}
            temp_max={this.state.temp_max}
            wind={this.state.wind}
            city={this.state.city}
            country={this.state.country}
            humidity={this.state.humidity}
            description={this.state.description}
            icon={this.state.icon}
            error={this.state.error}
          />
        </div>
      </div>
    );
  }
}

export default App;
