console.log("file loaded");

const button = document.querySelector("button");
button.addEventListener("click", clickHandler);

function clickHandler() {
  console.log("clicked");

  const inputElement = document.querySelector("input");
  const value = inputElement.value;
  console.log("Nachricht 1: " + value);
}
// ---

button.addEventListener("click", () => {
  console.log("Nachricht 2: " + document.querySelector("input").value);
});
