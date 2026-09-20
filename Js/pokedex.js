import { buscarDetalhesPokemon } from "./api.js";
import { abrirPopupPokemon } from "./popup.js";

import {
  estadoBatalha,
  selecionarCartas
} from "./batalha.js";

const container = document.getElementById("pokemons");
const searchBar = document.getElementById("search-bar");
const btnPesquisar = document.getElementById("btnPesquisar");

let pokemons = [];

export function definirPokemons(lista) {
  pokemons = lista;
}

export async function exibirPokemons(lista) {
  container.innerHTML = "";

  const promessas = lista.map(async (pokemon) => {
    const detalhes =
      await buscarDetalhesPokemon(pokemon.url);

    return {
      pokemon,
      detalhes,
    };
  });

  const resultados = await Promise.all(promessas);

  resultados.forEach((resultado) => {
    const { pokemon, detalhes } = resultado;

    if (!detalhes) {
      return;
    }

    const card = document.createElement("div");

    card.classList.add("pokemon");

    card.innerHTML = `
      <img
        src="${detalhes.sprites.other["official-artwork"].front_default}"
        alt="${pokemon.name}"
      >

      <h3>${pokemon.name}</h3>
    `;

    container.appendChild(card);

    card.addEventListener("click", () => {
      if (estadoBatalha.emSelecao) {
        selecionarCartas(detalhes);
        return;
      }

      abrirPopupPokemon(pokemon, detalhes);
    });
  });
}

function pesquisarPokemon() {
  const pesquisa =
    searchBar.value.trim().toLowerCase();

  const pokemonsFiltrados = pokemons.filter(
    (pokemon) =>
      pokemon.name
        .toLowerCase()
        .includes(pesquisa)
  );

  exibirPokemons(pokemonsFiltrados);
}

export function iniciarPesquisa() {
  btnPesquisar.addEventListener(
    "click",
    pesquisarPokemon
  );
}