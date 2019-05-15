var NodeGeocoder = require("node-geocoder");

var options = {
  provider: "mapquest",
  apiKey: "jGbzLDBgjFFNCa66hVNWB9r4dFk8uicG"
};

var geocoder = NodeGeocoder(options);
var city = process.argv[2];
var state = process.argv[3];

var address = city + " " + state;
// var rad = function(x) {
//   return x * Math.PI / 180;
// };

// var haversine = (function () {
//   var RADII = {
//     km:    6371,
//     mile:  3960,
//     meter: 6371000,
//     nmi:   3440
//   }

//   // convert to radians
//   var toRad = function (num) {
//     return num * Math.PI / 180
//   }

//   // convert coordinates to standard format based on the passed format option
//   var convertCoordinates = function (format, coordinates) {
//     switch (format) {
//     case '[lat,lon]':
//       return { latitude: coordinates[0], longitude: coordinates[1] }
//     case '[lon,lat]':
//       return { latitude: coordinates[1], longitude: coordinates[0] }
//     case '{lon,lat}':
//       return { latitude: coordinates.lat, longitude: coordinates.lon }
//     case '{lat,lng}':
//       return { latitude: coordinates.lat, longitude: coordinates.lng }
//     case 'geojson':
//       return { latitude: coordinates.geometry.coordinates[1], longitude: coordinates.geometry.coordinates[0] }
//     default:
//       return coordinates
//     }
//   }

//   return function haversine (startCoordinates, endCoordinates, options) {
//     options   = options || {}

//     var R = options.unit in RADII
//       ? RADII[options.unit]
//       : RADII.km

//     var start = convertCoordinates(options.format, startCoordinates)
//     var end = convertCoordinates(options.format, endCoordinates)

//     var dLat = toRad(end.latitude - start.latitude)
//     var dLon = toRad(end.longitude - start.longitude)
//     var lat1 = toRad(start.latitude)
//     var lat2 = toRad(end.latitude)

//     var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//             Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2)
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

//     if (options.threshold) {
//       return options.threshold > (R * c)
//     }

//     return R * c
//   }

// })()

// if (typeof module !== 'undefined' && module.exports) {
//   module.exports = haversine
// };

//calculate distance takes into geo points and returns the pythagorean distance between them
module.exports = function (place1, place2, callback) {
    var latA;
    var latB;
    var longA;
    var longB;
    var dlon;
    var dlat;

    var totalD;

    geocoder.geocode(place1, function (err, resA) {
        // console.log("--------------Geocode for resA", resA);

        console.log("--------------Geocode for resA", resA[0]);
        console.log("--------------Latitudes for resA", resA[0].latitude);
        console.log("--------------Longitudes for resA", resA[0].longitude);

        longA = resA[0].longitude;
        latA = resA[0].latitude;

        geocoder.geocode(place2, function (err, resB) {
            //console.log("Geocode for ptB", resB)

            console.log("--------------Geocode for resB", resB[0]);
            console.log("--------------Latitudes for resB", resB[0].latitude);
            console.log("--------------Longitudes for resB", resB[0].longitude);

            longB = parseFloat(resB[0].longitude);
            latB = parseFloat(resB[0].latitude);

            //Start Haversine math
            dlon = parseFloat(longA - longB);
            dlat = parseFloat(latA - latB);
            a = parseFloat(
                Math.pow(Math.sin(dlat / 2), 2) +
                Math.cos(latA) * Math.cos(latB) * Math.pow(Math.sin(dlon / 2)),
                2
            );
            c = parseFloat(2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));

            totalD = 3961 * c;

            console.log("Totals your Distance", totalD);
            // return with the answer
            callback(totalD);
            //End Haversine math
        });
    }); //End both geocodes
}; //End Calc Distance

