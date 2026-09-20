import { buscarPokemons } from "./api.js";

import {
  definirPokemons,
  exibirPokemons,
  iniciarPesquisa
} from "./pokedex.js";

import {
  iniciarEventosPopup
} from "./popup.js";

import {
  iniciarEventosBatalha
} from "./batalha.js";

async function iniciar() {
  iniciarEventosPopup();
  iniciarEventosBatalha();
  iniciarPesquisa();

  const pokemons = await buscarPokemons();

  definirPokemons(pokemons);
  exibirPokemons(pokemons);
}

iniciar();