<script>
  import {
    obtenerDatos,
    cumpleMes,
    cumpleHora,
    cumpleMesSeleccionado,
    cumpleSombra,
    cumpleMovimiento
  } from "../lib/filtros.js";

  export let criaturas = [];

  let soloMesActual = false;
  let soloHoraActual = false;
  let hemisferio = "north";
  let filtroMes = "all";
  let filtroSombra = "all";
  let filtroMovimiento = "all";

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

<div class="criaturas-container">

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

      <h3>Otros filtros: </h3>

      <!-- MES ACTUAL -->
      <button
        class:activo={soloMesActual}
        on:click={() => soloMesActual = !soloMesActual}
      >
        Mes actual
      </button>

      <!-- HORA ACTUAL -->
      <button
        class:activo={soloHoraActual}
        on:click={() => soloHoraActual = !soloHoraActual}
      >
        Hora actual
      </button>

      <!-- SOMBRA -->
      <div class="filtro-grupo">
        <h3>Tamaño sombra: </h3>

        <select bind:value={filtroSombra}>
          <option value="all">Todos</option>
          <option value="Small">Pequeño</option>
          <option value="Medium">Mediano</option>
          <option value="Large">Grande</option>
          <option value="Very large">Muy grande</option>
        </select>
      </div>

      <!-- MOVIMIENTO -->
      <div class="filtro-grupo">
        <h3>Velocidad: </h3>

        <select bind:value={filtroMovimiento}>
          <option value="all">Todos</option>
          <option value="Stationary">Quieto</option>
          <option value="Slow">Lento</option>
          <option value="Medium">Medio</option>
          <option value="Fast">Rápido</option>
          <option value="Very fast">Muy rápido</option>
        </select>
      </div>

      <!-- RESET -->
      <button
        class="reset"
        on:click={() => {
          soloMesActual = false;
          soloHoraActual = false;
          hemisferio = "north";
          filtroMes = "all";
          filtroSombra = "all";
          filtroMovimiento = "all";
        }}
      >
        Reset
      </button>

    </div>
  </aside>

  <!-- GRID -->
  <div class="grid-envoltorio">
    <div class="grid grid-criaturas">

      {#each criaturas as c}

        {@const ok =
          cumpleMesSeleccionado(c, filtroMes, hemisferio) &&
          cumpleMes(c, soloMesActual, hemisferio, mesActual) &&
          cumpleHora(
            c,
            soloHoraActual,
            hemisferio,
            mesActual,
            horaActual,
            convertirHora,
            comprobarRango
          ) &&
          cumpleSombra(c, filtroSombra) &&
          cumpleMovimiento(c, filtroMovimiento)
        }

        <a
          href={ok ? c.url : null}
          target={ok ? "_blank" : null}
          rel={ok ? "noopener noreferrer" : null}
          class="card"
          class:inactive={!ok}
        >
          <img src={c.image_url} alt={c.name} />
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

  .criaturas-container {
    display: grid;
    grid-template-columns: 260px 1fr 260px;
    gap: 1rem;
  }

  .grid {
    display: grid;
    gap: 0.5rem;
    max-width: 56rem;
    margin: 1.25rem auto;
    padding: 0.625rem;
  }

  .grid-envoltorio {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .grid-criaturas {
    grid-template-columns: repeat(6, 1fr);
  }

  
  .hemisferio {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  :global(.card) {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid rgba(0, 0, 0, 0.5);
    background:  #F5F0D8;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    aspect-ratio: 1 / 1;
    text-decoration: none;
    color: inherit;
    border-radius:16px;
  }

  :global(.card img) {
    width: 5rem;
    display: block;
    margin: 0 auto;
    pointer-events: none;
  }

  :global(.card:hover) {
    transform: scale(1.05);
    box-shadow: 0 0.25rem 0.625rem rgba(0, 0, 0, 0.15);
    border: 3px solid #ffa200;
    background: #D8CEBA;
  }

  .sidebar {
    width: 260px;
    padding: 1rem;
    position: sticky;
    top: 1rem;
    height: fit-content;
    z-index: 10;
    background: transparent;
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

  @media (max-width: 1024px) {
    .grid-criaturas {
      grid-template-columns: repeat(8, 1fr);
    }
  }

  @media (max-width: 768px) {
    .grid-criaturas {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  @media (max-width: 480px) {
    .grid-criaturas {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 900px) {
    .criaturas-container {
      grid-template-columns: 1fr;
    }

    .sidebar {
      position: relative;
      width: 100%;
      top: auto;
      order: -1;
    }
  }
</style>