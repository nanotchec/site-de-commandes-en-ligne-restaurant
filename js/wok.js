import { supabase } from './supabase-client.js';

let wokOptions = {
  bases: [],
  pulpes: [],
  favoris: [],
  sauces: [],
  toppings: [],
};

async function fetchWokOptions() {
  try {
    const results = await Promise.all([
      supabase.from('wok_bases').select('*'),
      supabase.from('wok_pulpes').select('*'),
      supabase.from('wok_favoris').select('*'),
      supabase.from('wok_sauces').select('*'),
      supabase.from('wok_toppings').select('*')
    ]);

    const [bases, pulpes, favoris, sauces, toppings] = results;

    if (bases.error) throw new Error(`Erreur bases: ${bases.error.message}`);
    if (pulpes.error) throw new Error(`Erreur pulpes: ${pulpes.error.message}`);
    if (favoris.error) throw new Error(`Erreur favoris: ${favoris.error.message}`);
    if (sauces.error) throw new Error(`Erreur sauces: ${sauces.error.message}`);
    if (toppings.error) throw new Error(`Erreur toppings: ${toppings.error.message}`);

    wokOptions = {
      bases: bases.data || [],
      pulpes: pulpes.data || [],
      favoris: favoris.data || [],
      sauces: sauces.data || [],
      toppings: toppings.data || [],
    };

    console.log('Wok options fetched successfully:', wokOptions);
  } catch (error) {
    console.error('Error fetching wok options:', error);
  }
}

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
    if (!container) {
      console.error(`Erreur : Le conteneur #${containerId} est introuvable dans le DOM.`);
      return;
    }
    container.innerHTML = '';
    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'flex items-center gap-2';
      const input = document.createElement('input');
      input.type = type === 'radio' ? 'radio' : 'checkbox';
      input.name = type === 'radio' ? containerId : item.name;
      input.value = item.name;
      input.dataset.price = item.price || 0;
      input.dataset.category = containerId.replace('wok-', '');
      input.addEventListener('change', updateWokSelection);

      const label = document.createElement('label');
      label.textContent = `${item.name}${item.price ? ` (+${item.price.toFixed(2)}€)` : ''}`;
      label.htmlFor = input.id = `${containerId}-${item.name}`;

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
  const price = parseFloat(dataset.price) || 0;
  const category = dataset.category; // e.g., 'base', 'pulpe', 'favoris'

  if (type === 'radio') {
    selectedWok[category] = { name: value, price };
  } else { // Checkbox
    const categoryMapping = {
      'pulpe': 'pulpes',
      'favoris': 'favoris',
      'toppings': 'toppings'
    };
    const listName = categoryMapping[category];

    if (!listName || !selectedWok[listName]) return; // Safety check

    const list = selectedWok[listName];

    if (checked) {
      list.push({ name: value, price });
    } else {
      const index = list.findIndex(item => item.name === value);
      if (index > -1) list.splice(index, 1);
    }
  }

  calculateWokTotal();
}

function calculateWokTotal() {
  let total = 0;
  if (selectedWok.base) total += selectedWok.base.price;
  selectedWok.pulpes.forEach(p => total += p.price);
  selectedWok.favoris.forEach(f => total += f.price);
  selectedWok.toppings.forEach(t => total += t.price);

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
    name: 'Wok Composé',
    price: selectedWok.total,
    category: 'Wok',
    base: selectedWok.base.name,
    pulpes: selectedWok.pulpes.map(p => p.name),
    favoris: selectedWok.favoris.map(f => f.name),
    sauce: selectedWok.sauce.name,
    toppings: selectedWok.toppings.map(t => t.name),
  };

  window.addWokToCart(wokItem);
  alert('Wok ajouté au panier !');
  resetWokForm();
});

async function initWokComposer() {
  await fetchWokOptions();
  renderWokOptions();
}

// Lançons l'initialisation dès que le script est chargé et que le DOM est prêt.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initWokComposer);
} else {
  initWokComposer();
}
