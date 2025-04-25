const form = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const weatherCard = document.getElementById('weatherResult');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const location = locationInput.value.trim();
  if (!location) return;

  const apiKey = 'c934452e8de04d5aafd65015252504';
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.error) {
      alert("Location not found. Please try again.");
      return;
    }

    document.getElementById('cityName').textContent = `${data.location.name}, ${data.location.country}`;
    document.getElementById('tempC').textContent = data.current.temp_c;
    document.getElementById('condition').textContent = data.current.condition.text;
    document.getElementById('humidity').textContent = data.current.humidity;
    document.getElementById('wind').textContent = data.current.wind_kph;
    document.getElementById('conditionIcon').src = `https:${data.current.condition.icon}`;

    weatherCard.classList.remove('hidden');

  } catch (error) {
    alert("Error fetching weather data.");
    console.error("Fetch error:", error);
  }
});
