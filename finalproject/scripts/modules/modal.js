export function setupEquipmentDialog() {
  const dialog = document.querySelector('#equipment-dialog');
  const closeButton = document.querySelector('#dialog-close');

  if (!dialog || !closeButton) return null;

  closeButton.addEventListener('click', () => dialog.close());

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  return {
    open(equipment) {
      const title = dialog.querySelector('#dialog-title');
      const body = dialog.querySelector('#dialog-body');

      title.textContent = equipment.name;
      body.innerHTML = `
        <p>${equipment.description}</p>
        <dl class="property-list">
          <div><dt>Category</dt><dd>${equipment.category}</dd></div>
          <div><dt>Daily Rate</dt><dd>$${equipment.dailyRate}</dd></div>
          <div><dt>Power Type</dt><dd>${equipment.power}</dd></div>
          <div><dt>Best For</dt><dd>${equipment.bestFor}</dd></div>
          <div><dt>Safety Note</dt><dd>${equipment.safety}</dd></div>
        </dl>
      `;

      dialog.showModal();
    }
  };
}
