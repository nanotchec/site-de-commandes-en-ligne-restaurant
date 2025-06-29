
export const wokOptions = {
  bases: [
    { nom: "Pâtes de riz", prix: 6.90 },
    { nom: "Nouilles jaunes", prix: 6.90 },
    { nom: "Udon", prix: 6.90 },
    { nom: "Riz parfumé", prix: 6.90 },
  ],
  pulpes: [
    { nom: "Oignons", prix: 0.40 },
    { nom: "Ail", prix: 0.40 },
    { nom: "Gingembre", prix: 0.40 },
    { nom: "Piment", prix: 0.40 },
  ],
  favoris: [
    { nom: "Poulet", prix: 2.00 },
    { nom: "Poulet crousti", prix: 2.80 },
    { nom: "Bœuf", prix: 2.50 },
    { nom: "Crevettes", prix: 2.50 },
    { nom: "Calamar", prix: 2.50 },
    { nom: "Tofu", prix: 2.00 },
    { nom: "Pak choï", prix: 1.40 },
    { nom: "Poivrons", prix: 1.40 },
    { nom: "Oignons doux", prix: 1.20 },
    { nom: "Citronnelle", prix: 1.20 },
    { nom: "Brocolis", prix: 1.40 },
    { nom: "Basilic thaï", prix: 1.20 },
    { nom: "Mini maïs", prix: 1.40 },
    { nom: "Ananas", prix: 1.40 },
    { nom: "Champignon noir", prix: 1.50 },
    { nom: "Champignon de Paris", prix: 1.50 },
    { nom: "Shitaké", prix: 1.50 },
    { nom: "Bambou", prix: 1.40 },
    { nom: "Noix de cajou", prix: 1.20 },
  ],
  sauces: [
    { nom: "Pad Thaï" },
    { nom: "Pad See Ew" },
    { nom: "Curry Rouge" },
    { nom: "Curry Jaune" },
    { nom: "Aigre-douce" },
  ],
  toppings: [
    { nom: "Coriandre fraîche" },
    { nom: "Cacahuètes" },
    { nom: "Oignons frits" },
    { nom: "Crevettes séchées" },
    { nom: "Ciboulette thaï" },
    { nom: "Citron" },
    { nom: "Graines de sesame" },
  ],
};

let selectedWok = {
  base: null,
  pulpes: [],
  favoris: [],
  sauce: null,
  toppings: [],
  total: 0,
};

function renderWokOptions() {
  const { bases, pulpes, favoris, sauces, toppings } = wokOptions;

  const renderOptions = (containerId, items, type) => {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'flex items-center gap-2';
      const input = document.createElement('input');
      input.type = type === 'radio' ? 'radio' : 'checkbox';
      input.name = type === 'radio' ? containerId : item.nom;
      input.value = item.nom;
      input.dataset.prix = item.prix || (containerId === 'wok-toppings' ? 0.60 : 0);
      input.dataset.category = containerId.replace('wok-', '');
      input.addEventListener('change', updateWokSelection);

      const label = document.createElement('label');
      label.textContent = `${item.nom}${item.prix ? ` (+${item.prix.toFixed(2)}€)` : ''}`;
      label.htmlFor = input.id = `${containerId}-${item.nom}`;

      div.appendChild(input);
      div.appendChild(label);
      container.appendChild(div);
    });
  };

  renderOptions('wok-base', bases, 'radio');
  renderOptions('wok-pulpe', pulpes, 'checkbox');
  renderOptions('wok-favoris', favoris, 'checkbox');
  renderOptions('wok-sauce', sauces, 'radio');
  renderOptions('wok-toppings', toppings, 'checkbox');
}

function updateWokSelection(event) {
  const { value, checked, dataset, type } = event.target;
  const prix = parseFloat(dataset.prix);
  const category = dataset.category; // e.g., 'base', 'pulpe', 'favoris'

  if (type === 'radio') {
    selectedWok[category] = { nom: value, prix };
  } else {
    // For checkboxes, map the singular category to the plural property name in the selectedWok object
    const listName = category === 'pulpe' ? 'pulpes' : category;
    const list = selectedWok[listName];

    if (!list) return; // Safety check

    if (checked) {
      list.push({ nom: value, prix });
    } else {
      const index = list.findIndex(item => item.nom === value);
      if (index > -1) list.splice(index, 1);
    }
  }

  calculateWokTotal();
}

function calculateWokTotal() {
  let total = 0;
  if (selectedWok.base) total += selectedWok.base.prix;
  selectedWok.pulpes.forEach(p => total += p.prix);
  selectedWok.favoris.forEach(f => total += f.prix);
  selectedWok.toppings.forEach(t => total += 0.60);

  selectedWok.total = total;
  document.getElementById('wok-total').textContent = total.toFixed(2);
}

function resetWokForm() {
  selectedWok = {
    base: null,
    pulpes: [],
    favoris: [],
    sauce: null,
    toppings: [],
    total: 0,
  };

  document.querySelectorAll('#wok-composer input').forEach(input => {
    if (input.type === 'radio' || input.type === 'checkbox') {
      input.checked = false;
    }
  });

  calculateWokTotal();
}

document.getElementById('btn-add-wok').addEventListener('click', () => {
  if (!selectedWok.base || !selectedWok.sauce) {
    alert('Veuillez choisir une base et une sauce pour votre Wok.');
    return;
  }

  const wokItem = {
    id: `wok-${Date.now()}`,
    nom: 'Wok Composé',
    prix: selectedWok.total,
    categorie: 'Wok',
    details: {
      base: selectedWok.base.nom,
      pulpes: selectedWok.pulpes.map(p => p.nom),
      favoris: selectedWok.favoris.map(f => f.nom),
      sauce: selectedWok.sauce.nom,
      toppings: selectedWok.toppings.map(t => t.nom),
    }
  };

  window.addWokToCart(wokItem);
  alert('Wok ajouté au panier !');
  resetWokForm();
});

export function initWokComposer() {
  renderWokOptions();
}
