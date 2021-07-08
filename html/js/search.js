const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const apiKey = "7aed673e0e5b52501e901f326574c065";


form.addEventListener("submit", e => {
  e.preventDefault();
  const listItems = list.querySelectorAll(".ajax-section .city");
  const inputVal = input.value;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather, timezone } = data;
      const icon = `https://openweathermap.org/img/wn/${
        weather[0]["icon"]
      }@2x.png`;
      const sunrise = convertToDateTimeStamp(sys.sunrise,timezone);
      const sunset = convertToDateTimeStamp(sys.sunset,timezone);
      const countryLocalTime = getLocalTimeOfCountry(timezone);


      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
          <h5>Localtime: ${countryLocalTime}</h5>
          <img src="https://www.countryflags.io/${sys.country}/flat/64.png">
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <div class="times">        
            <span>Sunrise: ${sunrise}</span><br>
            <span>Sunset: ${sunset}</span>
        </div>
        <figure>
          <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.innerHTML = markup;
      list.appendChild(li);

    })
    .catch(() => {
      msg.textContent = "Please search for a valid city 😩";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
});

function convertToDateTimeStamp(dateStamp,timezone) {
    dateStamp += timezone;
    var date = new Date(dateStamp * 1000);

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var secends = date.getSeconds();

    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    secends = secends < 10 ? '0' + secends : secends;
    var strTime = hours + ':' + minutes + ' ' + ampm;

    return strTime;

  }

  function getLocalTimeOfCountry(timezone){
    var currentTimeInSeconds=Math.floor(Date.now()/1000);
    const Time = convertToDateTimeStamp(currentTimeInSeconds,timezone);
    return Time;
  }