let map;
let markers = [];

/////////// MAP ////////////

// Funktion zur Initialisierung der Karte
function initMap() {
  checkbox();
  selectbox();
  const center = { lat: 51.1657, lng: 10.4515 }; // Zentrum in Deutschland
  const mapOptions = {
    center: center,
    zoom: 8,
    mapId: "3c9fedfcb52e5828",
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  filterPins(); // Filtere Pins, wenn die Karte initialisiert wird
}

// Sicherstellen, dass initMap global verfügbar ist
window.initMap = initMap;

/////////// INITIAL PINS ON MAP ////////////

function showPins(pins) {
  clearMarkers(); // Zuerst alte Marker entfernen
  pins.forEach((location) => {
    if (location.Ausschließen !== true) {
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: location.Lat, lng: location.Long },
        map: map,
        title: location.Name,
      });
      console.log(location);
      // Listener für Klick-Event mit Übergabe der Location-Daten
      marker.addListener("click", () => openDetailPage(location));

      markers.push(marker); // Speichere Marker in Array
    }
  });
}

// Funktion, um alle Marker zu löschen
function clearMarkers() {
  markers.forEach((marker) => marker.setMap(null)); // Entferne Marker von der Karte
  markers = []; // Leere das Marker-Array
}

/////////// FILTER PINS ON MAP ////////////

/* Funktionsweise
1. Dynamisches Erfassen aller Checkboxen: Mit document.querySelectorAll("input[type='checkbox']") erfassen wir alle Checkboxen auf der Seite.
2. Filtern durch die Checkbox-Eigenschaften: Für jede Checkbox, die aktiviert ist, prüfen wir, ob der aktuelle location-Eintrag das entsprechende Attribut (umgewandelt in die passende Groß-/Kleinschreibung) enthält. Falls eine Checkbox aktiv ist und das location-Objekt das Attribut nicht hat, wird es ausgeschlossen.
3. Anzeige der gefilterten Ergebnisse: Am Ende wird nur die Liste filteredPins angezeigt, die alle Bedingungen erfüllt. */

function filterPins() {
  const filteredPins = fishdatamvp.filter((location) => {
    // Gehe durch alle Checkboxen, die auf der Seite vorhanden sind
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    const selectedCategory = document.getElementById("category").value;

    for (let checkbox of checkboxes) {
      // Prüfe, ob die Checkbox aktiviert ist und ob `location` die entsprechende Eigenschaft nicht hat
      if (checkbox.checked) {
        const key = checkbox.id;
        console.log(key);

        if (!location[key]) return false; // Wenn das Attribut fehlt, schließen wir diesen Pin aus
        // if (!location.Ausschließen) return false; // Wenn Ausschließen auf true ist, schließe Pin aus
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

// ALLE FILTER ZURÜCKSETZEN
document.getElementById("clearFilter").addEventListener("click", () => {
  // Setze alle Checkboxen zurück
  document.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
    checkbox.checked = false;
  });

  // Setze die Kategorieauswahl
  document.getElementById("category").value = "alle";

  // Zeige alle initialen Pins ohne Filter an
  showPins(fishdatamvp);
});

/////////// DETAIL PAGE ////////////

// OPEN DETAILPAGE AND FILL DETAILSPAGE DYNAMICALLY

function openDetailPage(location) {
  const detailPage = document.getElementById("detailPage");

  if (detailPage.style.display === "none" || detailPage.style.display === "") {
    detailPage.style.display = "block";
  }
  document
    .getElementById("close-detailPage")
    .addEventListener("click", closeDetailPage);
  function closeDetailPage() {
    detailPage.style.display = "none";
  }

  const imgElement = document.querySelector(".detailPage-img");
  imgElement.src = location.Bild;

  document.querySelector(".detailPage-info>h2").innerText = location.Name;

  if (location.goldener_Seestern === true) {
    document.querySelector(".seestern").innerHTML =
      "<img src='./seestern.png' alt='Auszeichnung Goldener Seestern' class='seestern'>";
  } else {
    // Bild entfernen, wenn goldener_Seestern false ist
    document.querySelector(".seestern").innerHTML = "";
  }

  // Löschen von bestehenden buttons
  const filterContainer = document.querySelector(".detailPage-info-filter");
  filterContainer.innerHTML = ""; // Clear previous buttons

  // Generiere buttons based on true keys
  const filterKeys = [
    "Küstenfischerei",
    "Binnenfischerei",
    "Teichwirtschaft",
    "Aquakultur",
    "Restaurant",
    "Imbiss",
    "Direktverkauf",
    "Onlineshop",
  ];
  filterKeys.forEach((key) => {
    if (location[key] === true) {
      filterContainer.innerHTML += `<button>${key}</button>`;
    }
  });

  const filterContainer2 = document.querySelector(".detailPage-info-filter2");
  filterContainer2.innerHTML = ""; // Clear previous buttons

  // Generiere buttons based on true keys
  const filterKeys2 = [
    "Eigener_Fang",
    "Regionaler_Fang",
    "Räucherfisch",
    "Fischbrötchen",
  ];
  filterKeys2.forEach((key) => {
    if (location[key] === true) {
      filterContainer2.innerHTML += `<button>${key.replace("_", " ")}</button>`;
    }
  });

  document.querySelector(
    ".detailPage-info .detailPage-info-description"
  ).innerText = location.Beschreibung;
  document.querySelector(".detailPage-info-address-street").innerText =
    location.Adresse;
  document.querySelector(".detailPage-info-address-zip").innerText =
    location.PLZ;
  document.querySelector(".detailPage-info-address-city").innerText =
    location.Stadt;
  document.querySelector(".detailPage-info-address-city").innerText =
    location.Stadt;
  document.querySelector(".detailPage-info-mail").innerText = location.E_Mail;
  document.querySelector(".detailPage-info-web").innerText = location.Webseite;
  document.querySelector(".detailPage-info-googlelink").innerText =
    location.Webseite;
  document.querySelector(".detailPage-info-socials-insta").innerText =
    "Ich werde ein hüpsches Insta Logo, toll <3";
  document.querySelector(".detailPage-info-socials-fb").innerText =
    "Ich werde ein hüpsches Facebook Logo, toll <3";
}
