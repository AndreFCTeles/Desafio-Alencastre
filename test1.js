function weatherBalloon( cityName) {
  var key = '303bda03f4411976f702bf902ea85f54';

  fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityName + '&appid=' + key)  
  .then(function(resp) { return resp.json() })
  .then(function(data) { })

};

window.onload = function() {
  weatherBalloon(Lisbon);
}

function drawWeather(d){
  var celcius = Math.round(parseFloat(d.main.temp)-273.15);

  document.getElementById('weather').innerHTML = d.weather[0].description;
  document.getElementById('temp').innerHTML = celcius + '&deg;';
  document.getElementById('city').innerHTML = d.name;
}

"http://api.openweathermap.org/data/2.5/weather?q=Lisbon&appid={}"