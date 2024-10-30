let map;
let markers = [];
let checkboxes = "";
let selectboxes = "";

function selectbox() {
  // Selectbox generieren
  let selectboxes = "";
  const selectedValue = document.getElementById("category").value;
  console.log(selectedValue);

  if (selectedValue === "fischerei") {
    selectboxes += `<label><input type='checkbox' id="küstenfischerei">Küstenfischerei</label><br>`;
    selectboxes += `<label><input type='checkbox' id="binnenfischerei">Binnenfischerei</label><br>`;
  }
  if (selectedValue === "fischzucht") {
    selectboxes += `<label><input type='checkbox' id="teichwirtschaft">Teichwirtschaft</label><br>`;
    selectboxes += `<label><input type='checkbox' id="aquakultur">Aquakultur</label><br>`;
  }
  if (selectedValue === "gastronomie") {
    selectboxes += `<label><input type='checkbox' id="restaurant">Restaurant</label><br>`;
    selectboxes += `<label><input type='checkbox' id="imbiss">Imbiss</label><br>`;
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

function checkbox() {
  //Checkboxes - Direktverkauf, Onlineshop, goldener Seestern -  generieren
  const filter = Object.keys(fishdatamvp[0]).slice(30, 33); // keys extrahieren
  console.log(filter);

  filter.forEach((element, index) => {
    const id = element.toLocaleLowerCase();
    checkboxes += `<label><input type='checkbox' id="${id}">${element}</label><br>`;
  });
  document.getElementById("filter-checkbox").innerHTML = checkboxes;

  // Event Listener für Checkboxen hinzufügen
  filter.forEach((element) => {
    const id = element.toLocaleLowerCase();
    document.getElementById(id).addEventListener("change", filterPins);
  });
}

// Funktion zur Initialisierung der Karte
function initMap() {
  checkbox();
  selectbox();
  const center = { lat: 51.1657, lng: 10.4515 }; // Zentrum in Deutschland
  const mapOptions = {
    center: center,
    zoom: 6,
    mapId: "3c9fedfcb52e5828",
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  filterPins(); // Filtere Pins, wenn die Karte initialisiert wird
}

// Sicherstellen, dass initMap global verfügbar ist
window.initMap = initMap;

function showPins(pins) {
  clearMarkers(); // Zuerst alte Marker entfernen
  pins.forEach((location) => {
    const marker = new google.maps.marker.AdvancedMarkerElement({
      position: { lat: location.Lat, lng: location.Long },
      map: map,
      title: location.Name, // Tooltip
    });
    markers.push(marker); // Speichere Marker in Array
  });
}

// Funktion, um alle Marker zu löschen
function clearMarkers() {
  markers.forEach((marker) => marker.setMap(null)); // Entferne Marker von der Karte
  markers = []; // Leere das Marker-Array
}

/* Funktionsweise
1. Dynamisches Erfassen aller Checkboxen: Mit document.querySelectorAll("input[type='checkbox']") erfassen wir alle Checkboxen auf der Seite.
2. Filtern durch die Checkbox-Eigenschaften: Für jede Checkbox, die aktiviert ist, prüfen wir, ob der aktuelle location-Eintrag das entsprechende Attribut (umgewandelt in die passende Groß-/Kleinschreibung) enthält. Falls eine Checkbox aktiv ist und das location-Objekt das Attribut nicht hat, wird es ausgeschlossen.
3. Anzeige der gefilterten Ergebnisse: Am Ende wird nur die Liste filteredPins angezeigt, die alle Bedingungen erfüllt. */

function filterPins() {
  const filteredPins = fishdatamvp.filter((location) => {
    // Gehe durch alle Checkboxen, die auf der Seite vorhanden sind
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    const selectedCategory = document.getElementById("category").value;
    console.log(selectedCategory);

    for (let checkbox of checkboxes) {
      // Prüfe, ob die Checkbox aktiviert ist und ob `location` die entsprechende Eigenschaft nicht hat
      if (checkbox.checked) {
        const key = checkbox.id.charAt(0).toUpperCase() + checkbox.id.slice(1); // Passe den Namen des Attributs an

        if (!location[key]) return false; // Wenn das Attribut fehlt, schließen wir diesen Pin aus
      }
    }

    // Überprüfen der Selectbox
    if (selectedCategory !== "alle") {
      const categoryKey =
        selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
      if (!location[categoryKey]) return false; // Wenn die Kategorie nicht übereinstimmt, Pin ausschließen
    }

    return true; // Wenn alle aktivierten Filter erfüllt sind, bleibt dieser Pin in der Liste
  });

  // Zeige die gefilterten Pins auf der Karte an
  showPins(filteredPins);
}

//Eventhandler für Select
document.getElementById("category").addEventListener("change", selectbox);
// document
//   .getElementById("küstenfischerei")
//   .addEventListener("change", filterPins);
// document
//   .getElementById("binnenfischerei")
//   .addEventListener("change", filterPins);

// Event-Listener für alle Checkboxen hinzufügen
// document.getElementById("fischerei").addEventListener("change", filterPins);
// document.getElementById("räucherei").addEventListener("change", filterPins);
// document
//   .getElementById("teichwirtschaft")
//   .addEventListener("change", filterPins);
// document.getElementById("aquakultur").addEventListener("change", filterPins);
// document.getElementById("eigener_fang").addEventListener("change", filterPins);
// document
//   .getElementById("regionaler_fang")
//   .addEventListener("change", filterPins);

// document.getElementById("restaurant").addEventListener("change", filterPins);
// document.getElementById("museum").addEventListener("change", filterPins);
// document.getElementById("händler").addEventListener("change", filterPins);
// document.getElementById("imbiss").addEventListener("change", filterPins);
// document.getElementById("direktverkauf").addEventListener("change", filterPins);
// document.getElementById("fischbrötchen").addEventListener("change", filterPins);
// document.getElementById("räucherfisch").addEventListener("change", filterPins);
// document.getElementById("aal").addEventListener("change", filterPins);
// document.getElementById("forelle").addEventListener("change", filterPins);
// document.getElementById("saibling").addEventListener("change", filterPins);
// document.getElementById("karpfen").addEventListener("change", filterPins);
// document.getElementById("stör").addEventListener("change", filterPins);
// document.getElementById("wels").addEventListener("change", filterPins);
// document.getElementById("hecht").addEventListener("change", filterPins);
// document.getElementById("zander").addEventListener("change", filterPins);
// document.getElementById("kaviar").addEventListener("change", filterPins);
// document.getElementById("krabben").addEventListener("change", filterPins);
// document.getElementById("krebs").addEventListener("change", filterPins);
// document.getElementById("algen").addEventListener("change", filterPins);
// document.getElementById("onlineshop").addEventListener("change", filterPins);
// document.getElementById("beherbergung").addEventListener("change", filterPins);
// document.getElementById("gäste-fahrten").addEventListener("change", filterPins);
// document.getElementById("charter").addEventListener("change", filterPins);
// document.getElementById("seebestattung").addEventListener("change", filterPins);
// document.getElementById("angeln").addEventListener("change", filterPins);
// document.getElementById("liegeplätze").addEventListener("change", filterPins);
// document.getElementById("nachhaltig").addEventListener("change", filterPins);
// document.getElementById("msc").addEventListener("change", filterPins);
// document.getElementById("besucht").addEventListener("change", filterPins);
// document
//   .getElementById("goldener_seestern")
//   .addEventListener("change", filterPins);
// document.getElementById("bewertung").addEventListener("change", filterPins);
