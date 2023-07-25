let btnRef = document.querySelectorAll(".opcao-botao");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("jogar-novamente");
let reiniciarBtn = document.getElementById("reiniciar");
let msgRef = document.getElementById("mensagem");

//Padrao/Array de vitoria
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

//O jogador 'X' jogara primeiro
let xTurn = true;
let count = 0;

//Desabilita todos botoes
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  popupRef.classList.remove("hide");
};

//Habilita todos botoes (para iniciar e reiniciar)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  popupRef.classList.add("hide");
};

//Funcao executado quando um dos jogadores vence
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = "&#x2B50; <br> X VENCEU!";
  } else {
    msgRef.innerHTML = "&#x2B50; <br> 'O' VENCEU!";
  }
};

//Funcao para empate
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x274C; <br> Vish, empatou!";
};

//Jogar novamente
newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});
reiniciarBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

//Logica de vitoria
const verificaVitoria = () => {
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        winFunction(element1);
      }
    }
  }
};

btnRef.forEach((element) => {
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
    //Incrementa contagem a cada clique
    count += 1;
    if (count == 9) {
      drawFunction();
    }
    verificaVitoria();
  });
});
window.onload = enableButtons;