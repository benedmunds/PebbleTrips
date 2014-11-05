/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

function isEmpty(object) { for(var i in object) { return false; } return true; }

 var main = function() {

  //init
  var UI = require('ui');
  var Vector2 = require('vector2');
  var ajax = require('ajax');
  var tripit = require('tripit');

  var config = JSON.parse(window.localStorage.getItem('config'));


  //if not configured yet display an error message on the watch
  if (typeof config === 'undefined' || isEmpty(config)) {

      console.log('OPENING SETTINGS SCREEN');
      var settings = require('views/settings');
      settings.build();

  }
  else {

    //loading screen
    var loading = require('views/loading');
    var loadingWindow = loading.build();

    //retrieve the trips from the api
    tripit.getTrips(
      config,
      function(data) {

        if (typeof data.Trip !== 'undefined' && (data.Trip.length > 0 || !isEmpty(data.Trip))) {

          if (!Array.isArray(data.Trip)) {
            data.Trip = [data.Trip];
          }

          //display the trip menu
          var tripMenu = require('views/tripMenu');
          tripMenu.build(data);

          loadingWindow.hide();

        }
        else {

          //no trips
          var tripError = require('views/errorNoTrips');
          tripError.build();

          loadingWindow.hide();

        }


      },
      function(error) {

        //misc error pulling trip data
        var tripError = require('views/errorMisc');
        tripError.build();

        loadingWindow.hide();

      }
    );

  }

}

main();

Pebble.addEventListener("ready", function() {
  main();
});

Pebble.addEventListener("showConfiguration", function() {

  var url = 'http://pebbletrips.com/login.php';
  console.log("showing configuration at " + url);
  Pebble.openURL(url);

});


Pebble.addEventListener("webviewclosed", function(e) {

  console.log("configuration closed");
  if (e.response != '') {

    try {
      var options = JSON.parse(decodeURIComponent(e.response));

      if (options !== 'undefined') {
        console.log("storing options: " + JSON.stringify(options));
        window.localStorage.setItem('config', JSON.stringify(options));
      }
    }
    catch(e){}

    main();

  }
  else {
    console.log("no options received");
  }

});