const openModalb = document.getElementById("btnBatalha");
const modalBatalha = document.getElementById("modalBatalha");
const campoInput = document.getElementById("campo");
const btnConfirmarb = document.getElementById("btnConfirmab");
const tituloCadastro = document.getElementById("tituloCadastro");
const btnSelecionarCartas = document.getElementById("selecionarCartas");

const avisoSelecao = document.getElementById("avisoSelecao");
const tituloSelecao = document.getElementById("tituloSelecao");
const mensagemSelecao = document.getElementById("mensagemSelecao");

const placarNomeJ1 = document.getElementById("placarNomeJ1");
const placarNomeJ2 = document.getElementById("placarNomeJ2");
const placarPontosJ1 = document.getElementById("placarPontosJ1");
const placarPontosJ2 = document.getElementById("placarPontosJ2");

const modalResultadoBatalha =
  document.getElementById("modalResultadoBatalha");

const nomeBatalhaJ1 = document.getElementById("nomeBatalhaJ1");
const nomeBatalhaJ2 = document.getElementById("nomeBatalhaJ2");

const imagemBatalhaJ1 = document.getElementById("imagemBatalhaJ1");
const imagemBatalhaJ2 = document.getElementById("imagemBatalhaJ2");

const pokemonBatalhaJ1 = document.getElementById("pokemonBatalhaJ1");
const pokemonBatalhaJ2 = document.getElementById("pokemonBatalhaJ2");

const poderBatalhaJ1 = document.getElementById("poderBatalhaJ1");
const poderBatalhaJ2 = document.getElementById("poderBatalhaJ2");

const vencedorBatalha = document.getElementById("vencedorBatalha");

const fecharBatalha = document.getElementById("fecharBatalha");
const novaBatalha = document.getElementById("novaBatalha");

let etapaCadastro = 1;
let nomeJogador1 = "";
let nomeJogador2 = "";

export const estadoBatalha = {
  jogadores: [],
  pokemonJogador1: null,
  pokemonJogador2: null,
  emSelecao: false,
};

function validarNome(nome) {
  return typeof nome === "string" && nome.trim().length >= 2;
}

function cadastrarJogadores(jogador1, jogador2) {
  if (!validarNome(jogador1) || !validarNome(jogador2)) {
    console.error(
      "Nome do Jogador inválido. Use pelo menos 2 caracteres."
    );
    return;
  }

  const jogadores = [
    {
      id: 1,
      nome: jogador1.trim(),
      pontos: 0,
    },
    {
      id: 2,
      nome: jogador2.trim(),
      pontos: 0,
    },
  ];

  estadoBatalha.jogadores = jogadores;
  estadoBatalha.emSelecao = true;
  estadoBatalha.pokemonJogador1 = null;
  estadoBatalha.pokemonJogador2 = null;

  console.log("Jogadores cadastrados com sucesso!");

  return jogadores;
}

export function selecionarCartas(detalhesPokemon) {
  const oponente1 = estadoBatalha.jogadores[0];
  const oponente2 = estadoBatalha.jogadores[1];

  if (!estadoBatalha.pokemonJogador1) {
    estadoBatalha.pokemonJogador1 = detalhesPokemon;

    tituloSelecao.innerText =
      `⚔️ Vez de ${oponente2.nome}`;

    mensagemSelecao.innerText =
      `${oponente1.nome} já escolheu! Agora ${oponente2.nome}, escolha o seu Pokémon.`;

  } else if (!estadoBatalha.pokemonJogador2) {
    estadoBatalha.pokemonJogador2 = detalhesPokemon;

    estadoBatalha.emSelecao = false;

    avisoSelecao.style.display = "none";

    iniciarBatalha();
  }
}

