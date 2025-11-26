// Formular-Handling
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("profilForm");
  const fotoButton = document.querySelector(".foto-hochladen");
  const windowBtns = document.querySelectorAll(".window-btn");

  // Formular absenden
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      nachname: document.getElementById("nachname").value,
      alter: document.getElementById("alter").value,
      lieblingspizza: document.getElementById("lieblingspizza").value,
      spezielleWuensche: document.getElementById("spezielle-wuensche").value,
      email: document.getElementById("email").value,
    };

    console.log("Profil gespeichert:", formData);

    // Erfolgsmeldung anzeigen
    alert("Profil erfolgreich gespeichert!");

    // Optional: Daten im localStorage speichern
    localStorage.setItem("userProfile", JSON.stringify(formData));
  });

  // Foto hochladen Button
  fotoButton.addEventListener("click", function () {
    // Erstelle einen versteckten File-Input
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.addEventListener("change", function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();

        reader.onload = function (event) {
          const profilBild = document.querySelector(".profil-bild");
          profilBild.innerHTML = `<img src="${event.target.result}" alt="Profilbild" style="width: 100%; height: 100%; object-fit: cover;">`;
        };

        reader.readAsDataURL(file);
      }
    });

    fileInput.click();
  });

  // Fenster-Steuerung Buttons
  windowBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (btn.classList.contains("close")) {
        if (confirm("Möchten Sie wirklich schließen?")) {
          window.close();
        }
      } else if (btn.classList.contains("minimize")) {
        alert("Minimieren-Funktion (Demo)");
      } else if (btn.classList.contains("maximize")) {
        document
          .querySelector(".window-container")
          .classList.toggle("maximized");
      }
    });
  });

  // Gespeicherte Daten laden (falls vorhanden)
  const savedProfile = localStorage.getItem("userProfile");
  if (savedProfile) {
    const data = JSON.parse(savedProfile);
    document.getElementById("name").value = data.name || "";
    document.getElementById("nachname").value = data.nachname || "";
    document.getElementById("alter").value = data.alter || "";
    document.getElementById("lieblingspizza").value = data.lieblingspizza || "";
    document.getElementById("spezielle-wuensche").value =
      data.spezielleWuensche || "";
    document.getElementById("email").value = data.email || "";
  }

  // CSS-Klasse für maximiertes Fenster
  const style = document.createElement("style");
  style.textContent = `
        .window-container.maximized {
            max-width: 100%;
            margin: 0;
            border-radius: 0;
            height: 100vh;
        }
    `;
  document.head.appendChild(style);
});
