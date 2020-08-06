const request = require("request");
const input = require("./input");
const loclms = require("./loclms");
const weatherlms = require("./weatherlms");

input({
  prompt: "Please write an address",
  response: (line) => {
    console.log();
    reqLoc(line, reqWeather);
  },
  lines: 1,
});

function reqLoc(address, callback) {
  const access_key = loclms.access_key;
  const limit = loclms.limit;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${access_key}&limit=${limit}`;
  request({ url: url, json: true }, (err, res) => {
    if (err) callback(err);
    try {
      const features = res.body.features;
      if (features.length) {
        const loc = res.body.features[0].center;
        const locstr = loc[1].toString() + "," + loc[0].toString();
        callback(err, locstr);
      } else {
        throw "Location not found.";
      }
    } catch (error) {
      callback(err);
    }
  });
}

function reqWeather(error, query) {
  if (error) throw error;
  const access_key = weatherlms.access_key;
  const units = weatherlms.units;
  const unit = units === "m" ? "°C" : units === "s" ? "°K" : "°F";

  const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${query}&units=${units}`;

  request({ url: url, json: true }, (err, { body }) => {
    if (err) throw err;
    else if (body.error)
      console.log(`Error ${body.error.code}: ${body.error.info}`);
    const {
      // weather_icons,
      weather_descriptions,
      observation_time,
      temperature,
      humidity,
    } = body.current;
    const { region, timezone_id, utc_offset } = body.location;

    const weather_description = weather_descriptions[0];
    // const weather_icons = weather_icons[0];

    console.log(region);
    console.log(timezone_id);
    console.log(`${observation_time} ${utc_offset} UTC`);
    console.log(`${temperature}${unit}  ${weather_description}`);
    console.log(`${humidity}% chance of rain`);
  });
}
