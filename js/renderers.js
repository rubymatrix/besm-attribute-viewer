// js/renderers.js

// helper to create LI lists for extra data
function makeList(items) {
  return `
    <ul class="list-disc list-inside space-y-0.5">
      ${items.join('')}
    </ul>
  `;
}

export function renderTable(type, data, tbody, openModal) {
  tbody.innerHTML = '';

  if (!data || !data.length) {
    const cols =
      type === 'attributes' ? 3 :
      type === 'defects' ? 2 :
      (type === 'weaponEnhancements' || type === 'weaponLimiters') ? 2 :
      1;
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="${cols}" class="px-4 py-4 text-center text-slate-400">No entries found.</td>`;
    tbody.appendChild(tr);
    return;
  }

  if (type === 'attributes') {
    data.forEach(attr => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-700/40 transition cursor-pointer';
      tr.innerHTML = `
        <td class="px-4 py-2 align-top font-semibold text-emerald-300">${attr.name || ''}</td>
        <td class="px-4 py-2 align-top whitespace-nowrap">${attr.attribute_cost || ''}</td>
        <td class="px-4 py-2 align-top whitespace-nowrap">${attr.relevant_stat || '—'}</td>
      `;
      tr.addEventListener('click', () => {
        let extraHTML = '—';
        if (Array.isArray(attr.level_effects) && attr.level_effects.length) {
          const items = attr.level_effects.map(
            le => `<li><span class="font-semibold">Level ${le.level}:</span> ${le.text}</li>`
          );
          extraHTML = makeList(items);
        }
        openModal({
          name: attr.name || '',
          meta: [
            attr.attribute_cost ? `Cost: ${attr.attribute_cost}` : '',
            attr.relevant_stat ? `Relevant Stat: ${attr.relevant_stat}` : '',
          ].filter(Boolean).join(' • '),
          description: attr.description || '',
          extraTitle: 'Level Effects',
          extraHTML,
        });
      });
      tbody.appendChild(tr);
    });
    return;
  }

  if (type === 'enhancements') {
    data.forEach(enh => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-700/40 transition cursor-pointer';
      tr.innerHTML = `
        <td class="px-4 py-2 align-top font-semibold text-emerald-300">${enh.name || ''}</td>
      `;
      tr.addEventListener('click', () => {
        let extraHTML = '—';
        if (Array.isArray(enh.assignment_effects) && enh.assignment_effects.length) {
          const items = enh.assignment_effects.map(
            ae =>
              `<li><span class="font-semibold">${ae.assignments} Assignment${ae.assignments === 1 ? '' : 's'}:</span> ${ae.text}</li>`
          );
          extraHTML = makeList(items);
        }
        openModal({
          name: enh.name || '',
          meta: 'Enhancement',
          description: enh.description || '',
          extraTitle: 'Assignment Effects',
          extraHTML,
        });
      });
      tbody.appendChild(tr);
    });
    return;
  }

  if (type === 'limiters') {
    data.forEach(lim => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-700/40 transition cursor-pointer';
      tr.innerHTML = `
        <td class="px-4 py-2 align-top font-semibold text-emerald-300">${lim.name || ''}</td>
      `;
      tr.addEventListener('click', () => {
        let extraHTML = '—';
        if (Array.isArray(lim.assignment_effects) && lim.assignment_effects.length) {
          const items = lim.assignment_effects.map(
            ae =>
              `<li><span class="font-semibold">${ae.assignments} Assignment${ae.assignments === 1 ? '' : 's'}:</span> ${ae.text}</li>`
          );
          extraHTML = makeList(items);
        }
        openModal({
          name: lim.name || '',
          meta: 'Limiter',
          description: lim.description || '',
          extraTitle: 'Assignment Effects',
          extraHTML,
        });
      });
      tbody.appendChild(tr);
    });
    return;
  }

  if (type === 'defects') {
    data.forEach(def => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-700/40 transition cursor-pointer';
      tr.innerHTML = `
        <td class="px-4 py-2 align-top font-semibold text-emerald-300">${def.name || ''}</td>
        <td class="px-4 py-2 align-top whitespace-nowrap">${def.defect_type || ''}</td>
      `;
      tr.addEventListener('click', () => {
        let extraHTML = '—';
        if (Array.isArray(def.rank_effects) && def.rank_effects.length) {
          const items = def.rank_effects.map(
            re =>
              `<li><span class="font-semibold">${re.points} Points:</span> ${re.text}</li>`
          );
          extraHTML = makeList(items);
        }
        openModal({
          name: def.name || '',
          meta: def.defect_type || 'Defect',
          description: def.description || '',
          extraTitle: 'Rank Effects',
          extraHTML,
        });
      });
      tbody.appendChild(tr);
    });
    return;
  }

  if (type === 'weaponEnhancements') {
    data.forEach(we => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-700/40 transition cursor-pointer';
      tr.innerHTML = `
        <td class="px-4 py-2 align-top font-semibold text-emerald-300">${we.name || ''}</td>
        <td class="px-4 py-2 align-top whitespace-nowrap">${we.ranks || ''}</td>
      `;
      tr.addEventListener('click', () => {
        openModal({
          name: we.name || '',
          meta: we.ranks ? `Ranks: ${we.ranks}` : '',
          description: we.description, // table-only data
          extraTitle: 'Ranks',
          extraHTML: we.ranks || '—',
        });
      });
      tbody.appendChild(tr);
    });
    return;
  }

  if (type === 'weaponLimiters') {
    data.forEach(wl => {
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-700/40 transition cursor-pointer';
      tr.innerHTML = `
        <td class="px-4 py-2 align-top font-semibold text-emerald-300">${wl.name || ''}</td>
        <td class="px-4 py-2 align-top whitespace-nowrap">${wl.ranks || ''}</td>
      `;
      tr.addEventListener('click', () => {
        openModal({
          name: wl.name || '',
          meta: wl.ranks ? `Ranks: ${wl.ranks}` : '',
          description: wl.description || '',
          extraTitle: 'Ranks',
          extraHTML: wl.ranks || '—',
        });
      });
      tbody.appendChild(tr);
    });
  }
}
