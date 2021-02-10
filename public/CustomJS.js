$(document).ready(function () {

    $.ajax({ // calling API for page load
        type: "POST",
        url: "https://api.openweathermap.org/data/2.5/weather?q=Lisbon&appid=303bda03f4411976f702bf902ea85f54&units=metric",
        // no need to use vars for the parameters in this case
        dataType: "json",
        success: function(result) {
            console.log(result)
                
            // Populating HTML
            $('#CityCountry').html(
                result.name + ', ' + result.sys.country +
                '<small class="smallText blueText" id="pin">&nbsp&nbsp&nbsp&nbsp<i class="fas fa-map-pin"></i></small><small class="smallText" id="coords"> [' +
                result.coord.lat + ', ' + result.coord.lon + ']</small>');
            // calculations for the date/time
                var dateresult = new Date(result.dt*1000);
                var day = dateresult.getDate();
                var month = dateresult.getMonth();
                var year = dateresult.getFullYear();
            $('#date').html('<div class="m-0"><h5 id="today" class="m-0 orangeText">Today</h5></div><div class="smallText" id="todaydate">' + day + '/' + month + '/' + year + '</div>'); 
            //removing decimals from temp results
                var truncatedtemp = Math.trunc(result.main.temp);
                var tempimg;
                if ( (truncatedtemp>=0) && (truncatedtemp<=10) ) {
                    tempimg = '<i class="far fa-snowflake';
                } else if ( (truncatedtemp>=11) && (truncatedtemp<=25) ){
                    tempimg = '<i class="far fa-sun';
                } else if ( (truncatedtemp>=26) && (truncatedtemp<=50) ){
                    tempimg = '<i class="fas fa-fire';
                } else {
                    tempimg = '<i class="fas fa-icicles';
                }
            $('#temp').html(tempimg + ' orangeText"></i> ' + truncatedtemp);
                var truncatedmax = Math.trunc(result.main.temp_max);
                var truncatedmin = Math.trunc(result.main.temp_min);
            $('#maxmin').html('<i class="fas fa-temperature-low orangeText"></i> ' + truncatedmax + '&deg; / ' + truncatedmin + '&deg;');
            $('#wind').html('<i class="fas fa-wind orangeText"></i> ' + result.wind.speed + ' m/s');


            $('#humidity').html('<img src="humid-orange.png"> ' + result.main.humidity + '&deg;');
                // making humidity symbol image the same size as the text
                $("#humidity").find('img').css("height", $("#wind").outerHeight()); // comparing to text to get values
                    var $img = $("#humidity").find('img');
                    $img.on('load', function() {
                        $("#humidity").find('img').css("height", $("#wind").outerHeight());
                    });                        
                    window.onresize = function() {
                        $("#humidity").find('img').css("height", $("#wind").outerHeight());
                     }
            $('#pressure').html('<i class="fas fa-long-arrow-alt-down orangeText"></i> ' + result.main.pressure + ' hPa');
        },
        error: function(xhr, status, error) {
            alert("Error: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
        }
    });

    $("#goSearch").click(function(){ // calling API for search  
        var key = '303bda03f4411976f702bf902ea85f54'; // API key
        var citySearchName = $('#CitySearch').val(); // search input id

        $.ajax({ // calling API
            type: "POST",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + citySearchName + "&appid=" + key + "&units=metric",
            dataType: "json",
            success: function(result) {
                console.log(result)
                                
            // Populating HTML
            $('#CityCountry').html(
                result.name + ', ' + result.sys.country +
                '<small class="smallText blueText" id="pin">&nbsp&nbsp&nbsp&nbsp<i class="fas fa-map-pin"></i></small><small class="smallText" id="coords"> [' +
                result.coord.lat + ', ' + result.coord.lon + ']</small>');
            // calculations for the date/time
                var dateresult = new Date(result.dt*1000);
                var day = dateresult.getDate();
                var month = dateresult.getMonth();
                var year = dateresult.getFullYear();
            $('#date').html('<div class="m-0"><h5 id="today" class="m-0 orangeText">Today</h5></div><div class="smallText" id="todaydate">' + day + '/' + month + '/' + year + '</div>'); 
            //removing decimals from temp results
                var truncatedtemp = Math.trunc(result.main.temp);
                var tempimg;
                if ( (truncatedtemp>=0) && (truncatedtemp<=10) ) {
                    tempimg = '<i class="far fa-snowflake';
                } else if ( (truncatedtemp>=11) && (truncatedtemp<=25) ){
                    tempimg = '<i class="far fa-sun';
                } else if ( (truncatedtemp>=26) && (truncatedtemp<=50) ){
                    tempimg = '<i class="fas fa-fire';
                } else {
                    tempimg = '<i class="fas fa-icicles';
                }
            $('#temp').html(tempimg + ' orangeText"></i> ' + truncatedtemp);
                var truncatedmax = Math.trunc(result.main.temp_max);
                var truncatedmin = Math.trunc(result.main.temp_min);
            $('#maxmin').html('<i class="fas fa-temperature-low orangeText"></i> ' + truncatedmax + '&deg; / ' + truncatedmin + '&deg;');
            $('#wind').html('<i class="fas fa-wind orangeText"></i> ' + result.wind.speed + 'm/s');
            $('#humidity').html(/*'<img src="humid.png">' + */result.main.humidity + '&deg;');
            $('#pressure').html('<i class="fas fa-wind orangeText"></i> ' + result.main.pressure + ' hPa');
            },
            error: function(xhr, status, error) {
                alert("Error: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
            }
        });
    });

    $('#CitySearch').keypress(function(e){// search on Enter key pressed
        if(e.which == 13){
            $('#goSearch').click();
        }
    });


});












