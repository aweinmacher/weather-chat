var fetch = function () {
    var title = $("#city").val();
    var buildUrl = `api.openweathermap.org/data/2.5/weather?q=${city}`
    // AJAX
    $.ajax({
      method: "GET",
      url: buildUrl,
      success: function (data) {
        console.log(data);
        // $(".book").empty();
        // // HANDLEBARS
        // var source = $("#weather-template").html();
        // var template = Handlebars.compile(source);
        // var newHTML = template(data);
        // $(".results").append(newHTML); 
        
        
        // END OF HANDLEBARS
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    }); // END OF AJAX
    $("#city").val("");
  };
  
  $(".search-city").on("click", fetch);