// js/main.js
import { loadAllData } from './dataService.js';
import { setupModal } from './modal.js';
import { renderTable } from './renderers.js';

const STATUS = document.getElementById('status');
const SEARCH = document.getElementById('searchInput');

const TABS = [
  { id: 'attributes', buttonId: 'tab-attributes', sectionId: 'section-attributes', tbodyId: 'tbody-attributes', type: 'attributes', datasetKey: 'attributes' },
  { id: 'enhancements', buttonId: 'tab-enhancements', sectionId: 'section-enhancements', tbodyId: 'tbody-enhancements', type: 'enhancements', datasetKey: 'enhancements' },
  { id: 'limiters', buttonId: 'tab-limiters', sectionId: 'section-limiters', tbodyId: 'tbody-limiters', type: 'limiters', datasetKey: 'limiters' },
  { id: 'defects', buttonId: 'tab-defects', sectionId: 'section-defects', tbodyId: 'tbody-defects', type: 'defects', datasetKey: 'defects' },
  { id: 'weaponEnhancements', buttonId: 'tab-weapon-enhancements', sectionId: 'section-weapon-enhancements', tbodyId: 'tbody-weapon-enhancements', type: 'weaponEnhancements', datasetKey: 'weaponEnhancements' },
  { id: 'weaponLimiters', buttonId: 'tab-weapon-limiters', sectionId: 'section-weapon-limiters', tbodyId: 'tbody-weapon-limiters', type: 'weaponLimiters', datasetKey: 'weaponLimiters' },
];

let activeTabId = 'attributes';
let dataStore = {};
let filteredStore = {};

function setStatus(text) {
  STATUS.textContent = text;
}

function applyFilter(openModal) {
  const query = (SEARCH.value || '').toLowerCase().trim();
  const tab = TABS.find(t => t.id === activeTabId);
  if (!tab) return;

  const fullData = dataStore[tab.datasetKey] || [];
  const filtered = !query
    ? fullData.slice()
    : fullData.filter(item => (item.name || '').toLowerCase().includes(query));

  filteredStore[tab.datasetKey] = filtered;

  const tbody = document.getElementById(tab.tbodyId);
  renderTable(tab.type, filtered, tbody, openModal);

  const totals = TABS
    .map(t => `${(dataStore[t.datasetKey] || []).length} ${t.id}`)
    .join(' • ');

  setStatus(`Loaded: ${totals}. Showing ${filtered.length} ${tab.id}.`);
}

function activateTab(tabId, openModal) {
  activeTabId = tabId;

  TABS.forEach(tab => {
    const btn = document.getElementById(tab.buttonId);
    const section = document.getElementById(tab.sectionId);
    const isActive = tab.id === tabId;

    if (isActive) {
      section.classList.remove('hidden');
      btn.classList.add('bg-slate-800', 'text-emerald-300', 'border-emerald-400');
      btn.classList.remove('text-slate-300', 'border-transparent');
    } else {
      section.classList.add('hidden');
      btn.classList.remove('bg-slate-800', 'text-emerald-300', 'border-emerald-400');
      btn.classList.add('text-slate-300', 'border-transparent');
    }
  });

  applyFilter(openModal);
}

async function init() {
  const { openModal } = setupModal();

  try {
    dataStore = await loadAllData();
    console.log(dataStore);
    filteredStore = {};
    setStatus('Data loaded. Initializing view...');
  } catch (err) {
    console.error(err);
    setStatus('Error loading JSON files. Make sure they are served via HTTP and exist in this directory.');
    dataStore = {};
    filteredStore = {};
  }

  // Hook up tabs
  TABS.forEach(tab => {
    const btn = document.getElementById(tab.buttonId);
    btn.addEventListener('click', () => activateTab(tab.id, openModal));
  });

  // Search
  SEARCH.addEventListener('input', () => applyFilter(openModal));

  // Initial tab
  activateTab(activeTabId, openModal);
}

document.addEventListener('DOMContentLoaded', init);
