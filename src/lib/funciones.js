const API_KEY = "8e61650d-b457-4d63-bf8b-3720886cf748";

//Ordena las criaturas según el orden que aparece en la api
export function ordenarCriaturas(data) {
  return [...data].sort((a, b) => (a.number ?? 0) - (b.number ?? 0));
}

let cache = {};

// Fetch base con timeout en caso de que tarde demasiado en conectar
function fetchConTimeout(url, options, timeout = 5000) {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), timeout),
    ),
  ]);
}

// Fetch a Nookipedia
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
          "Accept-Version": "1.7.0",
        },
      },
    );

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    const result = Array.isArray(data) ? data : [];

    cache[endpoint] = result;

    return result;
  } catch (err) {
    console.error(`Error fetching ${endpoint}:`, err);

    if (err.message === "Timeout") {
      throw new Error("La conexión ha tardado demasiado. Inténtalo de nuevo.");
    }

    throw new Error("No se pudieron cargar los datos. Inténtalo de nuevo.");
  }
}

// Conseguir datos de criaturas marinas
export function getCriaturas() {
  return fetchNookipedia("sea");
}

// Conseguir datos de peces
export function getPeces() {
  return fetchNookipedia("fish");
}

// Conseguir datos de insectos
export function getInsectos() {
  return fetchNookipedia("bugs");
}
