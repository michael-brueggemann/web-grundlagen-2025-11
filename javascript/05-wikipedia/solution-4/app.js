document
  .getElementById("searchButton")
  .addEventListener("click", searchClickHandler);

document
  .getElementById("searchInput")
  .addEventListener("input", searchInputHandler);

function searchClickHandler() {
  const searchTerm = document.getElementById("searchInput").value;
  search(searchTerm);
}

let changeTimeout;
function searchInputHandler() {
  console.log("searchInputHandler()");
  if (changeTimeout) {
    window.clearTimeout(changeTimeout);
    changeTimeout = null;
  }

  changeTimeout = window.setTimeout(searchClickHandler, 1000);
}

async function search(searchTerm) {
  const limit = 10;
  const url =
    `https://de.wikipedia.org/w/api.php?action=opensearch&format=json&search=${searchTerm}&limit=${limit}` +
    "&utf8=1&origin=*";

  const start = Date.now();
  const response = await fetch(url);
  const data = await response.json();
  const end = Date.now();

  document.querySelector("#resultSearchTime").innerHTML = end - start;

  processResult(data);
}

function processResult(searchResult) {
  document.querySelector("#resultSearchTerm").innerHTML = searchResult[0];

  let result = "";

  // print list with links
  let customFormat = mapData(searchResult);
  customFormat = customFormat.sort((a, b) => a.title.length - b.title.length);
  result += "<ul>";
  customFormat.forEach((element) => {
    result += `<li><a href="${element.link}">${element.title}</a></li>`;
  });
  result += "</ul>";

  // output in raw format
  // result += "<pre>" + JSON.stringify(searchResult[1], " ", 2) + "</pre>";
  // result += "<pre>" + JSON.stringify(searchResult[3], " ", 2) + "</pre>";
  // result += "<pre>" + JSON.stringify(customFormat, " ", 2) + "</pre>";

  const outputElement = document.querySelector("#result");
  outputElement.innerHTML = result;
}

// data is the response of the mediawiki api
// Returns array of objects with title and link properties
function mapData(data) {
  const [, titles, , links] = data;

  return titles.map((title, index) => ({
    title,
    link: links[index],
  }));
}
