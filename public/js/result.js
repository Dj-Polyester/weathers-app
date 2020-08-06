const desc = document.getElementById("desc");
const humidity = document.getElementById("humidity");
const icon = document.getElementById("icon");
const region = document.getElementById("region");
const time = document.getElementById("time");
const timezone = document.getElementById("timezone");

window.onload = async function () {
  const addrjson = { address: sessionStorage.getItem("address") };
  console.log(addrjson);
  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(addrjson),
  };

  const res = await fetch("/weather", options);
  const result = await res.json();

  console.log(result);
  desc.textContent = await result.desc;
  humidity.textContent = await result.humidity;
  region.textContent = await result.region;
  time.textContent = await result.time;
  timezone.textContent = await result.timezone;
  const weatherimg = await document.createElement("img");
  weatherimg.src = await result.icon;
  weatherimg.width = "200";
  weatherimg.height = "200";
  icon.appendChild(weatherimg);

  sessionStorage.removeItem("address");
};
