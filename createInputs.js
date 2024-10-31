let checkboxes = "";
let selectboxes = "";

/////////// FILTER INTERFACE ////////////

document.getElementById("filter-btn").addEventListener("click", openFilter);

function openFilter() {
  const filter = document.getElementById("filter");

  // Überprüfe den aktuellen Display-Zustand und wechsle zwischen "block" und "none"
  if (filter.style.display === "none" || filter.style.display === "") {
    filter.style.display = "block"; // Zeige das Filterelement an
  }
  document
    .getElementById("close-filter")
    .addEventListener("click", closeFilter);
  function closeFilter() {
    filter.style.display = "none"; // Blende das Filterelement aus
  }
}

/////////// CREATE INPUTS ////////////

function selectbox() {
  // Selectbox generieren
  let selectboxes = "";
  const selectedValue = document.getElementById("category").value;
  console.log(selectedValue);

  if (selectedValue === "fischerei") {
    selectboxes += `<label><input type='checkbox' id="Küstenfischerei">Küstenfischerei</label><br>`;
    selectboxes += `<label><input type='checkbox' id="Binnenfischerei">Binnenfischerei</label><br>`;
  }
  if (selectedValue === "fischzucht") {
    selectboxes += `<label><input type='checkbox' id="Teichwirtschaft">Teichwirtschaft</label><br>`;
    selectboxes += `<label><input type='checkbox' id="Aquakultur">Aquakultur</label><br>`;
  }
  if (selectedValue === "gastronomie") {
    selectboxes += `<label><input type='checkbox' id="Restaurant">Restaurant</label><br>`;
    selectboxes += `<label><input type='checkbox' id="Imbiss">Imbiss</label><br>`;
  }
  document.getElementById("bereiche").innerHTML = selectboxes;

  // Hinzufügen von Event Listener für die dynamisch erstellten Checkboxen
  document
    .querySelectorAll("#bereiche input[type='checkbox']")
    .forEach((checkbox) => {
      checkbox.addEventListener("change", filterPins);
    });

  // Filterfunktion aufrufen, wenn Select-Box geändert wird
  filterPins();
}
//Eventhandler für Select
document.getElementById("category").addEventListener("change", selectbox);

function checkbox() {
  // Checkboxen für Direktverkauf, Onlineshop usw. generieren
  const filter = Object.keys(fishdatamvp[0]).slice(30, 33); // Schlüssel extrahieren
  console.log(filter);

  filter.forEach((element) => {
    // Hier verwenden wir die Original-ID ohne Umwandlung
    checkboxes += `<label><input type='checkbox' id="${element}">${element.replace(
      "_",
      " "
    )}</label><br>`;
  });
  document.getElementById("filter-checkbox").innerHTML = checkboxes;

  // Event Listener für Checkboxen hinzufügen
  filter.forEach((element) => {
    // Verwende die Original-ID für die Event Listener
    document.getElementById(element).addEventListener("change", filterPins);
  });
}
