<script>
  import {
    obtenerDatos,
    cumpleMes,
    cumpleHora,
    cumpleLocalizacion,
    cumpleMesSeleccionado,
    cumpleClima
  } from "../lib/filtros.js";

  export let insectos = [];

  let soloMesActual = false;
  let soloHoraActual = false;
  let hemisferio = "north";
  let filtroLocalizacion = "all";
  let filtroMes = "all";
  let filtroClima = "all";

  const mesActual = new Date().getMonth() + 1;
  const horaActual = new Date().getHours();

   //Convierte el formato de las horas de la API (4am-4pm) a formato 24 horas (0-24)
  function convertirHora(textoHora) {
    const partes = textoHora.trim().split(" ");
    let hora = parseInt(partes[0]);
    const periodo = partes[1];

    if (periodo === "PM" && hora !== 12) hora += 12;
    if (periodo === "AM" && hora === 12) hora = 0;

    return hora;
  }

  // Comprueba si la hora actual del usuario está dentro de aparición del animal
  function comprobarRango(rango, horaActual, convertirHoraFn) {
    if (!rango || rango === "NA") return false;
    if (rango === "All day") return true;

    const [inicioRaw, finRaw] = rango.split("–");

    const inicio = convertirHoraFn(inicioRaw);
    const fin = convertirHoraFn(finRaw);

    return inicio < fin
      ? horaActual >= inicio && horaActual < fin
      : horaActual >= inicio || horaActual < fin;
  }
</script>

