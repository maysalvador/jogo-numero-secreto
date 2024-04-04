
let limite =  100;
let listaNumeros = [];
let numeroSecreto = gerarNumeroSecreto();
let tentativas = 1;

function alterarTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female', {rate:1.2});
};

function msgInicial() {
    alterarTexto("h1", "Jogo do número secreto");
    alterarTexto("p", `Escolha um número entre 1 e ${limite}:`);
};

msgInicial();

function verificarChute() {
    let chute = document.querySelector("input").value;
    if (chute == numeroSecreto) {
        alterarTexto("h1", "Acertou!");
        let palavraTentativa = tentativas > 1 ? " tentativas" : " tentativa";
        let mensagem = `Voce acertou o número secreto em ${tentativas} ${palavraTentativa}! Parabéns!`;
        alterarTexto("p", mensagem);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute < numeroSecreto) {
            alterarTexto("p", "O seu chute foi menor que o número secreto. Tente novamente.");
        } else if (chute > numeroSecreto) {
            alterarTexto("p", "O seu chute foi maior que o número secreto. Tente novamente.");
        };
        tentativas++;
        limparCampo();
    }
};

function gerarNumeroSecreto() {
    let numeroEscolhido = parseInt(Math.random() * limite + 1);
    let i = listaNumeros.length;
    if (i == limite) {
        listaNumeros = [];
    }
    if (listaNumeros.includes(numeroEscolhido)) {
        return gerarNumeroSecreto();
    } else {
        listaNumeros.push(numeroEscolhido);
        return numeroEscolhido;
    }

}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
    document.querySelector("input").focus();
}

function novoJogo() {
    msgInicial();
    tentativas = 1;
    numeroSecreto = gerarNumeroSecreto();
    limparCampo();
    document.getElementById("reiniciar").setAttribute("disabled",true);
}