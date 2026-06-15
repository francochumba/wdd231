import { setupNavigation } from './modules/navigation.js';
import { setFooterInfo } from './modules/footer.js';
import { setupThemeToggle, displayVisitMessage } from './modules/storage.js';
import { createFeaturedCard } from './modules/equipment-cards.js';

setupNavigation();
setFooterInfo();
setupThemeToggle();
displayVisitMessage();
loadFeaturedEquipment();

async function loadFeaturedEquipment() {
  const featuredContainer = document.querySelector('#featured-equipment');
  if (!featuredContainer) return;

  try {
    const response = await fetch('data/equipment.json');
    if (!response.ok) {
      throw new Error('Equipment data was not available.');
    }

    const equipment = await response.json();
    const featuredItems = equipment
      .filter((item) => ['Cleaning', 'Yard Care', 'Repair'].includes(item.category))
      .slice(0, 3);

    featuredContainer.innerHTML = featuredItems.map(createFeaturedCard).join('');
  } catch (error) {
    featuredContainer.innerHTML = '<p class="error-message">Equipment information could not be loaded. Please try again later.</p>';
  }
}
