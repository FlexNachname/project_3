import { CharacterCard } from "./components/CharacterCard/CharacterCard.js";

// States
let maxPage = 1;
let page = 1;
let query = "";

const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const pagination = document.querySelector('[data-js="pagination"]');

const cardContainer = document.querySelector('[data-js="card-container"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');

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

fetchCharacters(page, "");

searchBar.addEventListener("submit", (event) => {
  // verhindert Reload
  event.preventDefault();

  const formData = new FormData(event.target);
  const searchText = Object.fromEntries(formData);
  query = searchText.query;
  // neu laden mit Suchwort
  fetchCharacters(page, query);

  searchBar.reset();
});

// Nicht benötigt?
//const query = formData.get("query").trim();