<div class="insectos-container">

  <!-- SIDEBAR -->
  <aside class="sidebar">
    <div class="sidebar-card">

      <!-- HEMISFERIO -->
      <div class="filtro-grupo">
        <h3>Hemisferio: </h3>

        <div class="hemisferio">
          <button
            class:activo={hemisferio === "north"}
            on:click={() => hemisferio = "north"}
          >
            Norte
          </button>

          <button
            class:activo={hemisferio === "south"}
            on:click={() => hemisferio = "south"}
          >
            Sur
          </button>
        </div>
      </div>

      <!-- MES -->
      <div class="filtro-grupo">
        <h3>Mes del año: </h3>

        <select bind:value={filtroMes}>
          <option value="all">Todos</option>
          <option value="1">Enero</option>
          <option value="2">Febrero</option>
          <option value="3">Marzo</option>
          <option value="4">Abril</option>
          <option value="5">Mayo</option>
          <option value="6">Junio</option>
          <option value="7">Julio</option>
          <option value="8">Agosto</option>
          <option value="9">Septiembre</option>
          <option value="10">Octubre</option>
          <option value="11">Noviembre</option>
          <option value="12">Diciembre</option>
        </select>
      </div>

      <!-- OTROS -->
      <h3>Otros filtros: </h3>

      <button
        class:activo={soloMesActual}
        on:click={() => soloMesActual = !soloMesActual}
      >
        Mes actual
      </button>

      <button
        class:activo={soloHoraActual}
        on:click={() => soloHoraActual = !soloHoraActual}
      >
        Hora actual
      </button>

      <!-- LOCALIZACIÓN -->
      <div class="filtro-grupo">
        <h3>Localización: </h3>

        <select bind:value={filtroLocalizacion}>
            <option value="all">Todas</option>
            <option value="Flying">Volando</option>
            <option value="On trees">Árboles</option>
            <option value="On the ground">Suelo</option>
            <option value="On flowers">Flores</option>
            <option value="On tree stumps">Tocones</option>
            <option value="On palm trees">Palmeras</option>
            <option value="On rocks">Rocas</option>
            <option value="Underground">Subterráneo</option>
        </select>
      </div>

      <!-- CLIMA -->
      <div class="filtro-grupo">
        <h3>Clima: </h3>

        <select bind:value={filtroClima}>
            <option value="all">Todos</option>
            <option value="Rain">Lluvia</option>
            <option value="Any except rain">Sin lluvia</option>
            <option value="Any">Cualquiera</option>
        </select>
      </div>

      <!-- RESET -->
      <button
        class="reset"
        on:click={() => {
          soloMesActual = false;
          soloHoraActual = false;
          hemisferio = "north";
          filtroLocalizacion = "all";
          filtroMes = "all";
          filtroClima = "all";
        }}
      >
        Reset
      </button>

    </div>
  </aside>

  <!-- GRID -->
  <div class="grid-envoltorio">
    <div class="grid grid-insectos">

      {#each insectos as i}

        {@const ok =
          cumpleMesSeleccionado(i, filtroMes, hemisferio) &&
          cumpleMes(i, soloMesActual, hemisferio, mesActual) &&
          cumpleHora(
            i,
            soloHoraActual,
            hemisferio,
            mesActual,
            horaActual,
            convertirHora,
            comprobarRango
          ) &&
          cumpleLocalizacion(i, filtroLocalizacion) &&
          cumpleClima(i, filtroClima)
        }

        <a
          href={ok ? i.url : null}
          target={ok ? "_blank" : null}
          rel={ok ? "noopener noreferrer" : null}
          class="card"
          class:inactive={!ok}
          aria-disabled={!ok}
          on:click={(e) => {
            if (!ok) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
        >
          <img src={i.image_url} alt={i.name} />
          <span class="nombre">{i.name}</span>
        </a>

      {/each}

    </div>
  </div>

</div>

<!-- ESTILOS CSS -->
<style>

  .card.inactive {
    filter: grayscale(1);
    opacity: 0.35;
    pointer-events: none;
    cursor: not-allowed;
  }

  .activo {
    background: #2e2a27;
    color: white;
  }

  .insectos-container {
    display: grid;
    grid-template-columns: 220px minmax(0, 1fr) 220px;;
    gap: 1rem;
    column-gap: 3.5rem;
  }

  .grid {
    display: grid;
    gap: 0.6rem;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    margin: 1rem auto;
    padding: 0.75rem;
  }

  .grid-envoltorio {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .grid-insectos {
    grid-template-columns: repeat(auto-fit, minmax(7.5rem, 1fr));
    align-items: stretch;
  }

  :global(.card) {
    display: flex;
    flex-direction: column;
    align-items: center;
    aspect-ratio: 1 / 1;
    border: 3px solid rgba(0, 0, 0, 0.5);
    background: #F5F0D8;
    border-radius: 16px;
    padding: 0.6rem;
    box-sizing: border-box;
    overflow: hidden;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    text-decoration: none;
    color: inherit;
  }

  :global(.card:hover) {
    transform: scale(1.05);
    box-shadow: 0 0.25rem 0.625rem rgba(0, 0, 0, 0.15);
    border: 3px solid #ffa200;
    background: #D8CEBA;
  }

  :global(.card img) {
    width: 55%;
    height: 55%;
    object-fit: contain;
    flex-shrink: 0;
  }

  .nombre {
    font-family: "Fredoka", sans-serif;
    font-weight: 600;
    font-size: 0.9rem;
    text-align: center;
    line-height: 1.1;
    padding: 0 0.2rem;
    min-height: 3rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    overflow: hidden;
  }

  .sidebar {
    width: 260px;
    padding: 1rem;
    position: sticky;
    top: 1rem;
    height: fit-content;
    z-index: 10;
    background: transparent;
    align-self: start;
  }

  .sidebar-card {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    background: #F5F0D8;
    border: 3px solid rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
    border-radius: 16px;

    padding: 1rem;
  }

  .sidebar button {
    padding: 0.4rem;
    border: 1px solid rgba(0, 0, 0, 0.4);
    background: white;
    cursor: pointer;
    border-radius: 10px;
    width: 100%;
  }

  .sidebar .activo {
    background: #2e2a27;
    color: white;
  }

  .sidebar .reset {
    margin-top: 0.5rem;
    background: #2e2a27;
    color: white;
    border: none;
  }

  .hemisferio {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  @media (max-width: 900px) {
    .insectos-container {
      grid-template-columns: 1fr;
    }

    .sidebar {
      position: relative;
      width: 100%;
      top: auto;
      order: -1;
    }
  }

  @media (max-width: 1024px) {
    .grid-insectos {
      grid-template-columns: repeat(auto-fit, minmax(6.5rem, 1fr));
    }
  }

  @media (max-width: 768px) {
    .grid-insectos {
      grid-template-columns: repeat(auto-fit, minmax(5.5rem, 1fr));
    }
  }

  @media (max-width: 480px) {
    .grid-insectos {
      grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
    }
  }
</style>