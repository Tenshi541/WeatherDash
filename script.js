/ Set variables and select DOM elements
const searchHistory = [];
const weatherApiRootUrl = 'https://api.openweathermap.org';
const weatherApiKey = '167907938925c9f8d762b3a1bd11b6f2';
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const todayContainer = document.querySelector('#today');
const forecastContainer = document.querySelector('#forecast');
const searchHistoryContainer = document.querySelector('#history');

// Add timezone plugins to day.js
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

// Render search history function
function renderSearchHistory() {
  searchHistoryContainer.innerHTML = '';

  for (let i = searchHistory.length - 1; i >= 0; i--) {
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-controls', 'today forecast');
    btn.classList.add('history-btn', 'btn-history');
    btn.setAttribute('data-search', searchHistory[i]);
    btn.textContent = searchHistory[i];
    searchHistoryContainer.append(btn);

  }
}

// Update history in local storage function
function appendToHistory(search) {
  if (searchHistory.indexOf(search) !== -1) return;
  searchHistory.push(search);
  localStorage.setItem('search-history', JSON.stringify(searchHistory));
  renderSearchHistory();
}

// Get search history from local storage function
function initSearchHistory() {
  const storedHistory = localStorage.getItem('search-history');
  if (storedHistory) searchHistory = JSON.parse(storedHistory);
  renderSearchHistory();
}

// Render current weather function
function renderCurrentWeather(city, weather) {
  const date = dayjs().format('M/D/YYYY');
  const tempF = weather.main.temp;
  const windMph = weather.wind.speed;
  const humidity = weather.main.humidity;
  const iconUrl = https://openweathermap.org/img/w/${weather.weather[0].icon}.png;
  const iconDescription = weather.weather[0].description || weather[0].main;

  const card = document.createElement('div');
  const cardBody = document.createElement('div');
  const heading = document.createElement('h2');
  const weatherIcon = document.createElement('img');
  const tempEl = document.createElement('p');
  const windEl = document.createElement('p');
  const humidityEl = document.createElement('p');

  card.setAttribute('class', 'card');
  cardBody.setAttribute('class', 'card-body');
  card.append(cardBody);

  heading.setAttribute('class', 'h3 card-title');
  tempEl.setAttribute('class', 'card-text');
  windEl.setAttribute('class', 'card-text');
  humidityEl.setAttribute('class', 'card-text');

  heading.textContent = ${ city } (${ date });
  weatherIcon.setAttribute('src', iconUrl);
  weatherIcon.setAttribute('alt', iconDescription);
  weatherIcon.setAttribute('class', 'weather-img');
  heading.append(weatherIcon);
  tempEl.textContent = Temp: ${ tempF }°F;
  windEl.textContent = Wind: ${ windMph } MPH;
  humidityEl.textContent = Humidity: ${ humidity } %;
  cardBody.append(heading, tempEl, windEl, humidityEl);

  todayContainer.innerHTML = '';
  todayContainer.append(card);
}

// Render forecast card function
function renderForecastCard(forecast) {
  const iconUrl = https://openweathermap.org/img/w/${forecast.weather[0].icon}.png;
  const iconDescription = forecast.weather[0].description;
  const tempF = forecast.main.temp;

  