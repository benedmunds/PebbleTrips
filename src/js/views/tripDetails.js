var UI = require('../ui');
var Vector2 = require('vector2');

module.exports = {

	build: function(data){

        var tripId = data.tripId;

        var newSectionYSpace = 20;
        var newRowYSpace = 15;

        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        var flightStatuses = {
          200: 'Too Eary to Tell',
          300: 'Scheduled',
          301: 'On Time',
          302: 'In Flight - On Time',
          303: 'Arrived - On Time',
          400: 'Cancelled',
          401: 'Delayed',
          402: 'In Flight - late',
          403: 'Arrived',
          404: 'Diverted',
          405: 'Possibly Delayed',
          406: 'In Flight',
          407: 'Arrived',
          408: 'Unknown'
        }

        var startDate = new Date(data.Trip.start_date);
        var formattedStartDate = months[startDate.getMonth()] + ' ' + startDate.getDate();

        var endDate = new Date(data.Trip.end_date);
        var formattedEndDate = months[endDate.getMonth()] + ' ' + endDate.getDate();


        var wind = new UI.Window({
          scrollable: true
        });

        var body = '';

        var card = new UI.Card({
          title: data.Trip.primary_location,
          body: '',
          scrollable: true
        });


        body += formattedStartDate + ' to ' + formattedEndDate + '\n';
        body += '\r\n';


        var airExists = typeof data.AirObject !== 'undefined' && typeof data.AirObject.Segment !== 'undefined';
        var lodgingExists = typeof data.LodgingObject !== 'undefined' && typeof data.LodgingObject.display_name !== 'undefined' && data.LodgingObject.display_name.length > 0;
        var carExists = typeof data.CarObject !== 'undefined' && typeof data.CarObject.display_name !== 'undefined' && data.CarObject.display_name.length > 0;

        if (airExists || lodgingExists || carExists) {

          if (airExists) {

            body += 'Flight: ' + '\n';


            //make the air segments an array if its singular
            if (typeof data.AirObject.Segment.length === 'undefined') {
              data.AirObject.Segment = [data.AirObject.Segment];
            }

            for (var i=0; i<data.AirObject.Segment.length; i++) {

              //flight
              body += data.AirObject.Segment[i].start_airport_code +' to '+ data.AirObject.Segment[i].end_airport_code + '\n';

              if (typeof data.AirObject.Segment[i].Status.flight_status !== 'undefined') {
                body += 'Status: ' + flightStatuses[data.AirObject.Segment[i].Status.flight_status] + '\n';
              }


              if (typeof data.AirObject.Segment[i].Status.departure_gate !== 'undefined') {
                body += 'Gate: ' + data.AirObject.Segment[i].Status.departure_gate + '\n';
              }

              body += 'Duration: ' + data.AirObject.Segment[i].duration + '\n';


              //departure
              var segmentDepartureDatetimeHour = data.AirObject.Segment[i].StartDateTime.time.substring(0, 2);
              var segmentDepartureDatetimeMin = data.AirObject.Segment[i].StartDateTime.time.substring(3, 5);
              var segmentDepartureDatetimeAmPm = 'AM';

              if (segmentDepartureDatetimeHour > 11) {
                segmentDepartureDatetimeHour = segmentDepartureDatetimeHour > 12 ? segmentDepartureDatetimeHour - 12 : segmentDepartureDatetimeHour;
                segmentDepartureDatetimeAmPm = 'PM';
              }

              body += 'Depart: ' + segmentDepartureDatetimeHour +':'+ segmentDepartureDatetimeMin + ' ' + segmentDepartureDatetimeAmPm + '\n';


              //arrival
              if (typeof data.AirObject.Segment[i].EndDateTime !== 'undefined' && typeof data.AirObject.Segment[i].EndDateTime.time !== 'undefined') {
                var segmentArrivalDatetimeHour = data.AirObject.Segment[i].EndDateTime.time.substring(0, 2);
                var segmentArrivalDatetimeMin = data.AirObject.Segment[i].EndDateTime.time.substring(3, 5);
                var segmentArrivalDatetimeAmPm = 'AM';

                if (segmentArrivalDatetimeHour > 11) {
                  segmentArrivalDatetimeHour = segmentArrivalDatetimeHour > 12 ? segmentArrivalDatetimeHour - 12 : segmentArrivalDatetimeHour;
                  segmentArrivalDatetimeAmPm = 'PM';
                }

                body += 'Arrive: ' + segmentArrivalDatetimeHour +':'+ segmentArrivalDatetimeMin + ' ' + segmentArrivalDatetimeAmPm;
              }

              body += '\r\n';
              body += '\r\n';

          }

        }


        if (carExists) {

            //list Rental Car info
            body += 'Rental Car: ' + '\n';
            body += data.CarObject.display_name + '\n';
            body += 'Conf #:' + '\n';
            body += data.CarObject.booking_site_conf_num + '\n';

            body += '\r\n';
            body += '\r\n';

        }


        if (lodgingExists) {

            //list Hotel info
            body += 'Hotel: ' + '\n';
            body += data.LodgingObject.display_name + '\n';

            if (typeof data.LodgingObject.booking_site_conf_num !== 'undefined') {
              body += 'Conf #:' + '\n';
              body += data.LodgingObject.booking_site_conf_num + '\n';
            }

            body += data.LodgingObject.Address.address + '\n';

            body += '\r\n';
            body += '\r\n';

        }

      }
      else {

        body += 'No trip details available... \r\n';

      }



      card.body(body);

      card.show();


      //wind.show();

	}

};