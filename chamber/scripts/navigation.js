export function setupNavigation() {
    const hamburger = document.querySelector("#hamburger");
    const primaryNav = document.querySelector("#primary-nav");

    if (!hamburger || !primaryNav) {
        return;
    }

    hamburger.addEventListener("click", () => {
        primaryNav.classList.toggle("open");

        const isOpen = primaryNav.classList.contains("open");

        hamburger.textContent = isOpen ? "✕" : "☰";
        hamburger.setAttribute("aria-expanded", isOpen);
    });
}