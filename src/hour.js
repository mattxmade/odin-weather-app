function weatherTimeCard(data) {
  //console.log(data)
  const parentUL = document.querySelector(".dashbaord-time");

  for (let i = 0; i !== 6; i++) {
    const listItem = document.createElement("li");
    listItem.classList.add("db-vertical");

    const pTemp = document.createElement("p");
    pTemp.classList.add("js-time-temp");
    pTemp.textContent = `${Math.round(data.list[i].main.temp)}°`;
    listItem.appendChild(pTemp);

    const div = document.createElement("div");
    div.className = "day-weather-icon";

    const imageIcon = document.createElement("img");
    imageIcon.src = `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`;
    imageIcon.alt = data.list[i].weather[0].main;
    div.appendChild(imageIcon);

    listItem.appendChild(div);

    const iTime = document.createElement("p");
    iTime.classList.add("js-time");
    iTime.textContent = data.list[i].dt_txt.slice(11, 16);
    listItem.appendChild(iTime);

    parentUL.appendChild(listItem);
  }
}

export default weatherTimeCard;
