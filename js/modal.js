// js/modal.js

function formatMultiline(text) {
  if (!text) return '';
  return text.replace(/\n/g, '<br>');
}

export function setupModal() {
  const modal = document.getElementById('detailModal');
  const backdrop = document.getElementById('modalBackdrop');
  const closeBtn = document.getElementById('modalCloseBtn');
  const nameEl = document.getElementById('modalName');
  const metaEl = document.getElementById('modalMeta');
  const extraTitleEl = document.getElementById('modalExtraTitle');
  const extraContentEl = document.getElementById('modalExtraContent');
  const descEl = document.getElementById('modalDescription');

  function openModal({ name, meta, description, extraTitle, extraHTML }) {
    nameEl.textContent = name || '';
    metaEl.textContent = meta || '';
    extraTitleEl.textContent = extraTitle || '';
    extraContentEl.innerHTML = extraHTML || '—';
    descEl.innerHTML = formatMultiline(description || '');
    modal.classList.remove('hidden');
  }

  function closeModal() {
    modal.classList.add('hidden');
  }

  backdrop.addEventListener('click', closeModal);
  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  return { openModal, closeModal };
}
