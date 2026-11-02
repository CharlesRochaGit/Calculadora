
const visor = document.getElementById("visor");

let numeroAtual = "0";
let numeroAnterior = null;
let operador = null;
let reiniciarVisor = false;

// Atualiza o visor
function atualizarVisor() {

    const simbolos = {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷"
    };

    if (operador !== null && numeroAnterior !== null) {

        if (reiniciarVisor) {
            visor.textContent =
                `${numeroAnterior} ${simbolos[operador]}`;
        } else {
            visor.textContent =
                `${numeroAnterior} ${simbolos[operador]} ${numeroAtual}`;
        }

    } else {
        visor.textContent = numeroAtual;
    }
}


// Adiciona números
function adicionarNumero(numero) {
    if (numeroAtual === "0" || reiniciarVisor) {
        numeroAtual = numero;
        reiniciarVisor = false;
    } else {
        numeroAtual += numero;
    }

    atualizarVisor();
}

// Adiciona ponto decimal
function adicionarDecimal() {
    if (reiniciarVisor) {
        numeroAtual = "0.";
        reiniciarVisor = false;
    } else if (!numeroAtual.includes(".")) {
        numeroAtual += ".";
    }

    atualizarVisor();
}

// Escolhe a operação
function escolherOperador(novoOperador) {
    if (operador !== null && !reiniciarVisor) {
        calcular();
    }

    numeroAnterior = numeroAtual;
    operador = novoOperador;
    reiniciarVisor = true;
}

// Realiza os cálculos
function calcular() {
    if (operador === null || numeroAnterior === null) {
        return;
    }

    const primeiro = Number(numeroAnterior);
    const segundo = Number(numeroAtual);

    let resultado;

    switch (operador) {
        case "+":
            resultado = primeiro + segundo;
            break;

        case "-":
            resultado = primeiro - segundo;
            break;

        case "*":
            resultado = primeiro * segundo;
            break;

        case "/":
            if (segundo === 0) {
                numeroAtual = "Erro: divisão por zero";
                operador = null;
                numeroAnterior = null;
                reiniciarVisor = true;
                atualizarVisor();
                return;
            }

            resultado = primeiro / segundo;
            break;
    }

    numeroAtual = String(Number(resultado.toPrecision(12)));

    operador = null;
    numeroAnterior = null;
    reiniciarVisor = true;

    atualizarVisor();
}

// Limpa tudo
function limpar() {
    numeroAtual = "0";
    numeroAnterior = null;
    operador = null;
    reiniciarVisor = false;

    atualizarVisor();
}

// Apaga o último número
function apagar() {
    if (reiniciarVisor) {
        return;
    }

    numeroAtual = numeroAtual.slice(0, -1);

    if (numeroAtual === "" || numeroAtual === "-") {
        numeroAtual = "0";
    }

    atualizarVisor();
}

// Identifica os cliques nos botões
document.querySelector(".botoes").addEventListener("click", function(event) {
    const botao = event.target;

    if (!botao.matches("button")) {
        return;
    }

    if (botao.dataset.number !== undefined) {
        adicionarNumero(botao.dataset.number);
    }

    if (botao.dataset.operator) {
        escolherOperador(botao.dataset.operator);
    }

    switch (botao.dataset.action) {
        case "clear":
            limpar();
            break;

        case "delete":
            apagar();
            break;

        case "decimal":
            adicionarDecimal();
            break;

        case "calculate":
            calcular();
            break;
    }
});

// Permite usar o teclado do computador
document.addEventListener("keydown", function(event) {
    if (/^[0-9]$/.test(event.key)) {
        adicionarNumero(event.key);
    }

    if (event.key === ".") {
        adicionarDecimal();
    }

    if (["+", "-", "*", "/"].includes(event.key)) {
        escolherOperador(event.key);
    }

    if (event.key === "Enter" || event.key === "=") {
        calcular();
    }

    if (event.key === "Backspace") {
        apagar();
    }

    if (event.key === "Escape") {
        limpar();
    }
});

