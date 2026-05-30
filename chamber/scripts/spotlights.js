function getMembershipLevel(level) {
    if (level === 3) {
        return "Gold";
    }

    if (level === 2) {
        return "Silver";
    }

    return "Member";
}

function getMembershipClass(level) {
    if (level === 3) {
        return "gold";
    }

    if (level === 2) {
        return "silver";
    }

    return "member";
}

function shuffleMembers(members) {
    return [...members].sort(() => Math.random() - 0.5);
}

function createSpotlightCard(member) {
    return `
        <article class="spotlight-card">
            <div class="spotlight-image-container">
                <img src="images/${member.image}" alt="${member.name} logo" class="spotlight-logo" loading="lazy">
                <span class="member-level ${getMembershipClass(member.membership)}">
                    ${getMembershipLevel(member.membership)}
                </span>
            </div>

            <h3 class="member-name">${member.name}</h3>
            <a href="${member.website}" target="_blank" rel="noopener" class="member-website">Visit Website</a>
        </article>
    `;
}

function renderSpotlights(members) {
    const spotlightCards = document.querySelector("#spotlight-cards");

    const qualifiedMembers = members.filter((member) => member.membership === 2 || member.membership === 3);
    const selectedMembers = shuffleMembers(qualifiedMembers);

    if (selectedMembers.length === 0) {
        spotlightCards.innerHTML = "<p>No spotlight members are available.</p>";
        return;
    }

    spotlightCards.innerHTML = `
        <div class="spotlight-carousel">
            <button class="carousel-button" type="button" id="previous-spotlight" aria-label="Previous spotlight">‹</button>

            <div class="spotlight-window">
                <div class="spotlight-track">
                    ${selectedMembers.map(createSpotlightCard).join("")}
                </div>
            </div>

            <button class="carousel-button" type="button" id="next-spotlight" aria-label="Next spotlight">›</button>
        </div>
    `;

    const track = document.querySelector(".spotlight-track");
    const cards = document.querySelectorAll(".spotlight-card");
    const previousButton = document.querySelector("#previous-spotlight");
    const nextButton = document.querySelector("#next-spotlight");

    let currentIndex = 0;

    function getVisibleCards() {
        return window.innerWidth >= 768 ? 3 : 1;
    }

    function getCardStep() {
        const card = cards[0];
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.columnGap) || 0;

        return card.offsetWidth + gap;
    }

    function moveCarousel() {
        const step = getCardStep();
        track.style.transform = `translateX(-${currentIndex * step}px)`;
    }

    function showNext() {
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(cards.length - visibleCards, 0);

        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        moveCarousel();
    }

    function showPrevious() {
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(cards.length - visibleCards, 0);

        currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
        moveCarousel();
    }

    nextButton.addEventListener("click", showNext);
    previousButton.addEventListener("click", showPrevious);

    window.addEventListener("resize", () => {
        currentIndex = 0;
        moveCarousel();
    });

    if (selectedMembers.length > 3) {
        setInterval(showNext, 5000);
    }
}

export async function displaySpotlights() {
    const spotlightCards = document.querySelector("#spotlight-cards");

    if (!spotlightCards) {
        return;
    }

    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load members.json");
        }

        const data = await response.json();
        renderSpotlights(data);
    } catch (error) {
        spotlightCards.innerHTML = "<p>Business spotlights could not be loaded.</p>";
        console.error(error);
    }
}