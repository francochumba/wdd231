import { setupNavigation } from './modules/navigation.js';
import { setFooterInfo } from './modules/footer.js';
import { setupThemeToggle } from './modules/storage.js';

setupNavigation();
setFooterInfo();
setupThemeToggle();
displayRequestData();

function displayRequestData() {
  const output = document.querySelector('#request-output');
  if (!output) return;

  const params = new URLSearchParams(window.location.search);

  if ([...params].length === 0) {
    output.innerHTML = '<p class="error-message">No request data was received. Please return to the request form and submit valid information.</p>';
    return;
  }

  const fields = [
    ['Full Name', params.get('full-name')],
    ['Email', params.get('email')],
    ['Phone', params.get('phone') || 'Not provided'],
    ['Equipment', params.get('equipment')],
    ['Project Type', params.get('project-type')],
    ['Rental Days', params.get('rental-days')],
    ['Start Date', params.get('start-date')],
    ['Project Notes', params.get('message') || 'No notes provided']
  ];

  output.innerHTML = `
    <article class="result-card">
      <h2>Request Details</h2>
      <dl class="property-list">
        ${fields.map(([label, value]) => `<div><dt>${label}</dt><dd>${value}</dd></div>`).join('')}
      </dl>
    </article>
  `;
}
