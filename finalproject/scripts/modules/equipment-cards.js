export function createEquipmentCard(equipment) {
  return `
    <article class="equipment-card">
      <img src="${equipment.image}" alt="${equipment.name} rental equipment" width="400" height="300" loading="lazy">
      <h2>${equipment.name}</h2>
      <p class="tag">${equipment.category}</p>
      <dl class="property-list">
        <div><dt>Daily Rate</dt><dd>$${equipment.dailyRate}</dd></div>
        <div><dt>Power Type</dt><dd>${equipment.power}</dd></div>
        <div><dt>Best For</dt><dd>${equipment.bestFor}</dd></div>
        <div><dt>Safety</dt><dd>${equipment.safety}</dd></div>
      </dl>
      <button class="button details-button" type="button" data-id="${equipment.id}">View Details</button>
    </article>
  `;
}

export function createFeaturedCard(equipment) {
  return `
    <article class="card featured-card">
      <img src="${equipment.image}" alt="${equipment.name} rental equipment" width="400" height="300" loading="lazy">
      <div>
        <p class="tag">Popular Summer Tool</p>
        <h3>${equipment.name}</h3>
        <p>${equipment.description}</p>
        <p><strong>Best for:</strong> ${equipment.bestFor}</p>
        <a class="button" href="equipment.html">See Equipment</a>
      </div>
    </article>
  `;
}
