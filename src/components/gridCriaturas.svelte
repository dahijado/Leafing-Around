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

  function convertirHora(textoHora) {
    const partes = textoHora.trim().split(" ");
    let hora = parseInt(partes[0]);
    const periodo = partes[1];

    if (periodo === "PM" && hora !== 12) hora += 12;
    if (periodo === "AM" && hora === 12) hora = 0;

    return hora;
  }

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

  <aside class="sidebar">
    <div class="sidebar-card">

      <div class="filtro-grupo">
        <label for="select-mes">Month</label>
        <select id="select-mes" bind:value={filtroMes}>
          <option value="all">All Months</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

      <div class="filtro-grupo">
        <span class="label-title">Hemisphere</span>
        <div class="hemisferio">
          <button
            class="filter-btn"
            class:activo={hemisferio === "north"}
            on:click={() => hemisferio = "north"}
          >
            North
          </button>

          <button
            class="filter-btn"
            class:activo={hemisferio === "south"}
            on:click={() => hemisferio = "south"}
          >
            South
          </button>
        </div>
      </div>

      <div class="filtro-grupo">
        <span class="label-title">Time Filters</span>
        <div class="botones-flex">
          <button
            class="filter-btn"
            class:activo={soloMesActual}
            on:click={() => soloMesActual = !soloMesActual}
          >
            Current Month
          </button>

          <button
            class="filter-btn"
            class:activo={soloHoraActual}
            on:click={() => soloHoraActual = !soloHoraActual}
          >
            Current Time
          </button>
        </div>
      </div>

      <div class="filtro-grupo">
        <label for="select-sombra">Shadow size</label>
        <select id="select-sombra" bind:value={filtroSombra}>
          <option value="all">All Shadows</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
          <option value="Very large">Very large</option>
        </select>
      </div>

      <div class="filtro-grupo">
        <label for="select-mov">Speed</label>
        <select id="select-mov" bind:value={filtroMovimiento}>
          <option value="all">All Speeds</option>
          <option value="Stationary">Stationary</option>
          <option value="Slow">Slow</option>
          <option value="Medium">Medium</option>
          <option value="Fast">Fast</option>
          <option value="Very fast">Very fast</option>
        </select>
      </div>

      <button
        class="reset-btn"
        on:click={() => {
          soloMesActual = false;
          soloHoraActual = false;
          hemisferio = "north";
          filtroMes = "all";
          filtroSombra = "all";
          filtroMovimiento = "all";
        }}
      >
        Reset Filters
      </button>

    </div>
  </aside>

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
          href={ok ? `/criatura/${c.slug}` : null}
          class="card"
          class:inactive={!ok}
        >
          <img src={c.image_url} alt={c.name} />
          <span class="nombre">{c.name}</span>
        </a>

      {/each}

    </div>
  </div>

