// Devuelve los datos correctos según el tipo de criatura. Los peces usan hemisferio (north/south) pero el resto no.
export function obtenerDatos(p, hemisferio) {
  if (p.north && p.south) {
    return p[hemisferio];
  }

  if (p.type === "sea_creature") {
    return p;
  }

  if (p.type === "bug") {
    return p;
  }

  return p;
}

// Comprueba si la criatura está disponible en el mes seleccionado. Si el filtro está desactivado, siempre devuelve true.
export function cumpleMes(p, soloMesActual, hemisferio, mesActual) {
  if (!soloMesActual) return true;

  const data = obtenerDatos(p, hemisferio);
  const meses = data?.months_array || [];

  return meses.includes(mesActual);
}

// Comprueba si la criatura está disponible a la hora actual usando el rango del mes seleccionado. Si el filtro está desactivado o no hay horario, devuelve true.
export function cumpleHora(
  p,
  soloHoraActual,
  hemisferio,
  mesActual,
  horaActual,
  convertirHora,
  comprobarRango,
) {
  if (!soloHoraActual) return true;

  const data = obtenerDatos(p, hemisferio);
  const rango = data?.times_by_month?.[mesActual];

  if (!rango) return true;

  return comprobarRango(rango, horaActual, convertirHora);
}

// Filtra por localización del animal. Compara el string que devuelve la API
export function cumpleLocalizacion(p, filtroLocalizacion) {
  if (filtroLocalizacion === "all") return true;
  if (!p.location) return false;

  return p.location.includes(filtroLocalizacion);
}

// Comprueba si la criatura aparece en el mes seleccionado por el usuario.
export function cumpleMesSeleccionado(p, filtroMes, hemisferio) {
  if (filtroMes === "all") return true;

  const data = obtenerDatos(p, hemisferio);
  const meses = data?.months_array || [];

  return meses.includes(Number(filtroMes));
}

// Comprueba si el insecto aparece con el clima seleccionado. Compara el string que devuelve la API
export function cumpleClima(p, filtroClima) {
  if (filtroClima === "all") return true;
  return p.weather?.includes(filtroClima);
}

// Filtra por el tamaño de la sombra de la criatura marina. Compara el string que devuelve la API
export function cumpleSombra(p, filtroSombra) {
  if (filtroSombra === "all") return true;
  return p.shadow_size === filtroSombra;
}

// Filtra por la velocidad de movimiento de la criatura marina. Compara el string que devuelve la API
export function cumpleMovimiento(p, filtroMovimiento) {
  if (filtroMovimiento === "all") return true;
  return p.shadow_movement === filtroMovimiento;
}
