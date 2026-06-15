import { setupNavigation } from './modules/navigation.js';
import { setFooterInfo } from './modules/footer.js';
import { setupThemeToggle, saveCategoryFilter, getCategoryFilter } from './modules/storage.js';
import { setupEquipmentDialog } from './modules/modal.js';
import { createEquipmentCard } from './modules/equipment-cards.js';

setupNavigation();
setFooterInfo();
setupThemeToggle();

const grid = document.querySelector('#equipment-grid');
const categorySelect = document.querySelector('#category-filter');
const countOutput = document.querySelector('#equipment-count');
const averageOutput = document.querySelector('#average-rate');
const dialogController = setupEquipmentDialog();
let equipmentData = [];

loadEquipment();

async function loadEquipment() {
  if (!grid) return;

  try {
    const response = await fetch('data/equipment.json');
    if (!response.ok) {
      throw new Error('Equipment data was not available.');
    }

    equipmentData = await response.json();
    buildCategoryOptions(equipmentData);
    categorySelect.value = getCategoryFilter();
    renderEquipment(equipmentData, categorySelect.value);
  } catch (error) {
    grid.innerHTML = '<p class="error-message">The equipment list could not be loaded. Please refresh the page.</p>';
  }
}

function buildCategoryOptions(items) {
  if (!categorySelect) return;

  const categories = [...new Set(items.map((item) => item.category))].sort();
  categorySelect.innerHTML = `
    <option value="all">All Categories</option>
    ${categories.map((category) => `<option value="${category}">${category}</option>`).join('')}
  `;

  categorySelect.addEventListener('change', () => {
    saveCategoryFilter(categorySelect.value);
    renderEquipment(equipmentData, categorySelect.value);
  });
}

function renderEquipment(items, category) {
  const filteredItems = category === 'all'
    ? items
    : items.filter((item) => item.category === category);

  grid.innerHTML = filteredItems.map(createEquipmentCard).join('');

  const averageRate = filteredItems.length
    ? Math.round(filteredItems.reduce((total, item) => total + item.dailyRate, 0) / filteredItems.length)
    : 0;

  if (countOutput) {
    countOutput.textContent = `${filteredItems.length} item${filteredItems.length === 1 ? '' : 's'} shown`;
  }

  if (averageOutput) {
    averageOutput.textContent = `Average daily rate: $${averageRate}`;
  }

  document.querySelectorAll('.details-button').forEach((button) => {
    button.addEventListener('click', () => {
      const selected = equipmentData.find((item) => item.id === button.dataset.id);
      if (selected && dialogController) {
        dialogController.open(selected);
      }
    });
  });
}
