$(document).ready(function () {    

    var key = '303bda03f4411976f702bf902ea85f54'; // API key













    // calling API on page load

    $.ajax({
        type: "POST",
        url: "https://api.openweathermap.org/data/2.5/weather?q=Lisbon&appid="+ key +"&units=metric",
        dataType: "json",
        success: function(result) {
            $('#error').remove();
            console.log(result)
                 





            // Creating needed HTML elements  

            $('#forecast').append(
                '<div class="forecastTable table-responsive pt-2 pb-2">' +
                    '<table class="table table-borderless m-0">'+
                        '<tbody>'+
                            '<tr>'+
                                '<td class="tdWidth30" id="date"></td>'+ // date
                                '<td class="tdWidth40"><h1 class="temperature m-0" id="temp"></h1></td>'+ // temp
                                '<td class="tdWidth30 align-middle">'+ // details
                                    '<table style="width:100%;" class="smallText">'+
                                        '<tr>'+ // minmaxtemp
                                            '<td style="text-align:right"><i class="fas fa-temperature-low orangeText"></i></td>'+ // maxmintemp icon
                                            '<td style="text-align:left" id="maxmin"></td>'+ // maxmintemp value
                                        '</tr>'+
                                        '<tr><td style="text-align:right"><i class="fas fa-wind orangeText"></i></td><td style="text-align:left" id="wind"></td></tr>'+ // wind
                                        '<tr><td style="text-align:right" id="humid"><img src="humid-orange.png"></td><td style="text-align:left" id="humidity"></td></tr>'+ // humidity
                                        '<tr><td style="text-align:right"><i class="fas fa-long-arrow-alt-down orangeText"></i></td><td style="text-align:left" id="pressure"></td></tr>'+ //pressure
                                    '</table>'+
                                '</td>'+
                            '</tr>'+
                        '</tbody>'+
                    '</table>'+
                '</div>'
            );
            //hover effect
            $('.forecastTable').hover(
                function() { $(this).addClass("hoverTable"); },
                function() { $(this).removeClass("hoverTable"); },
            );
            // making humidity symbol image the same size as the text
            $("#humid").find('img').css("height", $("#wind").outerHeight()); // comparing to text to get values
            var $img = $("#humid").find('img');
            $img.on('load', function() { $("#humid").find('img').css("height", $("#wind").outerHeight()); });                        
            window.onresize = function() { $("#humid").find('img').css("height", $("#wind").outerHeight()); }








            // Populating HTML

            $('#CityCountry').html(
                result.name + ', ' + result.sys.country +
                '<small class="smallText blueText" id="pin">'+
                    '&nbsp&nbsp&nbsp&nbsp<i class="fas fa-map-pin"></i>&nbsp'+
                '</small>'+
                '<small class="smallText" id="coords">'+
                    '[' + result.coord.lat + ', ' + result.coord.lon + ']'+
                '</small>');



            // calculations for the date/time

                var initialDateUtc = result.dt*1000;
                var dateresult = new Date(initialDateUtc);
                var day = dateresult.getDate();
                var month = dateresult.getMonth();
                var year = dateresult.getFullYear();
            $('#date').html(
                '<div class="m-0">'+
                    '<h5 id="today" class="m-0 orangeText">Today</h5>'+
                '</div>'+
                '<div class="smallText" id="todaydate">' + 
                    day + '/' + month + '/' + year + 
                '</div>'); 



            //removing decimals from temp results

                var truncatedtemp = Math.trunc(result.main.temp);
                var tempimg;
                if ( (truncatedtemp>=0) && (truncatedtemp<=10) ) { tempimg = '<i class="far fa-snowflake';
                } else if ( (truncatedtemp>=11) && (truncatedtemp<=25) ){ tempimg = '<i class="far fa-sun';
                } else if ( (truncatedtemp>=26) && (truncatedtemp<=50) ){ tempimg = '<i class="fas fa-fire';
                } else { tempimg = '<i class="fas fa-icicles'; }
            $('#temp').html(tempimg + ' orangeText"></i> ' + truncatedtemp + '&deg;');
                var truncatedmax = Math.trunc(result.main.temp_max);
                var truncatedmin = Math.trunc(result.main.temp_min);
            $('#maxmin').html(truncatedmax + '&deg; / ' + truncatedmin + '&deg;');
            $('#wind').html(result.wind.speed + ' m/s');
            $('#humidity').html(result.main.humidity + '&deg;');                
            $('#pressure').html(result.main.pressure + ' hPa');



            // fetching rest of forecast with one call
             
            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + result.coord.lat + '&lon=' + result.coord.lon + '&exclude=current,minutely,hourly,alerts&units=metric&appid=' + key)
            .then(function(resp){return resp.json()})
            .then(function(response){   
                response.daily.slice(1,7).map(function (value, index) { //ignoring current day


                    // Creating needed HTML elements  
                    
                    $('#forecast').append(
                        '<div class="forecastTable table-responsive pt-2 pb-2">' +
                            '<table class="table table-borderless m-0">'+
                                '<tbody>'+
                                    '<tr>'+
                                        '<td class="tdWidth30" id="date'+index+'"></td>'+ // date
                                        '<td class="tdWidth40"><h1 class="temperature m-0" id="temp'+index+'"></h1></td>'+ // temp
                                        '<td class="tdWidth30 align-middle">'+ // details
                                            '<table style="width:100%;" class="smallText">'+
                                                '<tr>'+ // minmaxtemp
                                                    '<td style="text-align:right"><i class="fas fa-temperature-low blueText"></i></td>'+ // maxmintemp icon
                                                    '<td style="text-align:left" id="maxmin'+index+'"></td>'+ // maxmintemp value
                                                '</tr>'+
                                                '<tr><td style="text-align:right"><i class="fas fa-wind blueText"></i></td><td style="text-align:left" id="wind'+index+'"></td></tr>'+ // wind
                                                '<tr><td style="text-align:right" id="humid'+index+'"><img src="humid-blue.png"></td><td style="text-align:left" id="humidity'+index+'"></td></tr>'+ // humidity
                                                '<tr><td style="text-align:right"><i class="fas fa-long-arrow-alt-down blueText"></i></td><td style="text-align:left" id="pressure'+index+'"></td></tr>'+ //pressure
                                            '</table>'+
                                        '</td>'+
                                    '</tr>'+
                                '</tbody>'+
                            '</table>'+
                        '</div>'
                    );
                    //hover effect
                    $('.forecastTable').hover(
                        function() { $(this).addClass("hoverTable"); },
                        function() { $(this).removeClass("hoverTable"); },
                    );
                    // making humidity symbol image the same size as the text
                    $("#humid"+index).find('img').css("height", $("#wind").outerHeight()); // comparing to text to get values
                    var $img = $("#humid"+index).find('img');
                    $img.on('load', function() { $("#humid"+index).find('img').css("height", $("#wind").outerHeight()); });                        
                    window.onresize = function() { $("#humid"+index).find('img').css("height", $("#wind").outerHeight()); }
                    
                    console.log(value);                     
                    


                    // calculations for the date/time
                        var initialDateUtc = value.dt*1000;
                        var dateresult = new Date(initialDateUtc);
                        var day = dateresult.getDate();
                        var month = dateresult.getMonth();
                        var year = dateresult.getFullYear();
                    $('#date'+index).html(
                        '<div class="m-0">'+
                            '<h5 id="dayDate'+index+'" class="m-0 blueText">' + 
                                day + '/' + month + '/' + year + 
                            '</h5>'+
                        '</div>'
                    ); 



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
                    $('#maxmin'+index).html(truncatedmax + '&deg; / ' + truncatedmin + '&deg;');
                    $('#wind'+index).html(value.wind_speed + ' m/s');
                    $('#humidity'+index).html(value.humidity + '&deg;');
                    $('#pressure'+index).html(value.pressure + ' hPa');     
                });                        
            });
        },
        error: function() { }
    });
























    // calling API for search

    $("#goSearch").click(function(){ 



        // Creating needed HTML elements   
        $('#error').remove();
        $('#forecast').empty();
        $('#forecast').html(
            '<div class="forecastTable table-responsive pt-2 pb-2">' +
                '<table class="table table-borderless m-0">'+
                    '<tbody>'+
                        '<tr>'+
                            '<td class="tdWidth30" id="date"></td>'+ // date
                            '<td class="tdWidth40"><h1 class="temperature m-0" id="temp"></h1></td>'+ // temp
                            '<td class="tdWidth30 align-middle">'+ // details
                                '<table style="width:100%;" class="smallText">'+
                                    '<tr>'+ // minmaxtemp
                                        '<td style="text-align:right"><i class="fas fa-temperature-low orangeText"></i></td>'+ // maxmintemp icon
                                        '<td style="text-align:left" id="maxmin"></td>'+ // maxmintemp value
                                    '</tr>'+
                                    '<tr><td style="text-align:right"><i class="fas fa-wind orangeText"></i></td><td style="text-align:left" id="wind"></td></tr>'+ // wind
                                    '<tr><td style="text-align:right" id="humid"><img src="humid-orange.png"></td><td style="text-align:left" id="humidity"></td></tr>'+ // humidity
                                    '<tr><td style="text-align:right"><i class="fas fa-long-arrow-alt-down orangeText"></i></td><td style="text-align:left" id="pressure"></td></tr>'+ //pressure
                                '</table>'+
                            '</td>'+
                        '</tr>'+
                    '</tbody>'+
                '</table>'+
            '</div>'
            );
            //hover effect
            $('.forecastTable').hover(
                function() { $(this).addClass("hoverTable"); },
                function() { $(this).removeClass("hoverTable"); },
            );
            // making humidity symbol image the same size as the text
            $("#humid").find('img').css("height", $("#wind").outerHeight()); // comparing to text to get values
            var $img = $("#humid").find('img');
            $img.on('load', function() { $("#humid").find('img').css("height", $("#wind").outerHeight()); });                        
            window.onresize = function() { $("#humid").find('img').css("height", $("#wind").outerHeight()); }


        // search input id 
        var citySearchName = $('#CitySearch').val();   
        
        
        $.ajax({ // calling API
            type: "POST",
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + citySearchName + "&appid=" + key + "&units=metric",
            dataType: "json",
            success: function(result) {
                console.log(result)
                              
                
                
                // Populating HTML
                $('#CityCountry').html(
                    result.name + ', ' + result.sys.country +
                    '<small class="smallText blueText" id="pin">'+
                        '&nbsp&nbsp&nbsp&nbsp<i class="fas fa-map-pin"></i>&nbsp'+
                    '</small>'+
                    '<small class="smallText" id="coords">'+
                        '[' + result.coord.lat + ', ' + result.coord.lon + ']'+
                    '</small>'
                );



                // calculations for the date/time
                    var dateresult = new Date(result.dt*1000);
                    var day = dateresult.getDate();
                    var month = dateresult.getMonth();
                    var year = dateresult.getFullYear();
                $('#date').html(
                    '<div class="m-0">'+
                        '<h5 id="today" class="m-0 orangeText">Today</h5>'+
                    '</div>'+
                    '<div class="smallText" id="todaydate">' +
                        day + '/' + month + '/' + year + 
                    '</div>'
                ); 


                
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
                $('#maxmin').html(truncatedmax + '&deg; / ' + truncatedmin + '&deg;');
                $('#wind').html(result.wind.speed + 'm/s');
                $('#humidity').html(result.main.humidity + '&deg;');
                $('#pressure').html(result.main.pressure + ' hPa');


                // fetching rest of forecast with one call
                fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + result.coord.lat + '&lon=' + result.coord.lon + '&exclude=current,minutely,hourly,alerts&units=metric&appid=' + key)
                .then(function(resp){return resp.json()})
                .then(function(response){   
                    response.daily.slice(1,7).map(function (value, index) { //ignoring current day
                        console.log(value);   


                         // Creating needed HTML elements  
                    
                        $('#forecast').append(
                            '<div class="forecastTable table-responsive pt-2 pb-2">' +
                                '<table class="table table-borderless m-0">'+
                                    '<tbody>'+
                                        '<tr>'+
                                            '<td class="tdWidth30" id="date'+index+'"></td>'+ // date
                                            '<td class="tdWidth40"><h1 class="temperature m-0" id="temp'+index+'"></h1></td>'+ // temp
                                            '<td class="tdWidth30 align-middle">'+ // details
                                                '<table style="width:100%;" class="smallText">'+
                                                    '<tr>'+ // minmaxtemp
                                                        '<td style="text-align:right"><i class="fas fa-temperature-low blueText"></i></td>'+ // maxmintemp icon
                                                        '<td style="text-align:left" id="maxmin'+index+'"></td>'+ // maxmintemp value
                                                    '</tr>'+
                                                    '<tr><td style="text-align:right"><i class="fas fa-wind blueText"></i></td><td style="text-align:left" id="wind'+index+'"></td></tr>'+ // wind
                                                    '<tr><td style="text-align:right" id="humid'+index+'"><img src="humid-blue.png"></td><td style="text-align:left" id="humidity'+index+'"></td></tr>'+ // humidity
                                                    '<tr><td style="text-align:right"><i class="fas fa-long-arrow-alt-down blueText"></i></td><td style="text-align:left" id="pressure'+index+'"></td></tr>'+ //pressure
                                                '</table>'+
                                            '</td>'+
                                        '</tr>'+
                                    '</tbody>'+
                                '</table>'+
                            '</div>'
                        );
                        //hover effect
                        $('.forecastTable').hover(
                            function() { $(this).addClass("hoverTable"); },
                            function() { $(this).removeClass("hoverTable"); },
                        );
                        // making humidity symbol image the same size as the text
                        $("#humid"+index).find('img').css("height", $("#wind").outerHeight()); // comparing to text to get values
                        var $img = $("#humid"+index).find('img');
                        $img.on('load', function() { $("#humid"+index).find('img').css("height", $("#wind").outerHeight()); });                        
                        window.onresize = function() { $("#humid"+index).find('img').css("height", $("#wind").outerHeight()); }
                        
                        // calculations for the date/time
                        var initialDateUtc = value.dt*1000;
                        var dateresult = new Date(initialDateUtc);

                        var day = dateresult.getDate();
                        var month = dateresult.getMonth();
                        var year = dateresult.getFullYear();
                        $('#date'+index).html(
                            '<div class="m-0">'+
                                '<h5 id="dayDate'+index+'" class="m-0 blueText">' + 
                                    day + '/' + month + '/' + year + 
                                '</h5>'+
                            '</div>'
                        ); 
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
                        $('#maxmin'+index).html(truncatedmax + '&deg; / ' + truncatedmin + '&deg;');
                        $('#wind'+index).html(value.wind_speed + ' m/s');
                        $('#humidity'+index).html(value.humidity + '&deg;');
                        $('#pressure'+index).html(value.pressure + ' hPa');     
                    });                        
                });
            },
            error: function() {
                var search = $('#CitySearch').val();
                if (search == '') { 
                    $('#resultsTop').append('<h1 class="error pb-4" id="error"></h1>');
                    $('#CityCountry').empty();
                    $('#forecast').empty();
                    $('#error').html('Please specify a City.');
                } else {    
                    $('#resultsTop').append('<h1 class="error pb-4" id="error"></h1>');
                    $('#CityCountry').empty();
                    $('#forecast').empty();
                    $('#error').html('We could not find the specified city. Please try again.');
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












