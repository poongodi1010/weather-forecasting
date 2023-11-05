//'use strict';
//Containers from HTML

const countriesContainer = document.querySelector(".countries");
const locationInputContainer = document.querySelector(".location-input");
let locInputContainer = document.querySelector(".location");
let searchBarContainer = document.querySelector(".button");
const plusSymbolClass = document.querySelector(".plus");
plusSymbolClass.style.display = "none";
const dateFieldContainer = document.querySelector(".date-field");
const day5Name = document.querySelector(".day5");
const daysConatiner = document.querySelector(".days-grid-container");
day5Name.style.display = "none";
const miscContainer = document.querySelector(".misc");
const broadcastContainer = document.querySelector(".boradcast-grid-container");
let broadcastDetailsDisplayContainer = document.querySelector(
  ".broadcast-details-display-container"
);
let firstContainer = document.querySelector(".first-container");
let broadcastHeadingContainer = document.querySelector(".broadcast-heading");
let sunmoonContainer = document.querySelector(".sun-moon-container");
let backContainer = document.querySelector(".back-container");
backContainer.style.display = "none";
let secondContainer = document.querySelector(".second-container");

let input = document.querySelector("#location");
locInputContainer.classList.remove("plus-input-button");
locInputContainer.classList.add("location");
//To get city name when user clicks enter from keyboard
input.addEventListener("keydown", function (e) {
  console.log("event", e);
  console.log("input", input.value);
  if (e.key === "Enter") {
    callback(input.value);
  }
});

//To get city name when user click search bar button
searchBarContainer.addEventListener("click", function (e) {
  callback(input.value);
});

//callback function to call api and to get the weather forcast details
let callback = function (city) {
  weather(city);
};

//Real function calls api
let weaDAta = "";
const weather = async function (city) {
  const weatherRes = await fetch(
    `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=e69be7dda514443fbf2a0f8956521a7a&days=5`
  );
  console.log("17", weaDAta);
  weaDAta = await weatherRes.json();
  console.log("19", weaDAta);

  renderWeather(weaDAta);
};

