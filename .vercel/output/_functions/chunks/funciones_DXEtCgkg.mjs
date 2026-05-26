const API_KEY = "8e61650d-b457-4d63-bf8b-3720886cf748";
let cache = {};
function fetchConTimeout(url, options, timeout = 5e3) {
  return Promise.race([
    fetch(url, options),
    new Promise(
      (_, reject) => setTimeout(() => reject(new Error("Timeout")), timeout)
    )
  ]);
}
async function fetchNookipedia(endpoint) {
  if (cache[endpoint]) {
    return cache[endpoint];
  }
  try {
    const res = await fetchConTimeout(
      `https://api.nookipedia.com/nh/${endpoint}`,
      {
        headers: {
          "X-API-KEY": API_KEY,
          "Accept-Version": "1.7.0"
        }
      }
    );
    if (!res.ok) {
      console.warn(`HTTP ${res.status} en endpoint ${endpoint}`);
      return [];
    }
    const data = await res.json();
    const result = Array.isArray(data) ? data : [];
    if (result.length > 0) {
      cache[endpoint] = result;
    }
    return result;
  } catch (err) {
    console.error(`Error fetching ${endpoint}:`, err);
    return [];
  }
}
function getCriaturas() {
  return fetchNookipedia("sea");
}
function getPeces() {
  return fetchNookipedia("fish");
}
function getInsectos() {
  return fetchNookipedia("bugs");
}
function ordenarCriaturas(data) {
  return [...data].sort((a, b) => (a.number ?? 0) - (b.number ?? 0));
}
function crearSlug(nombre) {
  return nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/'/g, "").replace(/\s+/g, "-");
}
async function getTodasCriaturas() {
  const [peces, insectos, criaturas] = await Promise.allSettled([
    getPeces(),
    getInsectos(),
    getCriaturas()
  ]);
  const safe = (result) => result.status === "fulfilled" ? result.value : [];
  const todas = [
    ...safe(peces).map((p) => ({
      ...p,
      type: "fish",
      slug: `fish-${crearSlug(p.name)}`
    })),
    ...safe(insectos).map((i) => ({
      ...i,
      type: "bug",
      slug: `bug-${crearSlug(i.name)}`
    })),
    ...safe(criaturas).map((c) => ({
      ...c,
      type: "sea_creature",
      slug: `sea-${crearSlug(c.name)}`
    }))
  ];
  return ordenarCriaturas(todas);
}

export { crearSlug as c, getTodasCriaturas as g, ordenarCriaturas as o };
