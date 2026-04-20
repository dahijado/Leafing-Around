<script>
  export let peces = [];

  let soloMesActual = false;

  const mesActual = new Date().getMonth() + 1;

  function perteneceMesActual(p) {
    const north = p.north?.months_array || [];
    const south = p.south?.months_array || [];

    return north.includes(mesActual) || south.includes(mesActual);
  }
</script>

<div class="peces-container">

  <!--SIDEBAR-->
  <aside class="sidebar">
    <div class="sidebar-card">
      <h2>Filtros</h2>

      <button
        class:activo={soloMesActual}
        on:click={() => soloMesActual = !soloMesActual}
      >
        Solo peces de este mes
      </button>

      <button
        class="reset"
        on:click={() => soloMesActual = false}
      >
        Reset
      </button>
    </div>
  </aside>

  <!--GRID-->
  <div class="grid-envoltorio">
    <div class="grid grid-peces">

        {#each peces as p}

        {#if !soloMesActual || perteneceMesActual(p)}
            <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            class="card"
            >
            <img src={p.image_url} alt={p.name} />
            </a>
        {:else}
            <div class="card inactive">
            <img src={p.image_url} alt={p.name} />
            </div>
        {/if}

        {/each}

    </div>
  </div>

</div>

<!-- ESTILOS CSS -->
<style>

  .card.inactive {
    filter: grayscale(1);
    opacity: 0.3;
    transform: scale(0.95);
  }

  .activo {
    background: #2e2a27;
    color: white;
  }

  .peces-container {
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

  .grid-peces {
    grid-template-columns: repeat(11, 1fr);
  }

  :global(.card) {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 3px solid rgba(0, 0, 0, 0.5);
    background: #f6f1e8;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    aspect-ratio: 1 / 1;
    text-decoration: none;
    color: inherit;
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
    background: #e8ddcf;
  }

  .sidebar {
    width: 260px;
    padding: 1rem;
    position: sticky;
    top: 1rem;
    height: fit-content;
    z-index: 10;
    background: #f6f1e8;
  }

  .sidebar-card {
    background: #f6f1e8;
    border: 3px solid rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .sidebar button {
    padding: 0.4rem;
    border: 1px solid rgba(0, 0, 0, 0.4);
    background: white;
    cursor: pointer;
    border-radius: 10px;
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
    .grid-peces {
      grid-template-columns: repeat(8, 1fr);
    }
  }

  @media (max-width: 768px) {
    .grid-peces {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  @media (max-width: 480px) {
    .grid-peces {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 900px) {
    .peces-container {
      grid-template-columns: 1fr;
    }
  }
</style>