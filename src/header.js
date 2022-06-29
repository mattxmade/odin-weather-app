import { format } from "date-fns";

import day_snow from "./day_snow.webp";
import day_rain from "./day_rain.webp";
import day_clear from "./day_clear.webp";
import day_clouds from "./day_clouds.webp";

import night_snow from "./night_snow.webp";
import night_storm from "./night_storm.webp";
import night_rain from "./night_rain.webp";
import night_clouds from "./night_clouds.webp";
import night_clear from "./night_clear.webp";

const weatherImages = {
  day: {
    Clear: { src: day_clear, alt: "Clear sky at daytime" },
    Clouds: { src: day_clouds, alt: "Cloudy sky at daytime" },
    Drizzle: { src: day_rain, alt: "Drizzly sky at daytime" },
    Rain: { src: day_rain, alt: "Rainy sky at daytime" },
    Snow: { src: day_snow, alt: "Snowy sky at daytime" },
    ThunderStorm: { src: night_storm, alt: "Thundery sky at daytime" },
  },

  night: {
    Clear: { src: night_clear, alt: "Clear sky at night-time" },
    Clouds: { src: night_clouds, alt: "Cloudy sky at night-time" },
    Drizzle: { src: night_rain, alt: "Drizzly sky at night-time" },
    Rain: { src: night_rain, alt: "Rainy sky at night-time" },
    Snow: { src: night_snow, alt: "Snowy sky at night-time" },
    ThunderStorm: { src: night_storm, alt: "Thundery sky night-time" },
  },
};

// https://stackoverflow.com/a/62397158
function getLocalDateTime(timezone) {
  const date = new Date();
  const localTime = date.getTime();
  const localOffset = date.getTimezoneOffset() * 60000;
  const utc = localTime + localOffset;
  const location = utc - 1000 * -timezone;

  return new Date(location);
}

function updateTime(timezone, element) {
  const date = getLocalDateTime(timezone);
  setTimeout(() => {
    element.textContent =
      format(date, "EEEE dd MMMM yyyy") + ", " + date.toString().slice(16, 21);
    updateTime(timezone, element);
  }, 1000);
}

function weatherHeader(data) {
  const date = getLocalDateTime(data.timezone);

  const div = document.querySelector(".weather-overview");

  // ul
  const ul = document.createElement("ul");
  ul.classList.add("weather-location");

  // li
  const liCity = document.createElement("li");
  liCity.classList.add("js-ov-city");
  liCity.textContent = `${data.name}, ${data.sys.country}`;
  ul.appendChild(liCity);

  // li
  const liDate = document.createElement("li");
  liDate.classList.add("js-ov-date");
  liDate.textContent =
    format(date, "EEEE dd MMMM yyyy") + ", " + date.toString().slice(16, 21);

  updateTime(data.timezone, liDate);

  ul.appendChild(liDate);
  div.appendChild(ul);

  // div
  const divInfo = document.createElement("div");
  divInfo.classList.add("weather-info");
  //div
  const infoCol1 = document.createElement("div");
  infoCol1.classList.add("weather-info-col-1");
  // p
  const pTempNow = document.createElement("p");
  pTempNow.id = "js-temp-now";
  pTempNow.classList.add("weather-info-temp");
  pTempNow.textContent = `${Math.round(data.main.temp)}°`;
  infoCol1.appendChild(pTempNow);
  // div
  const infoTempGroup = document.createElement("div");
  infoTempGroup.classList.add("weather-info-temp-grp");

  // icon
  const iconHi = document.createElement("i");
  iconHi.classList.add("fas");
  iconHi.classList.add("fa-location-arrow");
  iconHi.classList.add("arrow-1");
  infoTempGroup.appendChild(iconHi);

  // p
  const pTempHi = document.createElement("p");
  pTempHi.classList.add("js-temp-hi");
  pTempHi.textContent = `${Math.round(data.main.temp_max)}°`;
  infoTempGroup.appendChild(pTempHi);

  // icon
  const iconLo = document.createElement("i");
  iconLo.classList.add("fas");
  iconLo.classList.add("fa-location-arrow");
  iconLo.classList.add("arrow-2");
  infoTempGroup.appendChild(iconLo);

  // p
  const pTempLo = document.createElement("p");
  pTempLo.classList.add("js-temp-lo");
  pTempLo.textContent = `${Math.round(data.main.temp_min)}°`;
  infoTempGroup.appendChild(pTempLo);

  infoCol1.appendChild(infoTempGroup);
  divInfo.appendChild(infoCol1);

  const conditionContainer = document.createElement("div");
  conditionContainer.classList.add("weather-type");

  const conditionIcon = document.createElement("img");
  conditionIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  conditionIcon.alt = data.weather[0].main;
  conditionContainer.appendChild(conditionIcon);

  divInfo.appendChild(conditionContainer);

  const infoColMid = document.createElement("div");
  infoColMid.classList.add("weather-info-banner");

  //   const bannerIcon = document.createElement('img');
  //   bannerIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  //   bannerIcon.alt = data.weather[0].main;
  // infoColMid.appendChild(bannerIcon);

  const weatherImage = getWeatherConditionImage(
    data.weather[0].main,
    date.toString().slice(16, 18)
  );
  //console.log(weatherImage);

  const image = document.createElement("img");
  image.src = weatherImage.src;
  image.alt = weatherImage.alt;
  infoColMid.appendChild(image);

  divInfo.appendChild(infoColMid);

  // div
  const infoCol2 = document.createElement("div");
  infoCol2.classList.add("weather-info-col-2");

  const container1 = document.createElement("div");
  container1.classList.add("weather-advice");
  const container2 = document.createElement("div");
  container2.classList.add("weather-advice");

  // icon
  const iWear = document.createElement("i");
  iWear.classList.add("fas");
  iWear.classList.add("fa-tshirt");
  container1.appendChild(iWear);

  // p
  const pInfoTempHi = document.createElement("p");
  pInfoTempHi.classList.add("js-temp-hi");
  pInfoTempHi.classList.add("weather-info-wear");
  pInfoTempHi.textContent = `${Math.round(data.main.feels_like)}°`;
  container1.appendChild(pInfoTempHi);
  infoCol2.appendChild(container1);

  const iPercent = document.createElement("i");
  iPercent.classList.add("fas");
  //iPercent.classList.add('fa-umbrella');
  iPercent.classList.add("fa-wind");
  container2.appendChild(iPercent);

  // p
  const pInfoPercent = document.createElement("p");
  pInfoPercent.classList.add("js-temp-%");
  pInfoPercent.classList.add("weather-info-take");
  pInfoPercent.textContent = `${data.wind.deg}°`;
  container2.appendChild(pInfoPercent);
  infoCol2.appendChild(container2);

  divInfo.appendChild(infoCol2);

  div.appendChild(divInfo);
}

function getWeatherConditionImage(type, time) {
  //console.log(time);

  if (time < 10) {
    time = time.split("");
    time.splice(0, 1);
    time = time.join("");
  }

  time = Number(time);
  let image = "";

  if (time >= 6 && time < 20) {
    for (const condition in weatherImages.day) {
      if (type === condition) image = condition;
    }
    if (image !== "") return weatherImages.day[image];
  }

  if (time >= 20 || time < 6) {
    for (const condition in weatherImages.night) {
      if (type === condition) image = condition;
    }
    if (image !== "") return weatherImages.night[image];
  }
}

export default weatherHeader;
