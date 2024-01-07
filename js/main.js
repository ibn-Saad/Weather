const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const d = new Date();
let today = week[d.getDay()];
let tomorrow = week[(d.getDay()+1)%7];
let afterTomorrow = week[(d.getDay()+2)%7];

document.querySelector('.today').innerHTML = today;
document.querySelector('.tomorrow').innerHTML = tomorrow;
document.querySelector('.afterTomorrow').innerHTML = afterTomorrow;


const apikey = "7fba3e875b824190b3b113240240601";

var searchBar = document.querySelector(".searchBar");

async function getData(city) {
  let response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${city}&days=3`
  );
  var data = await response.json();
  getToday(data);
  getTomorrow(data);
  getAfterTomorrow(data);
};

function getToday(data) {
  document.querySelector(".date").innerHTML = data.forecast.forecastday[0].date;
  document.querySelector(".city").innerHTML = data.location.name;
  document.querySelector(".temp").innerHTML = data.current.temp_c + "°C";
  document.querySelector(".icon").src = data.current.condition.icon;
  document.querySelector(".condtion").innerHTML = data.current.condition.text;
  document.querySelector(".rain").innerHTML = data.forecast.forecastday[0].day.daily_chance_of_rain + " %";
  document.querySelector(".speed").innerHTML = data.current.wind_kph + " km/h";
  document.querySelector(".dir").innerHTML = data.current.wind_dir;
};

function getTomorrow(data) {
    document.querySelector('.tIcon').src = data.forecast.forecastday[1].day.condition.icon;
    document.querySelector('.tMaxTemp').innerHTML = data.forecast.forecastday[1].day.maxtemp_c+ "°C";
    document.querySelector('.tMinTemp').innerHTML = data.forecast.forecastday[1].day.mintemp_c+ "°C";
    document.querySelector('.tCond').innerHTML = data.forecast.forecastday[1].day.condition.text;
}

function getAfterTomorrow(data) {
    document.querySelector('.atIcon').src = data.forecast.forecastday[2].day.condition.icon;
    document.querySelector('.atMaxTemp').innerHTML = data.forecast.forecastday[2].day.maxtemp_c+ "°C";
    document.querySelector('.atMinTemp').innerHTML = data.forecast.forecastday[2].day.mintemp_c+ "°C";
    document.querySelector('.atCond').innerHTML = data.forecast.forecastday[2].day.condition.text;
}

searchBar.addEventListener('keyup', function() {
    var city = searchBar.value;
    getData(city);
})





getData('cairo');
