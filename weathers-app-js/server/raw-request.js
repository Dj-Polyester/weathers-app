const http = require("http");
const url = `http://api.weatherstack.com/current?access_key=1cde6be9501813b889d4b06f59fe22fa&query=45,-75&units=m`;

const request = http.request(url, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk.toString();
  });
  res.on("end", () => {
    //parse the json object
    const body = JSON.parse(data);
    //do whatever is needed
    console.log(body);
  });
});

request.on("error", (err) => {
  throw err;
});
request.end();