//calling renderWeather to display all the details
const renderWeather = function (weatherData) {
  let datesOfForecast = [];
  let tempOfForecast = [];

  for (let i = 0; i < weatherData.data.length; i++) {
    datesOfForecast.push(weatherData.data[i].valid_date);
    tempOfForecast.push(Math.floor(weatherData.data[i].high_temp));
  }

  let dateStr = [];
  let day = [];
  let dayDate = [];
  let todayResult = [];
  let dateInDd = [];
  let dateInMm = [];
  let formattedDate = [];
  let formmattedDateString = [];

  for (let i = 0; i < datesOfForecast.length; i++) {
    dateStr.push(datesOfForecast[i]); //Date as string "2023-08-17"
    dayDate.push(new Date(dateStr[i])); //Date as in date format Thu Aug 2023...
    day.push(dayDate[i].getDay()); // Day count (0 to 6)
    todayResult.push(dayDate[i].toString().slice(0, 3)); //Days name eg: Thu, Fri..

    dateInDd.push(dateStr[i].substring(8, 10));
    dateInMm.push(dateStr[i].substring(5, 7));
    formattedDate.push(`${dateInDd[i]}/${dateInMm[i]}`);
    formmattedDateString = formattedDate.toString();
  }
  const newDateArray = [...formattedDate];

  let articleContainer = document.querySelector("#weather");

  //to display weather details
  let html = ` 
  
  <article id="weather">
  <div class="weather-container" >
  <div class="weather_data grid-item">
          <img class="weather_img" src="${
            weatherData.data[0].weather.icon
          }.png"/>
          
            
            <h1 class="temp">${Math.round(
              weatherData.data[0].max_temp
            )} <sup>&#8451;/&#8457;</sup></h1>
            <h3 class="wdesc">${weatherData.data[0].weather.description} </h3>
            </div>
          
          </div>
        </article> 
        `;

  //date nd current day details
  const weekDay = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentDay = new Date(weatherData.data[0].datetime);

  const dateField = `
  <article id="date-field-container" >
  <h1 class="heading"> ${weatherData.city_name} </h1>
        <h2> ${weekDay[currentDay.getDay()]} </h2> 
        <h3>${formattedDate[0]} </h3>
        <h4 >Max: ${Math.round(
          weatherData.data[0].max_temp
        )}<span><sup>&#8451;</sup></span>&emsp; Min: ${Math.round(
    weatherData.data[0].min_temp
  )} <span><sup>&#8451;</sup></span></h4>
        <h4 class="weather_humidity">Humidity: ${weatherData.data[0].rh}%</h4>
        </article>
        `;

  day5Name.style.display = "block";

  //Broadcast details for 5 days
  let broadCastInsertion = `  `;

  for (let i = 0; i < weatherData.data.length; i++) {
    broadCastInsertion += `
    <div class="broadcast-grid-item"> 
  <h3> ${weatherData.data[i].datetime
    .split("-")
    .splice(1)
    .reverse()
    .join("/")}</h3>
    <img class="weather_img" src="${
      weatherData.data[i].weather.icon
    }.png"/>
    <h3 class="weather_temp">${Math.round(
      weatherData.data[i].max_temp
    )}&deg; </h3>
    <h4 style="text-align: none">${weatherData.data[i].weather.description}</h4>
    </div>
    `;
  }

  broadCastInsertion += `</div>`;

  //Insertions to HTML page from JS
  plusSymbolClass.style.display = "block";
  plusSymbolClass.classList.add("pluss");
  plusSymbolClass.classList.add("plus-container");
  locationInputContainer.style.display = "none";
  countriesContainer.style.display = "block";
  miscContainer.style.display = "block";
  countriesContainer.insertAdjacentHTML("beforeend", html);
  dateFieldContainer.insertAdjacentHTML("beforeend", dateField);
  secondContainer.style.display = "none";
  broadcastContainer.insertAdjacentHTML("beforeend", broadCastInsertion);

  //to display second page with complete details
  //let gridItem = document.querySelector(".boradcast-grid-container");
  let gridItem = document.querySelectorAll(".broadcast-grid-item");
  let booleanCounter = true;

  for (let i = 0; i < gridItem.length; i++) {
    console.log("before", gridItem[i]);
    gridItem[i].addEventListener("click", function (event) {
      console.log("after", gridItem[i]);
      console.log("event ", event);
      console.log("226", event.target.parentElement.innerText);

      if (event.target.parentElement.className === "broadcast-grid-item") {
        let value = event.target.parentElement.innerText;

        let str = value.replace(/\s+/g, " ");
        console.log("str is", str);
        let finalValue = str.slice(0, 6).trim();
        console.log("after", finalValue);

        booleanCounter = false;

        //calling function to display all the details
        for (let i = 0; i < weatherData.data.length; i++) {
          if (
            finalValue ===
            weatherData.data[i].datetime
              .split("-")
              .splice(1)
              .reverse()
              .join("/")
          ) {
            firstContainer.style.display = "none";
            backContainer.style.display = "block";
            secondContainer.style.display = "block";
            displayBroadcastDetails(weatherData.data[i]);
            //event.target.parentElement.innerText = " ";
          }
        }
      }
    });
  }

  const goodTime = new Date();
  const result = goodTime.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  //display the forecast details

  let backButtonPressed = "false";

  function displayBroadcastDetails(weather_data) {
    console.log("boolean", backButtonPressed);
    if (backButtonPressed === "true") {
      secondContainer.style.display = "none";
      broadcastHeadingContainer.innerHTML = "";
      broadcastDetailsDisplayContainer.innerHTML = "";
      sunmoonContainer.innerHTML = "";
      backButtonPressed = "false";
    }

    //first part with current weather and time
    secondContainer.style.display = "none";
    broadcastHeadingContainer.innerHTML = "";
    broadcastDetailsDisplayContainer.innerHTML = "";
    sunmoonContainer.innerHTML = "";
    secondContainer.style.display = "block";
    let broadcastDisplay = ``;
    console.log("290", weather_data);
    console.log("291", broadcastDisplay);
    console.log("294");
    broadcastDisplay += `
    <div class="curr-container">
    <div class="curr-img">
    <h1 class="head-h1"> Current Weather </h1>
    </div>
    <div class="curr-text">
    <h3 class="head-time"> ${result} </h3>
    </div>
    </div>
    <div class="side">
    
    <div class="image">
    <img  class="disp-img" src="${
      weather_data.weather.icon
    }.png"/></div>
    <div class="text">
    <h1 class="disp-desc">${Math.round(
      weather_data.max_temp
    )}<span ><sup class="span-ele">&deg;</sup></span></h1>
    </div>
    </div>
      `;

    broadcastDisplay += ``;

    const sunriseTimeStamp = timeCoversion(weather_data.sunrise_ts);

    const sunsetTimeStamp = timeCoversion(weather_data.sunset_ts);

    const moonsetTimeStamp = timeCoversion(weather_data.moonset_ts);

    const moonRiseTimeStamp = timeCoversion(weather_data.moonrise_ts);
    console.log("328", sunriseTimeStamp);

    //second part with image and temp
    let broadcastDescription = ``;

    broadcastDescription += `
    <div class="broadcast-display-grid-item">
    <h3 class="bd-h2">RealFeel     &emsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${Math.round(
      weather_data.app_max_temp
    )} &deg;</h3>
    <h3 class="bd-h2">Max-Temp &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${Math.round(
      weather_data.max_temp
    )} &deg;</h3>
    <h3 class="bd-h2">Min-Temp &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${Math.round(
      weather_data.min_temp
    )} &deg;</h3>
    
   
    </div>
    <div class="broadcast-display-grid-item">
<h3 class="bd-h3">Pressure &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;${Math.round(
      weather_data.pres
    )}mb </h3>
    <h3 class="bd-h3">Cloud Coverage &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; ${
      weather_data.clouds
    }%</h3>
    <h3 class="bd-h3">Probbility of Precipitation &emsp;&emsp;${
      weather_data.pop
    }%</h3>
    </div>
    `;
    //hthird part to display sun and moon timings
    let sunmoonDisplay = ``;

    sunmoonDisplay += `
    <div class="sunmoon-grid-item">
    <h3 class="sun head"> Sun Rise / Sun Set</h3>
<h4 class="sun"> Sunrise &emsp; ${sunriseTimeStamp}&nbsp;AM </h4>
<h4 class="sun"> Sunset  &emsp;&nbsp; ${sunsetTimeStamp}&nbsp;PM </h4>
    </div>
    <div class="sunmoon-grid-item">
    <h3 class="moon head"> Moon Rise / Moon Set </h3>
    <h4 class="moon"> Moonrise &emsp; ${moonRiseTimeStamp}&nbsp;PM </h4>
    <h4 class="moon"> Moonset  &emsp;&nbsp; ${moonsetTimeStamp}&nbsp;AM </h4>
    </div>
    `;

    //insertions for second page

    broadcastHeadingContainer.insertAdjacentHTML("beforeend", broadcastDisplay);
    broadcastDetailsDisplayContainer.insertAdjacentHTML(
      "beforeend",
      broadcastDescription
    );
    sunmoonContainer.insertAdjacentHTML("beforeend", sunmoonDisplay);
  }

  backContainer.addEventListener("click", function () {
    backContainer.style.display = "none";
    firstContainer.style.display = "block";
    secondContainer.style.display = "none";
    backButtonPressed = "true";
    console.log("boolean in back loop", backButtonPressed);
  });
};

function timeCoversion(unixTimestamp) {
  let dateObj = new Date(unixTimestamp * 1000);
  let hours = dateObj.getHours();
  let minutes = "0" + dateObj.getMinutes();
  let formatTime = `${hours}:${minutes.substr(-2)}`;
  return formatTime;
}

//when pressed plus symbol hide evenrything except location bar
const plusSymbol = document.querySelector(".plus");
plusSymbol.addEventListener("click", function () {
  locationInputContainer.style.display = "block";

  // locationInputContainer.classList.add("location-input-second");
  locInputContainer.classList.remove("location");
  locInputContainer.classList.add("plus-input-button");
  countriesContainer.style.display = "none";
  miscContainer.style.display = "none";
  countriesContainer.innerHTML = "";
  dateFieldContainer.innerHTML = "";
  daysConatiner.innerHTML = "";
  console.log("innerhtml", locInputContainer);
  console.log("input value", input.value);
  input.value = "";
  console.log("278", broadcastContainer);
  broadcastContainer.innerHTML = "";
  secondContainer.style.display = "none";
  plusSymbolClass.classList.add("plus-second");
  plusSymbolClass.classList.remove("pluss");
  plusSymbolClass.classList.add("plus-container");
});
