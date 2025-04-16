import { CharacterCard } from "./components/CharacterCard/CharacterCard.js";

// States
let maxPage = 1;
let page = 1;
let query = "";

const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);

const searchBar = document.querySelector('[data-js="search-bar"]');
//const navigation = document.querySelector('[data-js="navigation"]');
const pagination = document.querySelector('[data-js="pagination"]');
const cardContainer = document.querySelector('[data-js="card-container"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');

showSearchIcon();
fetchCharacters(page, "");

async function fetchCharacters(currentPage, searchQuery = "") {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${currentPage}&name=${searchQuery}`
  );
  const data = await response.json();

  // Maximale Seitenazahl von den API-Daten
  maxPage = data.info.pages;

  // Aktualisierung der Seiten
  pagination.textContent = `${page} / ${maxPage} `;

  // Buttons disabled für User-exp
  prevButton.disabled = page == 1;
  nextButton.disabled = page == maxPage;

  // Karte anzeigen (leer)
  cardContainer.innerHTML = "";

  for (const character of data.results) {
    const card = CharacterCard(
      character.image,
      character.name,
      character.status,
      character.type,
      character.episode.length
    );
    cardContainer.appendChild(card);
  }
}

// Funktionen zum auswechseln der jeweiligen Icons (Suche & Suchergebnis zurücksetzen)

function showSearchIcon() {
  const searchIcon = document.querySelector(".search-bar__icon");
  searchIcon.src = "assets/magnifying-glass.png"; // Icon austauschen
  searchIcon.alt = "search for character"; // Alt-Text anpassen
  searchIcon.parentElement.setAttribute("aria-label", "search for character");
}

function showResetIcon() {
  const searchIcon = document.querySelector(".search-bar__icon");
  searchIcon.src = "assets/xmark-solid.svg"; // Icon austauschen
  searchIcon.alt = "reset search"; // Alt-Text anpassen
  searchIcon.parentElement.setAttribute("aria-label", "reset search");
}

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    fetchCharacters(page, query);

    // Scrollt zum oberen Rand der Seite
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
});

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    fetchCharacters(page, query);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
});

searchBar.addEventListener("submit", (event) => {
  // verhindert Reload
  event.preventDefault();

  const formData = new FormData(event.target);
  const searchText = Object.fromEntries(formData);
  query = searchText.query;

  // Auf Seite 1 zurücksetzen
  page = 1;
  // neu laden mit Suchwort
  fetchCharacters(page, query);

  if (query === "") {
    showSearchIcon();
  } else {
    showResetIcon();
  }

  searchBar.reset();
});
