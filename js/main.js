// Foursquare API Info
const clientId = 'NCQ5IQTHG5HKHE4SUVBG1GQXEEVEU35WTORXKB1NWGUGLOQD';
const clientSecret = 'SZZ11DHGVATODLABLA12ODSSDLIJHQ5Y24PKF4O1ITR34LMJ';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = 'c1474d53a7af5587d05d6f8b32c2934e';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// Add AJAX functions here:
const getVenues = async (promise) => {
  const city = $input.val();
  const urlToFetch = url + city + '&limit=10&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20201022';
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
      console.log(venues);
      return venues;
    }
  } catch (error) {
    console.log(error);
  }
  return promise;
}

const getForecast = async (promise) => {

  const urlToFetch = weatherUrl + '?&q=' + $input.val() + '&APPID=' + openWeatherKey;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
  } catch (error) {

    console.log(error);
  }

  return promise;
};

// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  let dayToday = new Date().getDay();
  let today = weekDays[dayToday];
  let weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);
};

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
  getForecast().then(f => renderForecast(f));
  return false;
};

$submit.click(executeSearch)

document.getElementById("button").onclick = function() {
  document.getElementById("weatherText").style.color = 'black';
  document.getElementById("venues").style.backgroundColor = '#d5d5d5';
}