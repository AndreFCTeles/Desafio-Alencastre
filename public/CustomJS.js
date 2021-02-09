$(document).ready(function () {


    $("#goSearch").click(function(){

        var key = '303bda03f4411976f702bf902ea85f54'; // API key
        var cityName = $('#CitySearch').val(); // search input id

        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + key + '&units=metric')
        .then(function(resp){ return resp.json() })
        .then(function(){
            $('#cityname').html(name);
            $('#countrycode').html(country);
            $('#coords').html('[' + lat + ', ' + lon + ']');
            
            $('#date').html(dt);

            $('#temp').html(temp);
            //if para o icone

            $('#maxmin').html(temp_max + '&deg; / ' + temp_min + '&deg;');
            $('#wind').html(speed + 'm/s');
            $('#humidity').html(humidity);
            $('#pressure').html(pressure);
        })
        .catch(function(){
            //catch errors
        });
    });



});








    










