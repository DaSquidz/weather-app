const getWeatherData = (() => {
  //types of measurementUnit: metric, standard, imperial
  const cityWeather = async (city, measurementUnit = "metric") => {
    const fetchLink = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bb5208ffcf978dfc4848e928eee3fe13&units=${measurementUnit}`;
    const response = await fetch(fetchLink, {mode: 'cors'});
    const responseData = await response.json();

    const weatherType = responseData.weather[0].main;
    const temperature = responseData.main.temp;
    const humidity = responseData.main.humidity;
    const windSpeed = responseData.wind.speed;
    const country = responseData.sys.country;
    const timezone = responseData.timezone;
    const cityName = responseData.name;
    
    const processedWeather = {
      weatherType,
      temperature,
      humidity,
      windSpeed,
      country,
      timezone,
      cityName
    }
    return processedWeather;
  };
  return {
    cityWeather,
  }
})();

const populateDOM = (() => {
  const weatherTypeDOM = document.querySelector(".weather-type");
  const weatherCityDOM = document.querySelector(".weather-city");
  const weatherTempDOM = document.querySelector(".weather-temp");
  const weatherHumidityDOM = document.querySelector(".weather-humidity");
  const weatherWindDOM = document.querySelector(".weather-wind");
  
  
  //add unit of measurement later
  const populate = async (searchQuery) => {
    const processedWeather = await getWeatherData.cityWeather(searchQuery);
    
    weatherTypeDOM.innerText = `${processedWeather.weatherType}`;
    weatherCityDOM.innerText = `${processedWeather.cityName}, ${processedWeather.country}`;
    weatherTempDOM.innerText = `${Math.round(processedWeather.temperature)}°C`;
    weatherHumidityDOM.innerText = `Humidity: ${processedWeather.humidity}%`;
    weatherWindDOM.innerText = `Wind speed: ${processedWeather.windSpeed} km/h`;
  }
  return {
    populate,
  };
})();

const formSubmit = (() => {
  const form  = document.getElementsByTagName('form')[0];
  const search = document.querySelector('input');
  
  const submit = () => {
    let searchQuery = search.value;
    populateDOM.populate(searchQuery);
  }
  form.addEventListener("submit", submit);
  return {
    submit,
  };
})();
