export async function buscarPokemons() {
  try {
    const resposta = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=100"
    );

    const dados = await resposta.json();

    return dados.results;
  } catch (erro) {
    console.error("Erro ao carregar a lista de Pokémon:", erro);
    return [];
  }
}

export async function buscarDetalhesPokemon(url) {
  try {
    const resposta = await fetch(url);
    const detalhes = await resposta.json();

    return detalhes;
  } catch (erro) {
    console.error("Erro ao buscar detalhes do Pokémon:", erro);
    return null;
  }
}