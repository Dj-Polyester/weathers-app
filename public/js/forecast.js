const request = require("request");
const loclms = require("./loclms");
const weatherlms = require("./weatherlms");

function reqLoc(address, callback) {
  const access_key = loclms.access_key;
  const limit = loclms.limit;
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${access_key}&limit=${limit}`;
  // console.log(url);
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

function reqWeather(error, query, callback) {
  if (error) throw error;
  const access_key = weatherlms.access_key;
  const units = weatherlms.units;
  const unit = units === "m" ? "°C" : units === "s" ? "°K" : "°F";

  const url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${query}&units=${units}`;
  // console.log(url);
  request({ url: url, json: true }, (err, { body }) => {
    if (err) throw err;
    else if (body.error)
      console.log(`Error ${body.error.code}: ${body.error.info}`);
    const {
      weather_icons,
      weather_descriptions,
      observation_time,
      temperature,
      humidity,
    } = body.current;
    const { region, timezone_id, utc_offset } = body.location;

    const weather_description = weather_descriptions[0];
    const weather_icon = weather_icons[0];

    const weatherObj = {
      region: region,
      timezone: timezone_id,
      time: `${observation_time} ${utc_offset} UTC`,
      desc: `${temperature}${unit}  ${weather_description}`,
      humidity: `${humidity}% chance of rain`,
      icon: weather_icon,
    };
    //console.log(weatherObj);
    callback(weatherObj);
  });
}

module.exports = {
  reqLoc: reqLoc,
  reqWeather: reqWeather,
};
