import { supabase } from './supabase-client.js';

// Ce script gère la vue "Gestion du menu & Wok" de l'admin dashboard.
document.addEventListener('DOMContentLoaded', () => {
  const viewMenu   = document.getElementById('view-menu');
  const container  = document.getElementById('menu-management-container');
  if (!viewMenu || !container) return; // Sécurité

  // --- Interface de base (sélecteur de table + bouton ajout) ---
  container.innerHTML = `
    <div class="flex flex-col md:flex-row md:items-center mb-6 gap-4 flex-wrap">
      <div class="flex items-center gap-2">
        <label class="font-medium" for="menu-table-select">Table :</label>
        <select id="menu-table-select" class="border rounded px-3 py-2">
          <option value="menu_items">Menu classique</option>
          <option value="wok_bases">Wok – Bases</option>
          <option value="wok_pulpes">Wok – Pulpes</option>
          <option value="wok_favoris">Wok – Favoris</option>
          <option value="wok_sauces">Wok – Sauces</option>
          <option value="wok_toppings">Wok – Toppings</option>
        </select>
      </div>

      <input type="text" id="search-input" placeholder="Rechercher..." class="border rounded px-3 py-2 flex-1 md:w-64" />

      <button id="btn-add-item" class="px-4 py-2 bg-accent text-white rounded whitespace-nowrap hover:bg-accent/90 transition">Ajouter un item</button>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse text-sm">
        <thead class="bg-gray-100">
          <tr class="border-b">
            <th class="p-3">Nom</th>
            <th class="p-3">Prix</th>
            <th class="p-3 hidden md:table-cell">Description</th>
            <th class="p-3 hidden md:table-cell">Catégorie / Image</th>
            <th class="p-3">Actions</th>
          </tr>
        </thead>
        <tbody id="menu-items-body" class="divide-y"></tbody>
      </table>
    </div>
  `;

  const selectTable = document.getElementById('menu-table-select');
  const tbody       = document.getElementById('menu-items-body');
  const searchInput = document.getElementById('search-input');
  const btnAdd      = document.getElementById('btn-add-item');

  let currentTable = selectTable.value;
  let fullItems = [];

  // --- Fonctions principales ---
  async function loadItems() {
    tbody.innerHTML = `<tr><td class="p-4" colspan="5">Chargement...</td></tr>`;
    const { data, error } = await supabase.from(currentTable).select('*').order('id');
    if (error) {
      tbody.innerHTML = `<tr><td class="p-4 text-red-600" colspan="5">Erreur : ${error.message}</td></tr>`;
      return;
    }
    fullItems = data;
    renderItems(fullItems);
  }

  function renderItems(items) {
    tbody.innerHTML = '';
    items.forEach((item,idx) => {
      const tr = document.createElement('tr');
      tr.className = `hover:bg-gray-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`;

      if (currentTable === 'menu_items') {
        tr.innerHTML = `
          <td class="p-3">${item.name}</td>
          <td class="p-3">${Number(item.price).toFixed(2)}€</td>
          <td class="p-3 hidden md:table-cell">${item.description || ''}</td>
          <td class="p-3 hidden md:table-cell">${item.category || ''}</td>
          <td class="p-3">
            <button class="text-accent mr-2 edit-btn"   data-id="${item.id}">✏️</button>
            <button class="text-red-600 delete-btn" data-id="${item.id}">🗑️</button>
          </td>
        `;
      } else {
        tr.innerHTML = `
          <td class="p-3">${item.name}</td>
          <td class="p-3">${item.price !== null ? Number(item.price).toFixed(2)+'€' : '-'}</td>
          <td class="p-3 hidden md:table-cell">—</td>
          <td class="p-3 hidden md:table-cell">—</td>
          <td class="p-3">
            <button class="text-accent mr-2 edit-btn"   data-id="${item.id}">✏️</button>
            <button class="text-red-600 delete-btn" data-id="${item.id}">🗑️</button>
          </td>
        `;
      }
      tbody.appendChild(tr);
    });

    // Écouteurs actions
    tbody.querySelectorAll('.edit-btn').forEach(btn => btn.addEventListener('click', () => openEditModal(btn.dataset.id)));
    tbody.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', () => deleteItem(btn.dataset.id)));
  }

  async function deleteItem(id) {
    if (!confirm('Supprimer cet item ?')) return;
    const { error } = await supabase.from(currentTable).delete().eq('id', id);
    if (error) alert(`Erreur : ${error.message}`);
    else loadItems();
  }

  // --- Modal (ajout / édition) ---
  const modal = document.createElement('div');
  modal.id = 'item-modal';
  modal.className = 'hidden fixed inset-0 bg-black/50 flex items-center justify-center z-[90]';
  modal.innerHTML = `
    <div class="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full">
      <h3 id="modal-title" class="text-2xl font-semibold text-primary mb-6"></h3>
      <form id="item-form" class="space-y-4">
        <div>
          <label class="block mb-1">Nom</label>
          <input type="text" id="f-name" required class="w-full border rounded px-3 py-2">
        </div>
        <div id="price-field">
          <label class="block mb-1">Prix (€)</label>
          <input type="number" step="0.01" id="f-price" class="w-full border rounded px-3 py-2">
        </div>
        <div id="desc-field">
          <label class="block mb-1">Description</label>
          <textarea id="f-description" class="w-full border rounded px-3 py-2"></textarea>
        </div>
        <div id="cat-field">
          <label class="block mb-1">Catégorie</label>
          <select id="f-category" class="w-full border rounded px-3 py-2"></select>
        </div>
        <div id="img-field">
          <label class="block mb-1">URL image</label>
          <input type="text" id="f-image" class="w-full border rounded px-3 py-2">
        </div>
        <div class="flex justify-end gap-4 pt-4">
          <button type="button" id="btn-cancel-modal" class="px-4 py-2 bg-gray-300 rounded">Annuler</button>
          <button type="submit" class="px-4 py-2 bg-accent text-white rounded">Enregistrer</button>
        </div>
      </form>
    </div>`;
  document.body.appendChild(modal);

  const modalTitle   = document.getElementById('modal-title');
  const itemForm     = document.getElementById('item-form');
  const btnCancelMod = document.getElementById('btn-cancel-modal');
  const fName        = document.getElementById('f-name');
  const fPrice       = document.getElementById('f-price');
  const fDescription = document.getElementById('f-description');
  const fCategory    = document.getElementById('f-category');
  const fImage       = document.getElementById('f-image');
  const priceField   = document.getElementById('price-field');

  let editItemId = null;

  function updateFieldVisibility() {
    const isMenu = currentTable === 'menu_items';
    document.getElementById('desc-field').classList.toggle('hidden', !isMenu);
    document.getElementById('cat-field').classList.toggle('hidden', !isMenu);
    document.getElementById('img-field').classList.toggle('hidden', !isMenu);
    // Les sauces n'ont pas de prix dans le schéma
    priceField.classList.toggle('hidden', currentTable === 'wok_sauces');
  }

  function openAddModal() {
    editItemId = null;
    modalTitle.textContent = 'Ajouter un item';
    itemForm.reset();
    updateFieldVisibility();
    modal.classList.remove('hidden');
  }

  async function openEditModal(id) {
    editItemId = id;
    modalTitle.textContent = 'Modifier l\'item';
    const { data, error } = await supabase.from(currentTable).select('*').eq('id', id).single();
    if (error) { alert(`Erreur : ${error.message}`); return; }
    fName.value        = data.name || '';
    fPrice.value       = data.price || '';
    fDescription.value = data.description || '';
    fCategory.value    = data.category || '';
    fImage.value       = data.image_url || '';
    updateFieldVisibility();
    modal.classList.remove('hidden');
  }

  function closeModal() { modal.classList.add('hidden'); }
  btnCancelMod.addEventListener('click', closeModal);

  itemForm.addEventListener('submit', async e => {
    e.preventDefault();
    const payload = { name: fName.value.trim() };
    if (!priceField.classList.contains('hidden') && fPrice.value) payload.price = parseFloat(fPrice.value);
    if (currentTable === 'menu_items') {
      payload.description = fDescription.value.trim();
      payload.category    = fCategory.value.trim();
      payload.image_url   = fImage.value.trim();
    }
    let result;
    if (editItemId) {
      result = await supabase.from(currentTable).update(payload).eq('id', editItemId);
    } else {
      result = await supabase.from(currentTable).insert(payload);
    }
    if (result.error) {
      alert(`Erreur : ${result.error.message}`);
    } else {
      closeModal();
      loadItems();
    }
  });

  // --- Écouteurs et init ---
  btnAdd.addEventListener('click', openAddModal);

  // Filtre recherche
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    const filtered = fullItems.filter(it => it.name.toLowerCase().includes(q));
    renderItems(filtered);
  });

  // --- Gestion des catégories (select) ---
  let categories = [];

  async function loadCategories() {
    const { data, error } = await supabase.from('menu_items').select('category');
    if (!error && data) {
      categories = [...new Set(data.map(d => d.category).filter(Boolean))];
      populateCategorySelect(); // Met à jour immédiatement le select si le modal est déjà ouvert
    }
  }

  function populateCategorySelect() {
    const select = document.getElementById('f-category');
    if (!select) return;
    select.innerHTML = categories.map(c => `<option value="${c}">${c}</option>`).join('');
  }

  selectTable.addEventListener('change', () => {
    currentTable = selectTable.value;
    updateFieldVisibility();
    loadItems();
  });

  // Charger catégories et items
  loadCategories().then(loadItems);

  supabase.auth.getSession().then(({ data: { session } }) => { if (session) { loadCategories().then(loadItems); } });
  supabase.auth.onAuthStateChange((_event, session) => { if (session) { loadCategories().then(loadItems); } });
}); 