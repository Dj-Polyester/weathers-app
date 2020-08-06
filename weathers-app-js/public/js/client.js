const form = document.getElementById("search-bar");
const search = document.getElementsByTagName("input")[0];
// console.log(form);
form.addEventListener("submit", (e) => {
  // e.preventDefault();
  const loc = search.value;
  sessionStorage.setItem("address", loc);

  // const addrjson = { address: loc };

  // const options = {
  //   method: "post",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(addrjson),
  // };

  // const res = await fetch("http://localhost:3000/weather", options);
  // const result = await res.json();
  // console.log(result);
});
