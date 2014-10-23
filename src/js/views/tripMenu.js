var UI = require('../ui');
var Vector2 = require('vector2');
var tripit = require('tripit');

var config = JSON.parse(window.localStorage.getItem('config'));


module.exports = {

	build: function(data){

      var menuItems = [];
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      //sort by start_date
      data.Trip.sort(function(a, b){

      	 var aStartDate = new Date(a.start_date);
      	 var bStartDate = new Date(b.start_date);

		 if (aStartDate.getTime() < bStartDate.getTime()) {
		 	return -1;
		 }
		 else if (aStartDate.getTime() > bStartDate.getTime()) {
		 	return 1;
		 }
		 else {
			return 0;
		 }

      });


      //add menu items
	  for (var i=0; i<data.Trip.length; i++) {

        var row = data.Trip[i];

        var startDate = new Date(row.start_date);
        var formattedStartDate = months[startDate.getMonth()] + ' ' + startDate.getDate();

        var endDate = new Date(row.end_date);
        var formattedEndDate = months[endDate.getMonth()] + ' ' + endDate.getDate();

        if (row.display_name !== 'Your trip' && typeof row.primary_location !== 'undefined') {
          menuItems.push({
              title: row.primary_location,
              subtitle: formattedStartDate + ' to ' + formattedEndDate,
              tripId: row.id
          });
        }

      }


      var menu = new UI.Menu({
        sections: [{
          title: 'Upcoming Trips',
          items: menuItems
        }]
      });
      menu.show();


      menu.on('select', function(e) {

      	//load data for this specific trip
		tripit.getTrip(
		  e.item.tripId,
	      config,
	      function(data) {


	      	//temp
	        var tripDetails = require('tripDetails');
	        tripDetails.build(data);


	      },
	      function(error) {

	        //misc error pulling trip data
	        var tripError = require('views/errorMisc');
	        tripError.build();

	      }
	    );

      });

	}

};