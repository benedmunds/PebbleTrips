var UI = require('../ui');
var Vector2 = require('vector2');

module.exports = {

  build: function(data){

    var wind = new UI.Window({
      scrollable: true
    });


    var title = new UI.Text({
      position: new Vector2(0, 0),
      size: new Vector2(144, 30),
      font: 'gothic-24-bold',
      text: 'TripIt!',
      textAlign: 'center'
    });
    wind.add(title);

    var subTitle = new UI.Text({
      position: new Vector2(0, 30),
      size: new Vector2(174, 70),
      font: 'gothic-18-bold',
      text: 'Open Settings in the Pebble app to login to your TripIt account.',
      textAlign: 'left'
    });
    wind.add(subTitle);


    wind.show();

  }

};