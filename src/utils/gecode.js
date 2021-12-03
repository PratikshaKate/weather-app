const request = require("request");

//geocoding is used to get the long and lat using the place name
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicHJhdGlrc2hha2F0ZSIsImEiOiJja3dicTV0a3cwMm9tMnZxdnlvNTk5YWJoIn0.YQC03_AI7fLo0kLmWrYYdw&limit=1`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to geocoding location", undefined);
    } else if (response.body.features.length === 0) {
      callback(undefined, "Unable to find the location on geocoding");
    } else {
      callback(undefined, {
        lat: response.body.features[0].center[0],
        long: response.body.features[0].center[1],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
