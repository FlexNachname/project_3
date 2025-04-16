// components/CharacterCard/CharacterCard.js

// Exportiere die Funktion, damit sie in index.js benutzt werden kann
export function CharacterCard() {
  // Erstelle ein neues <li>-Element, das die Karte repräsentiert
  const card = document.createElement("li");

  // Füge die CSS-Klasse "card" hinzu
  card.classList.add("card");

  // Setze das HTML der Karte (aus index.html übernommen)
  card.innerHTML = `
    <div class="card__image-container">
      <img
        class="card__image"
        src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
        alt="Rick Sanchez"
      />
      <div class="card__image-gradient"></div>
    </div>
    <div class="card__content">
      <h2 class="card__title">Rick Sanchez</h2>
      <dl class="card__info">
        <dt class="card__info-title">Status</dt>
        <dd class="card__info-description">Alive</dd>
        <dt class="card__info-title">Type</dt>
        <dd class="card__info-description"></dd>
        <dt class="card__info-title">Occurrences</dt>
        <dd class="card__info-description">51</dd>
      </dl>
    </div>
  `;

  // Gib die fertige Karte zurück (noch nicht eingefügt!)
  return card;
}
