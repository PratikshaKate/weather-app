const request = require("request");
//units = f , changing it to f

// request({ url: url}, (error, response) => {
//   const data_Object = JSON.parse(response.body);
//   console.log(data_Object.current);
// });

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e4231fd4dd005d949ce341e7aae14c99&query=${latitude},${longitude}&units=f`;

  //json:true, is used to parse the response automatically.
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (response.body.error) {
      callback(undefined, "Unable to find the location. Try another search.");
    } else {
      // console.log(response.body.current);
      callback(
        undefined,
        `The temperature is ${response.body.current.temperature} but it feel like it is ${response.body.current.feelslike}. The weather is currently ${response.body.current.weather_descriptions[0]}. The humidity is ${response.body.current.humidity}`
      );
    }
  });
};

module.exports = forecast;
