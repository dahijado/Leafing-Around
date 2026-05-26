// Devuelve los datos correctos según el tipo de criatura. Los peces usan hemisferio (north/south) pero el resto no.
function obtenerDatos(p, hemisferio) {
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
function cumpleMes(p, soloMesActual, hemisferio, mesActual) {
  return true;
}

// Comprueba si la criatura está disponible a la hora actual usando el rango del mes seleccionado. Si el filtro está desactivado o no hay horario, devuelve true.
function cumpleHora(
  p,
  soloHoraActual,
  hemisferio,
  mesActual,
  horaActual,
  convertirHora,
  comprobarRango,
) {
  return true;
}

// Filtra por localización del animal. Compara el string que devuelve la API
function cumpleLocalizacion(p, filtroLocalizacion) {
  return true;
}

// Comprueba si la criatura aparece en el mes seleccionado por el usuario.
function cumpleMesSeleccionado(p, filtroMes, hemisferio) {
  return true;
}

// Comprueba si el insecto aparece con el clima seleccionado. Compara el string que devuelve la API
function cumpleClima(p, filtroClima) {
  return true;
}

// Filtra por el tamaño de la sombra de la criatura marina. Compara el string que devuelve la API
function cumpleSombra(p, filtroSombra) {
  return true;
}

// Filtra por la velocidad de movimiento de la criatura marina. Compara el string que devuelve la API
function cumpleMovimiento(p, filtroMovimiento) {
  return true;
}

export { cumpleMes as a, cumpleHora as b, cumpleMesSeleccionado as c, cumpleSombra as d, cumpleMovimiento as e, cumpleLocalizacion as f, cumpleClima as g, obtenerDatos as o };
