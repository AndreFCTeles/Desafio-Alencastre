$(document).ready(function () {


    var getWeather = function(){

        var key = '303bda03f4411976f702bf902ea85f54'; // API key
        var cityName = $('CitySearch').val(); // search input id

        if (cityName == ''){
            $('#error').html("No city specified on the search bar");
        } else {
            $.getJSON('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + key + '&units=metric', function(json) {
                console.log(json);
                
                if (json != "Nothing found."){
                    //apresentar o conteudo
                } else {
                    $('#error').html("We couldn't find the specified city. Please try again.");
                }
            });
        }
    }



    $('#goSearch').click(getWeather); // search button
   
    $('#CitySearch').keyup(function(event){   
        if(event.keyCode == 13){   
            getWeather();   
        }   
    });

});








    










