import { displayDates } from "./dates.js";
import { setupNavigation } from "./navigation.js";

function setTimestamp() {
    const timestamp = document.querySelector("#timestamp");

    if (timestamp) {
        timestamp.value = new Date().toLocaleString();
    }
}

function setupModals() {
    const modalLinks = document.querySelectorAll("[data-modal]");
    const closeButtons = document.querySelectorAll("[data-close]");
    const dialogs = document.querySelectorAll("dialog");

    modalLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            const modalId = link.dataset.modal;
            const modal = document.querySelector(`#${modalId}`);

            if (modal) {
                modal.showModal();
            }
        });
    });

    closeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            button.closest("dialog").close();
        });
    });

    dialogs.forEach((dialog) => {
        dialog.addEventListener("click", (event) => {
            if (event.target === dialog) {
                dialog.close();
            }
        });
    });
}

displayDates();
setupNavigation();
setTimestamp();
setupModals();