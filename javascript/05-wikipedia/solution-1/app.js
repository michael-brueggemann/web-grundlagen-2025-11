document
  .getElementById("searchButton")
  .addEventListener("click", searchClickHandler);

function searchClickHandler() {
  const searchTerm = document.getElementById("searchInput").value;
  search(searchTerm);
}

async function search(searchTerm) {
  const limit = 10;
  const url =
    `https://de.wikipedia.org/w/api.php?action=opensearch&format=json&search=${searchTerm}&limit=${limit}` +
    "&utf8=1&origin=*";

  const response = await fetch(url);
  const data = await response.json();

  processResult(data);
}

function processResult(searchResult) {
  document.querySelector("#resultSearchTerm").textContent = searchResult[0];

  const wordList = searchResult[1];

  let result = "";

  // print word list
  result += "<ul>";
  wordList.forEach((element) => {
    result += `<li>${element}</li>`;
  });
  result += "</ul>";

  // output in raw format
  // result += "<pre>" + JSON.stringify(searchResult[1], " ", 2) + "</pre>";

  const outputElement = document.querySelector("#result");
  outputElement.innerHTML = result;
}
