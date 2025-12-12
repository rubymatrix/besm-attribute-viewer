// js/dataService.js

const FILE_MAP = {
  attributes: 'besm_attributes.json',
  enhancements: 'besm_enhancements.json',
  limiters: 'besm_limiters.json',
  defects: 'besm_defects.json',
  weaponEnhancements: 'besm_weapon_enhancements.json',
  weaponLimiters: 'besm_weapon_limiters.json',
};

async function loadJson(path) {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`Failed to load ${path}: ${res.status}`);
  }
  return res.json();
}

export async function loadAllData() {
  const result = {
    attributes: [],
    enhancements: [],
    limiters: [],
    defects: [],
    weaponEnhancements: [],
    weaponLimiters: [],
  };

  await Promise.all(
    Object.entries(FILE_MAP).map(async ([key, file]) => {
      try {
        result[key] = await loadJson(file);
      } catch (err) {
        console.error(err);
        result[key] = [];
      }
    })
  );

  return result;
}
