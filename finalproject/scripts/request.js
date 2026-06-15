import { setupNavigation } from './modules/navigation.js';
import { setFooterInfo } from './modules/footer.js';
import { setupThemeToggle } from './modules/storage.js';

setupNavigation();
setFooterInfo();
setupThemeToggle();
loadEquipmentOptions();
setMinimumDate();

async function loadEquipmentOptions() {
  const equipmentSelect = document.querySelector('#equipment');
  if (!equipmentSelect) return;

  try {
    const response = await fetch('data/equipment.json');
    if (!response.ok) {
      throw new Error('Equipment data was not available.');
    }

    const equipment = await response.json();
    const options = equipment
      .map((item) => `<option value="${item.name}">${item.name} - $${item.dailyRate}/day</option>`)
      .join('');

    equipmentSelect.insertAdjacentHTML('beforeend', options);
  } catch (error) {
    equipmentSelect.insertAdjacentHTML('beforeend', '<option value="Equipment list unavailable">Equipment list unavailable</option>');
  }
}

function setMinimumDate() {
  const dateInput = document.querySelector('#start-date');
  if (!dateInput) return;

  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}
