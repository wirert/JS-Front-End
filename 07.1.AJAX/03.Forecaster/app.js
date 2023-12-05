function attachEvents() {
  document.querySelector("input#submit").addEventListener("click", getWeather);
  const conditions = {
    Sunny: "&#x2600",
    "Partly sunny": "&#x26C5;",
    Overcast: "&#x2601;",
    Rain: "&#x2614;",
  };

  let location;
  let currCondition;
  let threeDayForecast;
  const forecastDiv = document.querySelector("#forecast");

  async function getWeather() {
    forecastDiv.style.display = "block";
    forecastDiv.innerHTML = `<div id="current">
      <div class="label">Current conditions</div>
      </div>
      <div id="upcoming">
      <div class="label">Three-day forecast</div>
      </div>`;
    try {
      location = await getLocation();

      currCondition = await (
        await fetch(
          `http://localhost:3030/jsonstore/forecaster/today/${location.code}`
        )
      ).json();

      console.log(currCondition);

      threeDayForecast = await (
        await fetch(
          `http://localhost:3030/jsonstore/forecaster/upcoming/${location.code}`
        )
      ).json();

      visualizeCurrCondition(currCondition);

      visualizeThreeDayForecast(threeDayForecast);
    } catch (_) {
      forecastDiv.textContent = "Error";
      return;
    }
  }

  async function getLocation() {
    const locations = await (
      await fetch("http://localhost:3030/jsonstore/forecaster/locations")
    ).json();
    const lookUpLocation = document.querySelector("input#location").value;
    location = locations.find((l) => l.name === lookUpLocation);

    if (!location) {
      throw new Error();
    }

    return location;
  }

  function visualizeCurrCondition(currCondition) {
    const currConditionDiv = document.createElement("div");
    currConditionDiv.classList.add("forecasts");

    const conditionSymbol = conditions[currCondition.forecast.condition];
    currConditionDiv.appendChild(
      createSpan(conditionSymbol, "condition", "symbol")
    );

    const conditionSpan = createSpan("", "condition");

    conditionSpan.appendChild(createSpan(currCondition.name, "forecast-data"));
    conditionSpan.appendChild(
      createSpan(
        `${currCondition.forecast.low}&#176;/${currCondition.forecast.high}&#176;`,
        "forecast-data"
      )
    );
    conditionSpan.appendChild(
      createSpan(currCondition.forecast.condition, "forecast-data")
    );

    currConditionDiv.appendChild(conditionSpan);
    forecastDiv.querySelector("#current").appendChild(currConditionDiv);
  }

  function visualizeThreeDayForecast(forecast) {
    //console.log(forecast);
    const threeDayForecastDiv = document.createElement("div");
    threeDayForecastDiv.classList.add("forecast-info");

    forecast.forecast.forEach((dayForecast) => {
      threeDayForecastDiv.appendChild(createOneDayForecast(dayForecast));
    });

    forecastDiv.querySelector("#upcoming").appendChild(threeDayForecastDiv);
  }

  function createOneDayForecast(forecast) {
    const upcomingSpan = createSpan("", "upcoming");
    const conditionSymbol = conditions[forecast.condition];
    upcomingSpan.appendChild(createSpan(conditionSymbol, "symbol"));

    upcomingSpan.appendChild(
      createSpan(
        `${forecast.low}&#176;/${forecast.high}&#176;`,
        "forecast-data"
      )
    );

    upcomingSpan.appendChild(createSpan(forecast.condition, "forecast-data"));

    return upcomingSpan;
  }

  function createSpan(text, ...classes) {
    const span = document.createElement("span");
    span.classList.add(...classes);
    span.innerHTML = text;

    return span;
  }
}

attachEvents();