</div>

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
    grid-template-columns: 280px minmax(0, 1fr);
    gap: 1rem;
    column-gap: 1.5rem;
    margin: 1.5rem;
    font-family: "Fredoka", sans-serif;
    color: #2E2A27;
    align-items: start;
  }

  .grid {
    display: grid;
    gap: 0.6rem;
    width: 100%;
    max-width: 100%;
    min-width: 0;
    margin: 0 auto;
    padding: 0 0.75rem;
  }

  .grid-envoltorio {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .grid-criaturas {
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
    width: 280px;
    position: sticky;
    top: 1.5rem;
    height: fit-content;
    z-index: 10;
    background: transparent;
    align-self: start;
  }

  .sidebar-card {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background: #F5F0D8;
    border: 3px solid rgba(0, 0, 0, 0.3);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    border-radius: 24px;
    padding: 2rem 1.5rem;
  }

  .filtro-grupo {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .filtro-grupo label,
  .filtro-grupo .label-title {
    font-size: 1.1rem;
    font-weight: 500;
    color: #2E2A27;
    display: block;
  }

  .botones-flex {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .sidebar select {
    font-family: "Fredoka", sans-serif;
    font-size: 1rem;
    padding: 0.75rem 2.5rem 0.75rem 1rem;
    border-radius: 14px;
    border: 2px solid rgba(0, 0, 0, 0.2);
    background: #FFF;
    color: #2E2A27;
    outline: none;
    cursor: pointer;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%238B633E' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1.1rem;
  }

  .sidebar select:focus {
    border-color: #8B633E;
    box-shadow: 0 0 0 3px rgba(139, 99, 62, 0.15);
  }

  .filter-btn {
    font-family: "Fredoka", sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    padding: 0.75rem;
    color: #8B633E;
    background: #FFF;
    border: 2px solid rgba(139, 99, 62, 0.4);
    border-radius: 14px;
    width: 100%;
    cursor: pointer;
    box-shadow: 0 3px 0px rgba(139, 99, 62, 0.2);
    transition: transform 0.1s ease, background-color 0.2s ease, box-shadow 0.1s ease;
  }

  .filter-btn:hover {
    background: #FFFDF4;
    border-color: #8B633E;
  }

  .filter-btn:active {
    transform: translateY(2px);
    box-shadow: 0 1px 0px rgba(139, 99, 62, 0.2);
  }

  .filter-btn.activo {
    color: #FFF;
    background: #8B633E;
    border: 2px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 4px 0px rgba(0, 0, 0, 0.15);
  }

  .filter-btn.activo:hover {
    background: #9A724B;
  }

  .filter-btn.activo:active {
    transform: translateY(3px);
    box-shadow: 0 1px 0px rgba(0, 0, 0, 0.15);
  }

  .sidebar .reset-btn {
    font-family: "Fredoka", sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: #FFF;
    background: #8B633E;
    border: 2px solid rgba(0, 0, 0, 0.2);
    border-radius: 14px;
    padding: 0.85rem;
    cursor: pointer;
    margin-top: 0.5rem;
    box-shadow: 0 4px 0px rgba(0, 0, 0, 0.15);
    transition: transform 0.1s ease, background-color 0.2s ease, box-shadow 0.1s ease;
  }

  .sidebar .reset-btn:hover {
    background: #9A724B;
  }

  .sidebar .reset-btn:active {
    transform: translateY(3px);
    box-shadow: 0 1px 0px rgba(0, 0, 0, 0.15);
  }

  .hemisferio {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
  }

  @media (max-width: 1200px) {
    .criaturas-container {
      margin: 1.25rem;
      gap: 0.75rem;
      column-gap: 1.25rem;
    }
    
    .grid-criaturas {
      grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
    }
  }

  @media (max-width: 1024px) {
    .criaturas-container {
      grid-template-columns: 240px minmax(0, 1fr);
      margin: 1rem;
      column-gap: 1rem;
    }

    .sidebar {
      width: 240px;
    }

    .sidebar-card {
      padding: 1.5rem 1.25rem;
      gap: 1.25rem;
    }

    .grid-criaturas {
      grid-template-columns: repeat(auto-fit, minmax(6.5rem, 1fr));
    }
  }

  @media (max-width: 850px) {
    .criaturas-container {
      grid-template-columns: 1fr;
      margin: 1rem;
      gap: 1.5rem;
    }

    .sidebar {
      position: relative;
      width: 100%;
      top: auto;
      order: -1;
    }

    .sidebar-card {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.25rem;
      padding: 1.75rem;
    }

    .sidebar .reset-btn {
      grid-column: span 2;
      margin-top: 0;
    }

    .grid-criaturas {
      grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
    }
  }

  @media (max-width: 600px) {
    .criaturas-container {
      margin: 0.75rem;
      gap: 1rem;
    }

    .sidebar-card {
      grid-template-columns: 1fr;
      padding: 1.25rem;
      gap: 1rem;
    }

    .sidebar .reset-btn {
      grid-column: span 1;
    }

    .botones-flex {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.5rem;
    }

    .grid-criaturas {
      grid-template-columns: repeat(auto-fit, minmax(5.5rem, 1fr));
      gap: 0.5rem;
    }

    .nombre {
      font-size: 0.8rem;
      min-height: 2.6rem;
    }
  }

  @media (max-width: 400px) {
    .criaturas-container {
      margin: 0.5rem;
    }

    .botones-flex {
      grid-template-columns: 1fr;
    }

    .grid-criaturas {
      grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
    }
  }
</style>