$(document).ready(function () {    

    var key = '303bda03f4411976f702bf902ea85f54'; // API key


    $.ajax({ // calling API on page load
        type: "POST",
        url: "https://api.openweathermap.org/data/2.5/weather?q=Lisbon&appid="+ key +"&units=metric",
        dataType: "json",
        success: function(result) {
            console.log(result)
                 
            // Creating needed HTML elements    
            $('#forecast').append('<div class="row pt-2 pb-2"><div class="col-3"><p id="date"></p></div><div class="col-6"><h1 class="temperature" id="temp"></h1></div><div class="col-3 smallText"><div id="maxmin"></div><div id="wind"></div><div id="humidity"></div><div id="pressure"></div></div></div>');
            // Populating HTML
            $('#CityCountry').html(
                result.name + ', ' + result.sys.country +
                '<small class="smallText blueText" id="pin">&nbsp&nbsp&nbsp&nbsp<i class="fas fa-map-pin"></i></small><small class="smallText" id="coords"> [' +
                result.coord.lat + ', ' + result.coord.lon + ']</small>');
            // calculations for the date/time
                var initialDateUtc = result.dt*1000;
                var dateresult = new Date(initialDateUtc);

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
            $('#temp').html(tempimg + ' orangeText"></i> ' + truncatedtemp + '&deg;');
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


            // fetching rest of forecast with one call
            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + result.coord.lat + '&lon=' + result.coord.lon + '&exclude=current,minutely,hourly,alerts&units=metric&appid=' + key)
            .then(function(resp){return resp.json()})
            .then(function(response){   
                response.daily.slice(1,7).map(function (value, index) { //ignoring current day
                    $('#results').append('<div class="row pt-2 pb-2"><div class="col-3"><p id="date'+index+'"></p></div><div class="col-6"><h1 class="temperature" id="temp'+index+'"></h1></div><div class="col-3 smallText"><div id="maxmin'+index+'"></div><div id="wind'+index+'"></div><div id="humidity'+index+'"></div><div id="pressure'+index+'"></div></div></div>');
                    console.log(value);                     
                    
                    // calculations for the date/time
                    var initialDateUtc = value.dt*1000;
                    var dateresult = new Date(initialDateUtc);
                    var day = dateresult.getDate();
                    var month = dateresult.getMonth();
                    var year = dateresult.getFullYear();
                    $('#date'+index).html('<div class="m-0"><h5 id="dayDate'+index+'" class="m-0 blueText">' + day + '/' + month + '/' + year + '</h5></div>'); 
                    //removing decimals from temp results
                        var truncatedtemp = Math.trunc(value.temp.day);
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
                    $('#temp'+index).html(tempimg + ' blueText"></i> ' + truncatedtemp + '&deg;');
                        var truncatedmax = Math.trunc(value.temp.max);
                        var truncatedmin = Math.trunc(value.temp.min);
                    $('#maxmin'+index).html('<i class="fas fa-temperature-low blueText"></i> ' + truncatedmax + '&deg; / ' + truncatedmin + '&deg;');
                    $('#wind'+index).html('<i class="fas fa-wind blueText"></i> ' + value.wind_speed + ' m/s');


                    $('#humidity'+index).html('<img src="humid-blue.png"> ' + value.humidity + '&deg;');
                        // making humidity symbol image the same size as the text
                        $("#humidity"+index).find('img').css("height", $("#wind").outerHeight()); // comparing to text to get values
                            var $img = $("#humidity").find('img');
                            $img.on('load', function() {
                                $("#humidity"+index).find('img').css("height", $("#wind").outerHeight());
                            });                        
                            window.onresize = function() {
                                $("#humidity"+index).find('img').css("height", $("#wind").outerHeight());
                            }
                    $('#pressure'+index).html('<i class="fas fa-long-arrow-alt-down blueText"></i> ' + value.pressure + ' hPa');     
                });                        
            });
        },
        error: function(xhr, status, error) {
            var search = $('#CitySearch').val();
            if (search == '') { 
                $('#error').html('Please specify a City.');
            } else {    
                $('#error').html('We couldn not find the specified city. Please try again.');
            }

        }
    });

    $("#goSearch").click(function(){ // calling API for search  
        var citySearchName = $('#CitySearch').val(); // search input id

        // Creating needed HTML elements   
        $('#forecast').empty();
        $('#forecast').html('');
        $('#forecast').html('<div class="row pt-2 pb-2"><div class="col-3"><p id="date"></p></div><div class="col-6"><h1 class="temperature" id="temp"></h1></div><div class="col-3 smallText"><div id="maxmin"></div><div id="wind"></div><div id="humidity"></div><div id="pressure"></div></div></div>');
            
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
                $('#pressure').html('<i class="fas fa-wind orangeText"></i> ' + result.main.pressure + ' hPa');


                // fetching rest of forecast with one call
                fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + result.coord.lat + '&lon=' + result.coord.lon + '&exclude=current,minutely,hourly,alerts&units=metric&appid=' + key)
                .then(function(resp){return resp.json()})
                .then(function(response){   
                    response.daily.slice(1,7).map(function (value, index) { //ignoring current day
                        console.log(value);   
                        $('#results').append('<div class="row pt-2 pb-2"><div class="col-3"><p id="date'+index+'"></p></div><div class="col-6"><h1 class="temperature" id="temp'+index+'"></h1></div><div class="col-3 smallText"><div id="maxmin'+index+'"></div><div id="wind'+index+'"></div><div id="humidity'+index+'"></div><div id="pressure'+index+'"></div></div></div>');
                        
                        // calculations for the date/time
                        var initialDateUtc = value.dt*1000;
                        var dateresult = new Date(initialDateUtc);

                        var day = dateresult.getDate();
                        var month = dateresult.getMonth();
                        var year = dateresult.getFullYear();
                        $('#date'+index).html('<div class="m-0"><h5 id="dayDate'+index+'" class="m-0 blueText">' + day + '/' + month + '/' + year + '</h5></div>'); 
                        //removing decimals from temp results
                            var truncatedtemp = Math.trunc(value.temp.day);
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
                        $('#temp'+index).html(tempimg + ' blueText"></i> ' + truncatedtemp + '&deg;');
                            var truncatedmax = Math.trunc(value.temp.max);
                            var truncatedmin = Math.trunc(value.temp.min);
                        $('#maxmin'+index).html('<i class="fas fa-temperature-low blueText"></i> ' + truncatedmax + '&deg; / ' + truncatedmin + '&deg;');
                        $('#wind'+index).html('<i class="fas fa-wind blueText"></i> ' + value.wind_speed + ' m/s');


                        $('#humidity'+index).html('<img src="humid-blue.png"> ' + value.humidity + '&deg;');
                            // making humidity symbol image the same size as the text
                            $("#humidity"+index).find('img').css("height", $("#wind").outerHeight()); // comparing to text to get values
                                var $img = $("#humidity").find('img');
                                $img.on('load', function() {
                                    $("#humidity"+index).find('img').css("height", $("#wind").outerHeight());
                                });                        
                                window.onresize = function() {
                                    $("#humidity"+index).find('img').css("height", $("#wind").outerHeight());
                                }
                        $('#pressure'+index).html('<i class="fas fa-long-arrow-alt-down blueText"></i> ' + value.pressure + ' hPa');     
                    });                        
                });




            },
            error: function(xhr, status, error) {
                var search = $('#CitySearch').val();
                if (search == '') { 
                    $('#error').html('Please specify a City.');
                } else {    
                    $('#error').html('We couldn not find the specified city. Please try again.');
                }
    
            }
        });
    });

    $('#CitySearch').keypress(function(e){// search on Enter key pressed
        if(e.which == 13){
            $('#goSearch').click();
        }
    });


});












