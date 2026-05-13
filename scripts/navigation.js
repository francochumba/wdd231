export function setupNavigation() {
    const hamburger = document.querySelector("#hamburger");
    const primaryNav = document.querySelector("#primary-nav");

    hamburger.addEventListener("click", () => {
        primaryNav.classList.toggle("open");

        const isOpen = primaryNav.classList.contains("open");

        hamburger.textContent = isOpen ? "X" : "☰";
        hamburger.setAttribute("aria-expanded", isOpen);
    });
}