const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const hamburger = document.querySelector("#hamburger");
const primaryNav = document.querySelector("#primary-nav");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

if (hamburger && primaryNav) {
    hamburger.addEventListener("click", () => {
        primaryNav.classList.toggle("open");
    });
}

const getMembershipLevel = (level) => {
    if (level === 3) {
        return "Gold";
    }

    if (level === 2) {
        return "Silver";
    }

    return "Member";
};

const getMembershipClass = (level) => {
    if (level === 3) {
        return "gold";
    }

    if (level === 2) {
        return "silver";
    }

    return "member";
};

const displayMembers = (members) => {
    membersContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");
        card.classList.add("member-card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" loading="lazy">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p>${member.description}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <span class="member-level ${getMembershipClass(member.membership)}">
                ${getMembershipLevel(member.membership)}
            </span>
        `;

        membersContainer.appendChild(card);
    });
};

const getMembers = async () => {
    try {
        const response = await fetch("data/members.json");
        const data = await response.json();

        displayMembers(data);
    } catch (error) {
        membersContainer.innerHTML = "<p>Business information could not be loaded.</p>";
        console.error(error);
    }
};

gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");

    gridButton.classList.add("active");
    listButton.classList.remove("active");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");

    listButton.classList.add("active");
    gridButton.classList.remove("active");
});

getMembers();