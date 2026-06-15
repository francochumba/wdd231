export function setupNavigation() {
  const menuButton = document.querySelector('#menu-button');
  const navigation = document.querySelector('#navigation');
  const navLinks = document.querySelectorAll('#navigation a');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  if (!menuButton || !navigation) return;

  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.textContent = isOpen ? '✕' : '☰';
  });
}
