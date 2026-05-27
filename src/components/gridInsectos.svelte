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
  /** @type {null | { id: string }} */
  export let user = null;
  export let favoritos = [];

  let soloMesActual = false;
  let soloHoraActual = false;
  let hemisferio = "north";
  let filtroLocalizacion = "all";
  let filtroMes = "all";
  let filtroClima = "all";

  const mesActual = new Date().getMonth() + 1;
  const horaActual = new Date().getHours();

  // Convierte el formato de las horas de la API (4am-4pm) a formato 24 horas (0-24)
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
        <label for="select-loc">Location</label>
        <select id="select-loc" bind:value={filtroLocalizacion}>
          <option value="all">All Locations</option>
          <option value="Flying">Flying</option>
          <option value="On trees">On trees</option>
          <option value="On the ground">On the ground</option>
          <option value="On flowers">On flowers</option>
          <option value="On tree stumps">On tree stumps</option>
          <option value="On palm trees">On palm trees</option>
          <option value="On rocks">On rocks</option>
          <option value="Underground">Underground</option>
        </select>
      </div>

      <div class="filtro-grupo">
        <label for="select-clima">Weather</label>
        <select id="select-clima" bind:value={filtroClima}>
          <option value="all">All Weathers</option>
          <option value="Rain">Rain</option>
          <option value="Any except rain">Any except rain</option>
          <option value="Any">Any</option>
        </select>
      </div>

      <button
        class="reset-btn"
        on:click={() => {
          soloMesActual = false;
          soloHoraActual = false;
          hemisferio = "north";
          filtroLocalizacion = "all";
          filtroMes = "all";
          filtroClima = "all";
        }}
      >
        Reset Filters
      </button>

    </div>
  </aside>

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

        {@const esActivo = favoritos.some(f => f.criatura_slug === i.slug)}

        <a
          href={ok ? `/criatura/${i.slug}` : null}
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

          {#if user}
          <boton-favorito data-slug={i.slug} data-nombre={i.name} data-imagen={i.image_url} data-tipo="bug">
            <button 
              class="btn-corazon {esActivo ? 'activo' : ''}"
              aria-label={esActivo ? "Quita de favoritos" : "Añade a favoritos"}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2.5" fill="none">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </boton-favorito>
          {/if}
        </a>

      {/each}

    </div>
  </div>

</div>

<script context="module">
  if (typeof window !== 'undefined' && !customElements.get('boton-favorito')) {
    customElements.define('boton-favorito', class extends HTMLElement {
      constructor() {
        super();
        const boton = this.querySelector('button');
        boton.addEventListener('click', async (e) => {
          e.preventDefault(); e.stopPropagation();
          const esActivo = boton.classList.contains('activo');
          await fetch('/api/favoritos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              action: esActivo ? 'delete' : 'insert',
              slug: this.dataset.slug,
              nombre: this.dataset.nombre,
              imagen: this.dataset.imagen,
              tipo: this.dataset.tipo
            })
          });
          boton.classList.toggle('activo');
        });
      }
    });
  }
</script>

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
    padding: 0.5rem;
    box-sizing: border-box;
    position: relative;
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
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
    width: 50%;
    height: 50%;
    object-fit: contain;
    flex-shrink: 0;
    margin-top: 0.2rem;
  }

  .nombre {
    font-weight: 600;
    font-size: 0.85rem;
    text-align: center;
    line-height: 1.1;
    width: 100%;
    padding: 0 0.2rem;
    padding-bottom: 2.5rem;
    margin-top: auto;
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

  boton-favorito {
    position: absolute;
    bottom: 0.4rem;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }

  .btn-corazon {
    background: transparent;
    border: 2px solid transparent;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 8px;
    transition: border 0.2s ease, color 0.2s ease;
    color: #b0a48d;
    padding: 0;
  }

  .btn-corazon:hover {
    border: 2px solid white;
    background: rgba(93, 84, 69, 0.2); 
    color: #5d5445;
  }

  .btn-corazon.activo {
    color: #ff6b6b;
  }

  .btn-corazon.activo svg {
    fill: #ff6b6b;
    stroke: #5d5445;
    stroke-width: 2px;
  }

  @media (max-width: 1200px) {
    .insectos-container {
      margin: 1.25rem;
      gap: 0.75rem;
      column-gap: 1.25rem;
    }
    .grid-insectos {
      grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
    }
  }

  @media (max-width: 1024px) {
    .insectos-container {
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
    .grid-insectos {
      grid-template-columns: repeat(auto-fit, minmax(6.5rem, 1fr));
    }
  }

  @media (max-width: 850px) {
    .insectos-container {
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
    .grid-insectos {
      grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
    }
  }

  @media (max-width: 600px) {
    .insectos-container {
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
    .grid-insectos {
      grid-template-columns: repeat(auto-fit, minmax(5.5rem, 1fr));
      gap: 0.5rem;
    }
  }

  @media (max-width: 400px) {
    .insectos-container {
      margin: 0.5rem;
    }
    .botones-flex {
      grid-template-columns: 1fr;
    }
    .grid-insectos {
      grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
    }
  }
</style>