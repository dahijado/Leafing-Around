const API_KEY = "8e61650d-b457-4d63-bf8b-3720886cf748";

//Ordena las criaturas según el orden que aparece en la api
export function ordenarCriaturas(data) {
  return [...data].sort((a, b) => (a.number ?? 0) - (b.number ?? 0));
}

//Fetch de Criaturas Marinas
export async function getCriaturas() {
  try {
    const res = await fetch("https://api.nookipedia.com/nh/sea", {
      headers: {
        "X-API-KEY": API_KEY,
        "Accept-Version": "1.7.0",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching criaturas:", err);
    return [];
  }
}

//Fetch de peces
export async function getPeces() {
  try {
    const res = await fetch("https://api.nookipedia.com/nh/fish", {
      headers: {
        "X-API-KEY": API_KEY,
        "Accept-Version": "1.7.0",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching criaturas:", err);
    return [];
  }
}

//Fetch de insectos
export async function getInsectos() {
  try {
    const res = await fetch("https://api.nookipedia.com/nh/bugs", {
      headers: {
        "X-API-KEY": API_KEY,
        "Accept-Version": "1.7.0",
      },
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Error fetching criaturas:", err);
    return [];
  }
}
