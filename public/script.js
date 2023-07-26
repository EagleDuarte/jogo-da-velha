// Seleciona todos os botões do jogo da velha com a classe "opcao-botao"
let botoesDoJogo = document.querySelectorAll(".opcao-botao");

// Seleciona o elemento com a classe "popup" (provavelmente usado para exibir mensagens)
let mensagemPopup = document.querySelector(".popup");

// Seleciona o botão com o id "jogar-novamente"
let botaoJogarNovamente = document.getElementById("jogar-novamente");

// Seleciona o botão com o id "reiniciar"
let botaoReiniciar = document.getElementById("reiniciar");

// Seleciona o elemento com o id "mensagem" (onde são exibidas mensagens de vitória ou empate)
let elementoMensagem = document.getElementById("mensagem");

// Array de arrays que define os padrões de vitória no jogo da velha
let PadraoParaVencer = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

// Variável booleana que indica se é a vez do jogador 'X' jogar (true) ou do jogador 'O' jogar (false)
let xTurn = true;

// Contador para acompanhar o número de jogadas realizadas
let count = 0;

// Função para desabilitar todos os botões do jogo e mostrar a mensagem de vitória/empate
const disabilitaBotoes = () => {
  botoesDoJogo.forEach((element) => (element.disabled = true));
  mensagemPopup.classList.remove("hide");
};

// Função para habilitar todos os botões do jogo (para iniciar e reiniciar) e limpar seus conteúdos
const habilitarBotoesDoJogo = () => {
  botoesDoJogo.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  mensagemPopup.classList.add("hide");
};

// Função executada quando um dos jogadores vence o jogo
const funcaoVitoria = (letter) => {
  disabilitaBotoes();
  if (letter == "X") {
    elementoMensagem.innerHTML = "&#x2B50; <br> X - VENCEU!";
  } else {
    elementoMensagem.innerHTML = "&#x2B50; <br> O - VENCEU!";
  }
};

// Função executada quando o jogo termina em empate
const FuncaoEmpate = () => {
  disabilitaBotoes();
  elementoMensagem.innerHTML = "&#x274C; <br> Vish, empatou!";
};

// Event listener para o botão "Jogar Novamente"
botaoJogarNovamente.addEventListener("click", () => {
  count = 0;
  habilitarBotoesDoJogo();
});

// Event listener para o botão "Reiniciar"
botaoReiniciar.addEventListener("click", () => {
  count = 0;
  habilitarBotoesDoJogo();
});

// Função para verificar se algum dos padrões de vitória foi atingido
const verificaVitoria = () => {
  for (let i of PadraoParaVencer) {
    let [element1, element2, element3] = [
      botoesDoJogo[i[0]].innerText,
      botoesDoJogo[i[1]].innerText,
      botoesDoJogo[i[2]].innerText,
    ];
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        funcaoVitoria(element1);
      }
    }
  }
};

// Event listeners para os botões do jogo
botoesDoJogo.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;
      element.innerText = "O";
      element.disabled = true;
    }
    // Incrementa o contador a cada clique
    count += 1;
    // Verifica se o jogo terminou em empate
    if (count == 9) {
      FuncaoEmpate();
    }
    // Verifica se algum dos jogadores venceu
    verificaVitoria();
  });
});

// Executa a função habilitarBotoesDoJogo() quando a página é carregada para habilitar os botões inicialmente
window.onload = habilitarBotoesDoJogo;