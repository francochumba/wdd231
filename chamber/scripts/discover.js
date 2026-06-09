import { places } from "../data/discover.mjs";
import { setupNavigation } from "./navigation.js";
import { displayDates } from "./dates.js";

const cardsContainer = document.querySelector("#discover-cards");
const visitorMessage = document.querySelector("#visitor-message");

setupNavigation();
displayDates();

function displayVisitMessage() {
  const currentVisit = Date.now();
  const lastVisit = Number(localStorage.getItem("lastVisit"));
  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  if (!lastVisit) {
    visitorMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const daysBetweenVisits = Math.floor((currentVisit - lastVisit) / millisecondsPerDay);

    if (daysBetweenVisits < 1) {
      visitorMessage.textContent = "Back so soon! Awesome!";
    } else {
      const dayText = daysBetweenVisits === 1 ? "day" : "days";
      visitorMessage.textContent = `You last visited ${daysBetweenVisits} ${dayText} ago.`;
    }
  }

  localStorage.setItem("lastVisit", currentVisit);
}

function displayPlaces() {
  cardsContainer.innerHTML = "";

  places.forEach((place) => {
    const card = document.createElement("article");
    card.classList.add("discover-card", `area-${place.id}`);

    const title = document.createElement("h2");
    title.textContent = place.name;

    const figure = document.createElement("figure");

    const image = document.createElement("img");
    image.src = place.image;
    image.alt = place.alt;
    image.width = 300;
    image.height = 200;
    image.loading = "lazy";

    const address = document.createElement("address");
    address.textContent = place.address;

    const description = document.createElement("p");
    description.textContent = place.description;

    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "Learn More";

    figure.appendChild(image);
    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(button);
    cardsContainer.appendChild(card);
  });
}

displayVisitMessage();
displayPlaces();