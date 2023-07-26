let botoesDoJogo = document.querySelectorAll(".opcao-botao");
let mensagemPopup = document.querySelector(".popup");
let botaoJogarNovamente = document.getElementById("jogar-novamente");
let botaoReiniciar = document.getElementById("reiniciar");
let elementoMensagem = document.getElementById("mensagem");

let padraoParaVencer = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

let vezDoJogadorX = true;
let numeroDeJogadas = 0;

const desabilitarBotoesDoJogo = () => {
  botoesDoJogo.forEach((elemento) => (elemento.disabled = true));
  mensagemPopup.classList.remove("hide");
};

const habilitarBotoesDoJogo = () => {
  botoesDoJogo.forEach((elemento) => {
    elemento.innerText = "";
    elemento.disabled = false;
  });
  mensagemPopup.classList.add("hide");
};

const jogadorVenceu = (letra) => {
  desabilitarBotoesDoJogo();
  if (letra == "X") {
    elementoMensagem.innerHTML = "&#x2B50; <br> X - VENCEU!";
  } else {
    elementoMensagem.innerHTML = "&#x2B50; <br> O - VENCEU!";
  }
};

const jogoEmpatou = () => {
  desabilitarBotoesDoJogo();
  elementoMensagem.innerHTML = "&#x274C; <br> Vish, empatou!";
};

botaoJogarNovamente.addEventListener("click", () => {
  numeroDeJogadas = 0;
  habilitarBotoesDoJogo();
});

botaoReiniciar.addEventListener("click", () => {
  numeroDeJogadas = 0;
  habilitarBotoesDoJogo();
});

const verificarVitoria = () => {
  for (let padrao of padraoParaVencer) {
    let [elemento1, elemento2, elemento3] = [
      botoesDoJogo[padrao[0]].innerText,
      botoesDoJogo[padrao[1]].innerText,
      botoesDoJogo[padrao[2]].innerText,
    ];
    if (elemento1 != "" && elemento1 == elemento2 && elemento2 == elemento3) {
      jogadorVenceu(elemento1);
      return;
    }
  }

  if (numeroDeJogadas === 9) {
    jogoEmpatou();
  }
};

botoesDoJogo.forEach((elemento) => {
  elemento.addEventListener("click", () => {
    if (vezDoJogadorX) {
      vezDoJogadorX = false;
      elemento.innerText = "X";
      elemento.disabled = true;
    } else {
      vezDoJogadorX = true;
      elemento.innerText = "O";
      elemento.disabled = true;
    }

    numeroDeJogadas += 1;
    verificarVitoria();
  });
});

window.onload = habilitarBotoesDoJogo;