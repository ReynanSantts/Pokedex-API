const container = document.getElementById("pokemons");
const popup = document.getElementById("popup");
const detalhesPokemon = document.getElementById("detalhesPokemon");
const fecharPopup = document.getElementById("fecharPopup");
const searchBar = document.getElementById("search-bar");
const btnPesquisar = document.getElementById("btnPesquisar");

let pokemons = [];

// BUSCAR OS POKÉMON NA API
async function carregarPokemons() {
  const resposta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100");

  const dados = await resposta.json();

  pokemons = dados.results;

  exibirPokemons(pokemons);
}

carregarPokemons();

// EXIBIR OS POKÉMON
async function exibirPokemons(lista) {
  container.innerHTML = "";

  // Busca os detalhes de cada Pokémon
  const promessas = lista.map(async (pokemon) => {
    const resposta = await fetch(pokemon.url);
    const detalhes = await resposta.json();

    return {
      pokemon,
      detalhes,
    };
  });

  // Espera todas as requisições terminarem
  const resultados = await Promise.all(promessas);

  // Cria os cards na ordem correta
  resultados.forEach((resultado) => {
    const pokemon = resultado.pokemon;
    const detalhes = resultado.detalhes;

    const card = document.createElement("div");
    card.classList.add("pokemon");

    card.innerHTML = `
      <img 
        src="${detalhes.sprites.front_default}" 
        alt="${pokemon.name}"
      >

      <h3>${pokemon.name}</h3>
    `;

    container.appendChild(card);

    // ABRIR POPUP
    card.addEventListener("click", () => {
      // Tipos
      const tipos = detalhes.types.map((tipo) => {
        return tipo.type.name;
      });

      const tiposTexto = tipos.join(", ");

      // Habilidades
      const habilidades = detalhes.abilities.map((habilidade) => {
        return habilidade.ability.name;
      });

      const habilidadesTexto = habilidades.join(", ");

      const hp = detalhes.stats[0].base_stat;
      const ataque = detalhes.stats[1].base_stat;
      const defesa = detalhes.stats[2].base_stat;
      const ataqueEspecial = detalhes.stats[3].base_stat;
      const defesaEspecial = detalhes.stats[4].base_stat;
      const velocidade = detalhes.stats[5].base_stat;

      // Conteúdo do popup
      detalhesPokemon.innerHTML = `
    <h2>${pokemon.name}</h2>

    <img src="${detalhes.sprites.front_default}" alt="${pokemon.name}">

    <p><strong>Nº:</strong> #${detalhes.id}</p>
    <p><strong>Tipo:</strong> ${tiposTexto}</p>
    <p><strong>Altura:</strong> ${detalhes.height / 10} m</p>
    <p><strong>Peso:</strong> ${detalhes.weight / 10} kg</p>
    <p><strong>Habilidades:</strong> ${habilidadesTexto}</p>
    <p><strong>XP Base:</strong> ${detalhes.base_experience} XP</p>

    <hr>

    <h3>Estatísticas</h3>


<div class="status">
    <div class="status-info">
        <strong>HP</strong>
        <span>${hp}</span>
    </div>
    <div class="barra">
        <div class="barra-preenchida" style="width: ${calcularBarra(hp)}%"></div>
    </div>
</div>

<div class="status">
    <div class="status-info">
        <strong>Ataque</strong>
        <span>${ataque}</span>
    </div>
    <div class="barra">
        <div class="barra-preenchida" style="width: ${calcularBarra(ataque)}%"></div>
    </div>
</div>

<div class="status">
    <div class="status-info">
        <strong>Defesa</strong>
        <span>${defesa}</span>
    </div>
    <div class="barra">
        <div class="barra-preenchida" style="width: ${calcularBarra(defesa)}%"></div>
    </div>
</div>

<div class="status">
    <div class="status-info">
        <strong>Ataque Especial</strong>
        <span>${ataqueEspecial}</span>
    </div>
    <div class="barra">
        <div class="barra-preenchida" style="width: ${calcularBarra(ataqueEspecial)}%"></div>
    </div>
</div>

<div class="status">
    <div class="status-info">
        <strong>Defesa Especial</strong>
        <span>${defesaEspecial}</span>
    </div>
    <div class="barra">
        <div class="barra-preenchida" style="width: ${calcularBarra(defesaEspecial)}%"></div>
    </div>
</div>

<div class="status">
    <div class="status-info">
        <strong>Velocidade</strong>
        <span>${velocidade}</span>
    </div>
    <div class="barra">
        <div class="barra-preenchida" style="width: ${calcularBarra(velocidade)}%"></div>
    </div>
</div>
`;

      popup.style.display = "flex";
    });
  });
}

// FECHAR POPUP
fecharPopup.addEventListener("click", () => {
  popup.style.display = "none";
});
popup.addEventListener("click", (event) => {
  if (event.target === popup) {
    popup.style.display = "none";
  }
});

// FUNÇÃO PARA CALCULAR PORCENTAGEM DA BARRA SEM ULTRAPASSAR 100%
function calcularBarra(valor){
    return Math.min((valor / 300)*100,100)
}

// PESQUISAR POKÉMON
function pesquisarPokemon() {
  const pesquisa = searchBar.value.trim().toLowerCase();

  const pokemonsFiltrados = pokemons.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(pesquisa);
  });

  exibirPokemons(pokemonsFiltrados);
}

// BOTÃO PESQUISAR
btnPesquisar.addEventListener("click", pesquisarPokemon);
