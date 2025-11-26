import { Calculator } from "./calculator";

const calculator = new Calculator();

function add() {
  const zahl1 = document.getElementById("zahl1").value;
  const zahl2 = document.getElementById("zahl2").value;

  const result = calculator.add(zahl1, zahl2);
  document.getElementById("result").innerHTML = result;
}

function minus() {
  const zahl1 = document.getElementById("zahl1").value;
  const zahl2 = document.getElementById("zahl2").value;

  const result = calculator.minus(zahl1, zahl2);
  document.getElementById("result").innerHTML = result;
}

// Klick-Listener an den Button hängen
document.getElementById("plusButton").addEventListener("click", add);
document.getElementById("minusButton").addEventListener("click", minus);
