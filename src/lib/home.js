import { obtenerDatos } from "./filtros.js";

// Devuelve una lista de todas las criaturas disponibles este mes
export function disponiblesMes(items, mes, hemisferio = "north") {
  return items.filter((item) => {
    const data = obtenerDatos(item, hemisferio);
    const meses = data?.months_array || [];

    return meses.includes(mes);
  });
}

// Devuelve las criaturas más valiosas del mes (por precio)
export function topValiosas(items, mes, hemisferio = "north", limit = 4) {
  const disponibles = disponiblesMes(items, mes, hemisferio);

  return disponibles
    .sort((a, b) => {
      const valorA = b.sell_nook ?? b.sell ?? 0;
      const valorB = a.sell_nook ?? a.sell ?? 0;

      return valorA - valorB;
    })
    .slice(0, limit);
}

// Devuelve las criaturas más raras del mes (por tasa de aparición)
export function calcularRarezasDelMes(
  peces,
  insectos,
  marinas,
  mes,
  hemisferio = "north",
) {
  return [
    ...topValiosas(peces, mes, hemisferio, 2),
    ...topValiosas(insectos, mes, hemisferio, 1),
    ...topValiosas(marinas, mes, hemisferio, 1),
  ].slice(0, 4);
}

// Devuelve el número de criaturas que hay ese mes en un hemisferio
export function numeroCriaturasMes(
  peces,
  insectos,
  marinas,
  mes,
  hemisferio = "north",
) {
  return {
    peces: disponiblesMes(peces, mes, hemisferio).length,
    insectos: disponiblesMes(insectos, mes, hemisferio).length,
    marinas: disponiblesMes(marinas, mes, hemisferio).length,
  };
}

// Devuelve las criaturas que están este mes, pero no el siguiente (es decir, que no aparecen)
export function calcularSeVanEsteMes(
  peces,
  insectos,
  marinas,
  mesActual,
  mesSiguiente,
  hemisferio = "north",
) {
  const filtrar = (items) =>
    items.filter((item) => {
      const data = obtenerDatos(item, hemisferio);
      const meses = data?.months_array || [];

      return meses.includes(mesActual) && !meses.includes(mesSiguiente);
    });

  return [...filtrar(peces), ...filtrar(insectos), ...filtrar(marinas)].slice(
    0,
    6,
  );
}
