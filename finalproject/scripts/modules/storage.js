const themeKey = 'spr-theme';
const categoryKey = 'spr-category-filter';
const visitKey = 'spr-last-visit';

export function setupThemeToggle() {
  const themeButton = document.querySelector('#theme-button');
  const savedTheme = localStorage.getItem(themeKey);

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }

  updateThemeButton(themeButton);

  if (!themeButton) return;

  themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem(themeKey, theme);
    updateThemeButton(themeButton);
  });
}

function updateThemeButton(button) {
  if (!button) return;
  const isDark = document.body.classList.contains('dark-mode');
  button.textContent = isDark ? 'Use Light Mode' : 'Use Dark Mode';
}

export function saveCategoryFilter(value) {
  localStorage.setItem(categoryKey, value);
}

export function getCategoryFilter() {
  return localStorage.getItem(categoryKey) || 'all';
}

export function displayVisitMessage() {
  const visitMessage = document.querySelector('#visit-message');
  if (!visitMessage) return;

  const lastVisit = localStorage.getItem(visitKey);
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  visitMessage.textContent = lastVisit
    ? `Welcome back. Your last visit was ${lastVisit}.`
    : 'Welcome. This site will remember your display preference for your next visit.';

  localStorage.setItem(visitKey, today);
}
