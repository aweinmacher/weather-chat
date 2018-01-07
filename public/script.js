var STORAGE_ID = 'weather-chat';
var results = [];
var saveToLocalStorage = function () {
    localStorage.setItem(STORAGE_ID, JSON.stringify(results));
  }
var getFromLocalStorage = function () {
    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
  }

var renderResults = function () {
        $(".results").empty();
        results = getFromLocalStorage();
        var source = $("#weather-template").html();
        var template = Handlebars.compile(source);
        var weatherData = {"cities": results};
        var newHTML = template(weatherData);
        $(".results").append(newHTML);
}


var fetch = function () {
    var city = $("#city").val();
    var buildUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d703871f861842b79c60988ccf3b17ec`
    // AJAX
    $.ajax({
      method: "GET",
      url: buildUrl,
      success: function (data) {
        console.log(data);
        var result = {
            city: data.name,
            kelvin: data.main.temp,
            celsius: Math.round(data.main.temp - 273.15),
            fahrenheit: Math.round(data.main.temp*9/5 - 459.67),
            day: new Date().getDate(),
            month: new Date().getMonth()+1,
            year: new Date().getFullYear(),
            hours: new Date().getHours(),
            min: new Date().getMinutes()
        }
        results.push(result);
        saveToLocalStorage();
        console.log(results);
        renderResults();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    }); // END OF AJAX
    $("#city").val("");
  };
  
  $(".search-city").on("click", fetch);
  renderResults();
