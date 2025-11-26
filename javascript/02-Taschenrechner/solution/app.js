// Klick-Listener an den Button hängen
document.getElementById("plusButton").addEventListener("click", add);
document.querySelector("#minusButton").addEventListener("click", minus);

function add(event) {
  console.log(event.target.innerText);
  const zahl1 = readNumber("zahl1");
  const zahl2 = readNumber("zahl2");

  const result = zahl1 + zahl2;
  document.getElementById("result").innerHTML = result;
}

function minus() {
  const zahl1 = readNumber("zahl1");
  const zahl2 = readNumber("zahl2");

  const result = zahl1 - zahl2;
  document.getElementById("result").innerHTML = result;
}

// Zahl einlesen ausgelagert und hier zentrales parsen des Strings
function readNumber(id) {
  return parseFloat(document.getElementById(id).value);
}
