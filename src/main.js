import "./style.css";
import { isToday } from "date-fns";

// NEED A H1 for SEO

import weatherHeader from "./header";
import weatherTimeCard from "./hour";
import weatherDayCard from "./week";

const API_KEY = process.env.API_KEY;
const url = `http://api.openweathermap.org/data/2.5/weather?q=London&APPID=${API_KEY}&units=metric`;
const forecast = `http://api.openweathermap.org/data/2.5/forecast?q=London&APPID=${API_KEY}&units=metric`;

const elements = {
  dashboards: {
    overview: document.querySelector(".weather-overview"),
    timeview: document.querySelector(".dashbaord-time"),
    weekview: document.querySelector(".dashboard-week"),
    all: [
      document.querySelector(".weather-overview"),
      document.querySelector(".dashbaord-time"),
      document.querySelector(".dashboard-week"),
    ],
  },
};

async function getForecast(url, forecast) {
  try {
    const getWeather = await fetch(url, { mode: "cors" });
    const getForecast = await fetch(forecast, { mode: "cors" });

    if (getWeather.status !== 200) return console.log(getWeather.status); // https://stackoverflow.com/a/57503632

    const weatherData = await getWeather.json();
    const forecastData = await getForecast.json();

    let remove = [];

    for (const dashboard of elements.dashboards.all) {
      dashboard.childNodes.forEach((node) => remove.push(node));
    }

    if (remove.length !== 0) {
      remove.forEach((node) => {
        node.remove();
      });
      remove = [];
    }

    weatherHeader(weatherData);

    const ahead = processWeek(forecastData);

    weatherTimeCard(forecastData);
    weatherDayCard(ahead);
  } catch (error) {
    console.log(error);
  }
}

getForecast(url, forecast);

function processWeek(data) {
  const array = [];

  array.push(data.list[0]);

  for (const item of data.list) {
    const date = new Date(item.dt_txt.slice(0, 10));
    const time = item.dt_txt.slice(11, 13);

    if (!isToday(date) && time === "12") array.push(item);
  }

  return array;
}

const magicCurtain = document.querySelector(".magic-curtain");
const clickables = document.querySelectorAll(".nav-icon");
clickables.forEach((icon) => icon.addEventListener("click", handleEvent));

function handleEvent(e) {
  magicCurtain.classList.add("curtain-call");

  // await data
  setTimeout(() => {
    magicCurtain.classList.remove("curtain-call");
  }, 1600);
}

const inputSearch = document.querySelector("input");
inputSearch.addEventListener("keypress", handleInput);

function handleInput(e) {
  if (e.key === "Enter" && e.target.value.trim().length !== 0) {
    const city = e.target.value.toLowerCase().trim();
    //console.log(city);

    const weatherTodayURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`;
    const weatherAheadURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${API_KEY}&units=metric`;
    getForecast(weatherTodayURL, weatherAheadURL);
  }
}
