var WeatherApp = function () {
    var STORAGE_ID = 'weather-chat';
    var results = [];
    var saveToLocalStorage = function () {
        localStorage.setItem(STORAGE_ID, JSON.stringify(results));
      }
    var getFromLocalStorage = function () {
        return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
      }
    
    var render = function () {
            $(".results").empty();
            results = getFromLocalStorage();
            var source = $("#weather-template").html();
            var template = Handlebars.compile(source);
            var weatherData = {"cities": results};
            var newHTML = template(weatherData);
            $(".results").append(newHTML);
    }
    
    var _findResById = function(id) {
        for (var i=0; i<results.length; i++) {
            if (results[i].id === id) {
                return results[i];
            }
        }
    } 

    var addComment = function (resId, comment) {
        var currentResult = _findResById(resId);
        currentResult.commentsObj.comments.push({"text": comment});
        saveToLocalStorage();
        render();
    }

    var _getId = function(arr) {
        if (arr.length === 0) {
            return 0;
        }
        return arr[arr.length-1].id + 1;
    }

    var fetch = function () {
        var city = $("#city").val();
        var buildUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d703871f861842b79c60988ccf3b17ec`
        // AJAX
        $.ajax({
          method: "GET",
          url: buildUrl,
          success: function (data) {
            var result = {
                id: _getId(results),
                city: data.name,
                kelvin: data.main.temp,
                celsius: Math.round(data.main.temp - 273.15),
                fahrenheit: Math.round(data.main.temp*9/5 - 459.67),
                day: new Date().getDate(),
                month: new Date().getMonth()+1,
                year: new Date().getFullYear(),
                hours: new Date().getHours(),
                min: new Date().getMinutes(),
                commentsObj: {"comments": []}
            }
            results.push(result);
            saveToLocalStorage();
            console.log(results);
            render();
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus);
          }
        }); // END OF AJAX
        $("#city").val("");
      };

    return {
        render: render,  
        fetch: fetch,
        addComment: addComment
      }
}

  var app = WeatherApp();
  app.render();
  $(".search-city").on("click", app.fetch);
  $('.results').on('click', '.post-comment', function () {
    var currentResult = $(this).closest('.result-block');
    var resId = currentResult.data().id;
    var comment = $(this).closest('.input-group').find('.comment').val();
    app.addComment(resId, comment);
    $(this).closest('.input-group').find('.comment').val("");
  })
 