function iniciarBatalha() {
  const oponente1 = estadoBatalha.jogadores[0];
  const oponente2 = estadoBatalha.jogadores[1];

  const pokemon1 = estadoBatalha.pokemonJogador1;
  const pokemon2 = estadoBatalha.pokemonJogador2;

  const poderP1 =
    pokemon1.stats[0].base_stat +
    pokemon1.stats[1].base_stat +
    pokemon1.stats[2].base_stat;

  const poderP2 =
    pokemon2.stats[0].base_stat +
    pokemon2.stats[1].base_stat +
    pokemon2.stats[2].base_stat;

  nomeBatalhaJ1.innerText = oponente1.nome;
  nomeBatalhaJ2.innerText = oponente2.nome;

  imagemBatalhaJ1.src =
    pokemon1.sprites.other["official-artwork"].front_default;

  imagemBatalhaJ2.src =
    pokemon2.sprites.other["official-artwork"].front_default;

  pokemonBatalhaJ1.innerText = pokemon1.name;
  pokemonBatalhaJ2.innerText = pokemon2.name;

  poderBatalhaJ1.innerText = poderP1;
  poderBatalhaJ2.innerText = poderP2;

  if (poderP1 > poderP2) {
    oponente1.pontos++;

    vencedorBatalha.innerText =
      `🏆 ${oponente1.nome} venceu!`;

  } else if (poderP2 > poderP1) {
    oponente2.pontos++;

    vencedorBatalha.innerText =
      `🏆 ${oponente2.nome} venceu!`;

  } else {
    vencedorBatalha.innerText = "🤝 Empate!";
  }

  placarNomeJ1.innerText = oponente1.nome;
  placarNomeJ2.innerText = oponente2.nome;

  placarPontosJ1.innerText = oponente1.pontos;
  placarPontosJ2.innerText = oponente2.pontos;

  modalResultadoBatalha.style.display = "flex";
}

export function iniciarEventosBatalha() {
  if (btnSelecionarCartas) {
    btnSelecionarCartas.style.display = "none";
  }

  openModalb.addEventListener("click", () => {
    modalBatalha.style.display =
      modalBatalha.style.display === "flex"
        ? "none"
        : "flex";
  });

  btnConfirmarb.addEventListener("click", () => {
    const nomeDigitado = campoInput.value.trim();

    if (!validarNome(nomeDigitado)) {
      alert(
        "Digite um nome válido com pelo menos 2 caracteres."
      );
      return;
    }

    if (etapaCadastro === 1) {
      nomeJogador1 = nomeDigitado;

      campoInput.value = "";

      tituloCadastro.innerText =
        "Jogador 2: Digite seu nome";

      btnConfirmarb.innerText =
        "Confirmar e Selecionar Cartas";

      etapaCadastro = 2;

    } else if (etapaCadastro === 2) {
      nomeJogador2 = nomeDigitado;

      cadastrarJogadores(
        nomeJogador1,
        nomeJogador2
      );

      campoInput.value = "";

      tituloCadastro.innerText =
        "Jogador 1: Digite seu nome";

      btnConfirmarb.innerText = "Próximo";

      etapaCadastro = 1;

      modalBatalha.style.display = "none";
      avisoSelecao.style.display = "block";

      tituloSelecao.innerText =
        `⚔️ Vez de ${nomeJogador1}`;

      mensagemSelecao.innerText =
        `${nomeJogador1}, escolha o Pokémon que você deseja usar!`;
    }
  });

  fecharBatalha.addEventListener("click", () => {
    modalResultadoBatalha.style.display = "none";

    estadoBatalha.pokemonJogador1 = null;
    estadoBatalha.pokemonJogador2 = null;
    estadoBatalha.emSelecao = false;

    avisoSelecao.style.display = "none";
  });

  novaBatalha.addEventListener("click", () => {
    modalResultadoBatalha.style.display = "none";

    estadoBatalha.pokemonJogador1 = null;
    estadoBatalha.pokemonJogador2 = null;
    estadoBatalha.emSelecao = true;

    avisoSelecao.style.display = "block";

    const jogador1 = estadoBatalha.jogadores[0];

    tituloSelecao.innerText =
      `⚔️ Vez de ${jogador1.nome}`;

    mensagemSelecao.innerText =
      `${jogador1.nome}, escolha seu novo Pokémon!`;
  });

  modalResultadoBatalha.addEventListener(
    "click",
    (event) => {
      if (event.target === modalResultadoBatalha) {
        modalResultadoBatalha.style.display = "none";

        estadoBatalha.pokemonJogador1 = null;
        estadoBatalha.pokemonJogador2 = null;
        estadoBatalha.emSelecao = false;

        avisoSelecao.style.display = "none";
      }
    }
  );
}