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
        text: 'Unable to retrieve',
        textAlign: 'left'
      });
      wind.add(subTitle);

      var subSubTitle = new UI.Text({
        position: new Vector2(0, 45),
        size: new Vector2(174, 70),
        font: 'gothic-18-bold',
        text: 'your information.',
        textAlign: 'left'
      });
      wind.add(subSubTitle);

      var subSubSubTitle = new UI.Text({
        position: new Vector2(0, 70),
        size: new Vector2(174, 70),
        font: 'gothic-18-bold',
        text: 'Please try again',
        textAlign: 'left'
      });
      wind.add(subSubSubTitle);

      var subSubSubSubTitle = new UI.Text({
        position: new Vector2(0, 85),
        size: new Vector2(174, 70),
        font: 'gothic-18-bold',
        text: 'later.',
        textAlign: 'left'
      });
      wind.add(subSubSubSubTitle);


      wind.show();

  }

};