let counter = 0;

window.setInterval(() => {
  counter++;
  document.querySelector("#counter").innerHTML = counter;
}, 1000);
