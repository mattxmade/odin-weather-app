import { format, isToday } from "date-fns";

function weatherDayCard(data) {
  const div = document.querySelector(".dashboard-week");

  for (let i = 0; i !== 5; i++) {
    const date = formatDate(data[i].dt_txt);

    const ul = document.createElement("ul");
    ul.classList.add("dashboard-week-list");

    const li = document.createElement("li");
    li.classList.add("day-view");

    const weekDateDiv = document.createElement("div");
    weekDateDiv.classList.add("db-week-date");

    const pDayName = document.createElement("p");
    pDayName.classList.add("week-day-name");
    pDayName.textContent = isToday(date) ? "Today" : format(date, "	iii");
    weekDateDiv.appendChild(pDayName);

    const pDayDate = document.createElement("p");
    pDayDate.classList.add("week-day-date");
    pDayDate.textContent = data[i].dt_txt.slice(6, 11).replace("-", "/");

    weekDateDiv.appendChild(pDayDate);
    li.appendChild(weekDateDiv);

    const weekConditionDiv = document.createElement("div");
    weekConditionDiv.classList.add("db-week-condition");

    const imageIcon = document.createElement("img");
    imageIcon.src = `http://openweathermap.org/img/wn/${data[i].weather[0].icon}@2x.png`;
    imageIcon.alt = data[i].weather[0].main;
    weekConditionDiv.appendChild(imageIcon);

    const pDayCondition = document.createElement("p");
    pDayCondition.classList.add("week-day-condition");
    pDayCondition.textContent = data[i].weather[0].description;
    weekConditionDiv.appendChild(pDayCondition);
    li.appendChild(weekConditionDiv);

    const weekTempDiv = document.createElement("div");
    weekTempDiv.classList.add("db-week-temperature");

    const pTempHi = document.createElement("p");
    pTempHi.classList.add("week-day-hi");
    pTempHi.textContent = `${Math.round(data[i].main.temp_max)}°`;
    weekTempDiv.appendChild(pTempHi);

    const pTempLo = document.createElement("p");
    pTempLo.classList.add("week-day-lo");
    pTempLo.textContent = `${Math.round(data[i].main.temp_min)}°`;
    weekTempDiv.appendChild(pTempLo);
    li.appendChild(weekTempDiv);

    ul.appendChild(li);
    div.appendChild(ul);
  }
}

function formatDate(str) {
  return new Date(str.slice(0, 10));
}

export default weatherDayCard;
