var $ = require('jquery')
require('style-loader!css-loader!./src/style.css');
var onBtnClick = function() {

          $date = $(".date").val();
          console.log($date);
          $(".status").css("height", "50px");
          if ($date == "") {

                 $(".status").css("background", "red");
                 $(".status-text").html("Input date");
                 return;
          }

          $(".status-text").html("Your request is processing, this will only take a moment");
          $(".status").css("background", "green");
          $(".table-hover").html("");
    $.ajax({

        url: "http://people.missouristate.edu/chadkillingsworth/csc590/calendar/?date=" + $date,
        type: "GET",
        dataType:'json',
        success: function(data) {
                          //console.log(data);
                          $(".status").css("height", "0px");
                          $(".status-text").html("");
                          var obj = data.feed.entry;
                          var innerHtml = "";
                          for(var i=0; i<obj.length; i++) {
                                  var title = obj[i].title.$t;
                                  var author = obj[i].author[0].name.$t;
                                  innerHtml += "<tr>";
                                  innerHtml += "<td class='text-left'>" + author + "</td>";
                                  innerHtml += "<td class='text-left'>" + title + "</td>";
                                  innerHtml += "</tr>";
                          }
                          $(".table-hover").html(innerHtml);

                  },
                  error: function(status) {
                          $(".status").css("background", "red");
                          if(status.readyState == 0) {
                                  $(".status-text").html("Sorry, your date input is incorrect. Please try again.");
                          } else {
                                  $(".status-text").html("Sorry, an error has occurred with your request. Please try again later");
                          }
                  }
          });
}
console.log(onBtnClick);
var bear = require(['./src/bear.js'], function() {
    $('.button1').on('click', onBtnClick);
});

// var css = require('css-loader./src/style.css')
