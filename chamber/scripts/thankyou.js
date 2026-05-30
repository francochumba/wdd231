import { displayDates } from "./dates.js";
import { setupNavigation } from "./navigation.js";

const params = new URLSearchParams(window.location.search);

function displaySubmittedInfo() {
    const fields = {
        "display-first-name": params.get("firstName"),
        "display-last-name": params.get("lastName"),
        "display-email": params.get("email"),
        "display-phone": params.get("phone"),
        "display-organization": params.get("organization"),
        "display-timestamp": params.get("timestamp")
    };

    Object.entries(fields).forEach(([id, value]) => {
        const element = document.querySelector(`#${id}`);

        if (element) {
            element.textContent = value || "Not provided";
        }
    });
}

displayDates();
setupNavigation();
displaySubmittedInfo();