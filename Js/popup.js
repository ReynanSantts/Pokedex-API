const popup = document.getElementById("popup");
const detalhesPokemon = document.getElementById("detalhesPokemon");
const fecharPopup = document.getElementById("fecharPopup");

export function calcularBarra(valor) {
  return Math.min((valor / 300) * 100, 100);
}

export function abrirPopupPokemon(pokemon, detalhes) {
  const tipos = detalhes.types.map((tipo) => tipo.type.name);
  const tiposTexto = tipos.join(", ");
  const tipoPrincipal = tipos[0];

  const habilidades = detalhes.abilities.map(
    (habilidade) => habilidade.ability.name
  );

  const habilidadesTexto = habilidades.join(", ");

  const popupConteudo = document.querySelector(".popup-conteudo");

  popupConteudo.className = "popup-conteudo";
  popupConteudo.classList.add(tipoPrincipal);

  const hp = detalhes.stats[0].base_stat;
  const ataque = detalhes.stats[1].base_stat;
  const defesa = detalhes.stats[2].base_stat;
  const ataqueEspecial = detalhes.stats[3].base_stat;
  const defesaEspecial = detalhes.stats[4].base_stat;
  const velocidade = detalhes.stats[5].base_stat;

  detalhesPokemon.innerHTML = `
    <h2>${pokemon.name}</h2>

    <img
      src="${detalhes.sprites.other["official-artwork"].front_default}"
      alt="${pokemon.name}"
    >

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
        <div
          class="barra-preenchida"
          style="width: ${calcularBarra(hp)}%">
        </div>
      </div>
    </div>

    <div class="status">
      <div class="status-info">
        <strong>Ataque</strong>
        <span>${ataque}</span>
      </div>

      <div class="barra">
        <div
          class="barra-preenchida"
          style="width: ${calcularBarra(ataque)}%">
        </div>
      </div>
    </div>

    <div class="status">
      <div class="status-info">
        <strong>Defesa</strong>
        <span>${defesa}</span>
      </div>

      <div class="barra">
        <div
          class="barra-preenchida"
          style="width: ${calcularBarra(defesa)}%">
        </div>
      </div>
    </div>

    <div class="status">
      <div class="status-info">
        <strong>Ataque Especial</strong>
        <span>${ataqueEspecial}</span>
      </div>

      <div class="barra">
        <div
          class="barra-preenchida"
          style="width: ${calcularBarra(ataqueEspecial)}%">
        </div>
      </div>
    </div>

    <div class="status">
      <div class="status-info">
        <strong>Defesa Especial</strong>
        <span>${defesaEspecial}</span>
      </div>

      <div class="barra">
        <div
          class="barra-preenchida"
          style="width: ${calcularBarra(defesaEspecial)}%">
        </div>
      </div>
    </div>

    <div class="status">
      <div class="status-info">
        <strong>Velocidade</strong>
        <span>${velocidade}</span>
      </div>

      <div class="barra">
        <div
          class="barra-preenchida"
          style="width: ${calcularBarra(velocidade)}%">
        </div>
      </div>
    </div>
  `;

  popup.style.display = "flex";
}

export function iniciarEventosPopup() {
  fecharPopup.addEventListener("click", () => {
    popup.style.display = "none";
  });

  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      popup.style.display = "none";
    }
  });
}