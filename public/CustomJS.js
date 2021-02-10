$(document).ready(function () {

    $.ajax({ // calling API for page load
        type: "POST",
        url: "https://api.openweathermap.org/data/2.5/weather?q=Lisbon&appid=303bda03f4411976f702bf902ea85f54&units=metric",
        // no need to use vars for the parameters in this case
        dataType: "json",
        success: function(result) {
            console.log(result)
                
            // Populating HTML
            $('#CityCountry').html(result.name + ', ' + result.sys.country + '<small id="coords">&nbsp&nbsp&nbsp&nbsp<i class="fas fa-map-pin"></i>[' + result.coord.lat + ', ' + result.coord.lon + ']</small>');
            // calculations for the date/time
                var dateresult = new Date(result.dt*1000);
                var day = dateresult.getDate();
                var month = dateresult.getMonth();
                var year = dateresult.getFullYear();
            $('#date').html('<div id="today">Today</div><div id="todaydate">' + day + '/' + month + '/' + year + '</div>'); 
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

    $("#goSearch").click(function(e){ // calling API for search  
        var key = '303bda03f4411976f702bf902ea85f54'; // API key
        var citySearchName = $('#CitySearch').val(); // search input id

        $.ajax({ // calling API
            type: "POST",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + citySearchName + "&appid=" + key + "&units=metric",
            dataType: "json",
            success: function(result) {
                console.log(result)
                
                // Populating HTML
            $('#CityCountry').html(result.name + ', ' + result.sys.country + '<small id="coords">&nbsp&nbsp&nbsp&nbsp<i class="fas fa-map-pin"></i>[' + result.coord.lat + ', ' + result.coord.lon + ']</small>');
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












