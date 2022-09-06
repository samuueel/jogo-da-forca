const palavras = [
    "java", "react", "node", "python", "php", "html", "css", "javascript", "bootstrap",
    "abacaxi", "abacate", "amora", "figo", "framboesa", "maça", "mamão", "melancia", "uva", "bergamota",
    "roxo", "rosa", "vermelho", "laranja", "marrom", "cinza", "branco", "preto", "amarelo", "azul",
    "amiga", "amor", "ave", "avião", "avo", "balao", "bebe", "bolo", "branco", "cama", "caneca", "celular", "ceu", "clube",
    "copo", "doce", "elefante", "escola", "estojo", "faca", "foto", "garfo", "geleia", "girafa", "janela", "limonada", "mae",
    "meia", "noite", "oculos", "onibus", "ovo", "pai", "pao", "parque", "passarinho", "peixe", "pijama", "rato", "umbigo"
]

const palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)];

const letrasErradas = [];
const letrasCorretas = [];

document.addEventListener("keydown", (evento) => {
    const codigo = evento.keyCode; // 65 - 90 (intervalo)
    if (isLetra(codigo)) {
        const letra = evento.key;
        if (letrasErradas.includes(letra)) {
            mostrarAvisoLetraRepetida();
        } else {
            if (palavraSecreta.includes(letra)) {
                letrasCorretas.push(letra);
            } else {
                letrasErradas.push(letra);
            }
        }
        atualizarJogo();
    }
});

function atualizarJogo() {
    mostrarLetrasErradas();
    mostrarLetrasCertas();
    desenharForca();
    checarJogo();
}

function mostrarLetrasErradas() {
    const div = document.querySelector(".letras-erradas-container");
    div.innerHTML = "<h3>Letras erradas</h3>";
    letrasErradas.forEach((letra) => {
        div.innerHTML += `<span>${letra}</span>`;
    });
}

function mostrarLetrasCertas() {
    const container = document.querySelector(".palavra-secreta-container");
    container.innerHTML = "";
    palavraSecreta.split("").forEach((letra) => {
        if (letrasCorretas.includes(letra)) {
            container.innerHTML += `<span>${letra}</span>`;
        } else {
            container.innerHTML += `<span>_</span>`;
        }
    });
}

function checarJogo() {
    let mensagem = "";
    const container = document.querySelector(".palavra-secreta-container");
    const partesCorpo = document.querySelectorAll(".forca-parte");

    if (letrasErradas.length === partesCorpo.length) {
        mensagem = "Fim de jogo! Você perdeu!";
        mostrarPalavraQueEra()
    }

    if (palavraSecreta === container.innerText) {
        mensagem = "Parabéns! Você ganhou!";
    }

    if (mensagem) {
        document.querySelector("#mensagem").innerHTML = mensagem;
        document.querySelector(".popup-container").style.display = "flex";
    }
}

function desenharForca() {
    const partesCorpo = document.querySelectorAll(".forca-parte");
    for (let i = 0; i < letrasErradas.length; i++) {
        partesCorpo[i].style.display = "block";
    }
}

function mostrarAvisoLetraRepetida() {
    const aviso = document.querySelector(".aviso-palavra-repetida");
    aviso.classList.add("show");
    setTimeout(() => {
        aviso.classList.remove("show");
    }, 1000);
}

const mostrarPalavraQueEra = () => {
    const aviso = document.getElementById("palavraQueEra");
    aviso.innerText = `A palavra era ${palavraSecreta}`
}

function isLetra(codigo) {
    return codigo >= 65 && codigo <= 90;
}

function reiniciarJogo() {
    window.location.reload();
}