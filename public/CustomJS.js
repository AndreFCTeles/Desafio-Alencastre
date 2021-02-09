$(document).one('ready', function() {
    $.ajax({ // calling API
        type: "POST",
        url: "https://api.openweathermap.org/data/2.5/weather?q=Lisbon&appid=303bda03f4411976f702bf902ea85f54&units=metric",
        dataType: "json",
        success: function(result) {
            console.log(result)
                
            // Populating HTML
            $('#cityname').html(result.name);
            $('#countrycode').html(result.sys.country);
            $('#coords').html('[' + result.coord.lat + ', ' + result.coord.lon + ']');
            $('#date').html(result.dt);    
            $('#temp').html(result.main.temp);
                //if para o icone aqui, ou noutra function / outro método?    
            $('#maxmin').html(result.main.temp_max + '&deg; / ' + result.main.temp_min + '&deg;');
            $('#wind').html(result.wind.speed + 'm/s');
            $('#humidity').html(result.main.humidity);
            $('#pressure').html(result.main.pressure);
        },
        error: function(xhr, status, error) {
            alert("Error: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
        }
    });
});

$(document).ready(function () {

    $("#goSearch").click(function(e){        
        var key = '303bda03f4411976f702bf902ea85f54'; // API key
        var citySearchName = $('#CitySearch').val(); // search input id

        $.ajax({ // calling API
            type: "POST",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + citySearchName + "&appid=" + key + "&units=metric",
            dataType: "json",
            success: function(result) {
                console.log(result)
                
                // 
                $('#cityname').html(result.name);
                $('#countrycode').html(result.sys.country);
                $('#coords').html('[' + result.coord.lat + ', ' + result.coord.lon + ']');
                
                $('#date').html(result.dt);
    
                $('#temp').html(result.main.temp);
                    //if para o icone
    
                $('#maxmin').html(result.main.temp_max + '&deg; / ' + result.main.temp_min + '&deg;');
                $('#wind').html(result.wind.speed + 'm/s');
                $('#humidity').html(result.main.humidity);
                $('#pressure').html(result.main.pressure);
            },
            error: function(xhr, status, error) {
                alert("Error: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
            }
        });
    });




});












