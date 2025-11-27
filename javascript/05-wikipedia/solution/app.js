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

  let wordList = searchResult[1];
  const linkList = searchResult[3];

  // (deep) copy word list and sort by length
  wordList = JSON.parse(JSON.stringify(wordList));
  wordList.sort((a, b) => {
    if (a.length < b.length) {
      return -1;
    }
    if (a.length > b.length) {
      return 1;
    }
    return 0;
  });

  let result = "";

  // print word list
  result += "<ul>";
  wordList.forEach((element) => {
    result += `<li>${element}</li>`;
  });
  result += "</ul>";

  // print list with links
  let customFormat = mapData(searchResult);
  customFormat = customFormat.sort((a, b) => {
    return a.titleLength - b.titleLength;
  });
  result += "<ul>";
  customFormat.forEach((element) => {
    result += `<li><a href="${element.link}">${element.title}</a></li>`;
  });
  result += "</ul>";

  // output in raw format
  result += "<pre>" + JSON.stringify(searchResult[1], " ", 2) + "</pre>";
  result += "<pre>" + JSON.stringify(searchResult[3], " ", 2) + "</pre>";
  result += "<pre>" + JSON.stringify(customFormat, " ", 2) + "</pre>";

  const outputElement = document.querySelector("#result");
  outputElement.innerHTML = result;
}

// data is the response of the mediawiki api
function mapData(data) {
  const mappedData = [];

  for (let i = 0; i < data[1].length; i++) {
    mappedData.push({
      title: data[1][i],
      link: data[3][i],
    });
  }

  return mappedData;
}

document
  .getElementById("searchButton")
  .addEventListener("click", searchClickHandler);

document
  .getElementById("searchInput")
  .addEventListener("input", searchInputHandler);
