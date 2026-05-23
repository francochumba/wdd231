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

function renderSpotlights(members) {
    const spotlightCards = document.querySelector("#spotlight-cards");

    const qualifiedMembers = members.filter((member) => member.membership === 2 || member.membership === 3);
    const selectedMembers = shuffleMembers(qualifiedMembers).slice(0, 3);

    spotlightCards.innerHTML = "";

    selectedMembers.forEach((member) => {
        const card = document.createElement("article");
        card.classList.add("member-card", "spotlight-card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" class="member-image" loading="lazy">
            <h3 class="member-name">${member.name}</h3>
            <p class="member-address">${member.address}</p>
            <p class="member-phone">${member.phone}</p>
            <a href="${member.website}" target="_blank" rel="noopener" class="member-website">Visit Website</a>
            <p class="member-level ${getMembershipClass(member.membership)}">
                ${getMembershipLevel(member.membership)}
            </p>
        `;

        spotlightCards.appendChild(card);
    });
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