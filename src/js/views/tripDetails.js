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


        var yPos = 0;

        var title = new UI.Text({
          position: new Vector2(0, yPos),
          size: new Vector2(144, 30),
          font: 'gothic-24-bold',
          text: data.Trip.primary_location,
          textAlign: 'center'
        });
        wind.add(title);


        yPos += newSectionYSpace;
        var subTitle = new UI.Text({
          position: new Vector2(0, yPos),
          size: new Vector2(144, 30),
          font: 'gothic-18-bold',
          text: formattedStartDate + ' to ' + formattedEndDate,
          textAlign: 'center'
        });
        wind.add(subTitle);
        body += formattedStartDate + ' to ' + formattedEndDate + '\n';

        body += '\r\n';

        if (typeof data.AirObject !== 'undefined' && typeof data.AirObject.Segment !== 'undefined' && data.AirObject.Segment.length > 0) {

          for (var i=0; i<data.AirObject.Segment.length; i++) {

            //flight
            yPos += 25;
            var flight = new UI.Text({
              position: new Vector2(5, yPos),
              size: new Vector2(144, 30),
              font: 'gothic-14-bold',
              text: data.AirObject.Segment[i].start_airport_code +' to '+ data.AirObject.Segment[i].end_airport_code,
              textAlign: 'left'
            });
            wind.add(flight);
            body += data.AirObject.Segment[i].start_airport_code +' to '+ data.AirObject.Segment[i].end_airport_code + '\n';

            if (typeof data.AirObject.Segment[i].Status.flight_status !== 'undefined') {
              yPos += newRowYSpace;
              //status
              var status = new UI.Text({
                position: new Vector2(5, yPos),
                size: new Vector2(144, 30),
                font: 'gothic-14-bold',
                text: 'Status: ' + flightStatuses[data.AirObject.Segment[i].Status.flight_status],
                textAlign: 'left'
              });
              wind.add(status);
              body += 'Status: ' + flightStatuses[data.AirObject.Segment[i].Status.flight_status] + '\n';
            }


            if (typeof data.AirObject.Segment[i].Status.departure_gate !== 'undefined') {
              yPos += newRowYSpace;
              var departGate = new UI.Text({
                position: new Vector2(5, yPos),
                size: new Vector2(144, 30),
                font: 'gothic-14-bold',
                text: 'Gate: ' + data.AirObject.Segment[i].Status.departure_gate,
                textAlign: 'left'
              });
              wind.add(departGate);
              body += 'Gate: ' + data.AirObject.Segment[i].Status.departure_gate + '\n';
            }

            yPos += newRowYSpace;
            var duration = new UI.Text({
              position: new Vector2(5, yPos),
              size: new Vector2(144, 30),
              font: 'gothic-14-bold',
              text: 'Duration: ' + data.AirObject.Segment[i].duration,
              textAlign: 'left'
            });
            wind.add(duration);
            body += 'Duration: ' + data.AirObject.Segment[i].duration + '\n';


            //departure
            var segmentDepartureDatetimeHour = data.AirObject.Segment[i].StartDateTime.time.substring(0, 2);
            var segmentDepartureDatetimeMin = data.AirObject.Segment[i].StartDateTime.time.substring(3, 5);
            var segmentDepartureDatetimeAmPm = 'AM';

            if (segmentDepartureDatetimeHour > 11) {
              segmentDepartureDatetimeHour = segmentDepartureDatetimeHour > 12 ? segmentDepartureDatetimeHour - 12 : segmentDepartureDatetimeHour;
              segmentDepartureDatetimeAmPm = 'PM';
            }

            yPos += newRowYSpace;
            var depart = new UI.Text({
              position: new Vector2(5, yPos),
              size: new Vector2(144, 30),
              font: 'gothic-14-bold',
              text: 'Depart: ' + segmentDepartureDatetimeHour +':'+ segmentDepartureDatetimeMin + ' ' + segmentDepartureDatetimeAmPm,
              textAlign: 'left'
            });
            wind.add(depart);
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

              yPos += newRowYSpace;
              var arrive = new UI.Text({
                position: new Vector2(5, yPos),
                size: new Vector2(144, 30),
                font: 'gothic-14-bold',
                text: 'Arrive: ' + segmentArrivalDatetimeHour +':'+ segmentArrivalDatetimeMin + ' ' + segmentArrivalDatetimeAmPm,
                textAlign: 'left'
              });
              wind.add(arrive);
              body += 'Arrive: ' + segmentArrivalDatetimeHour +':'+ segmentArrivalDatetimeMin + ' ' + segmentArrivalDatetimeAmPm;
            }

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