
function Aura() {
  const dataInicio = new Date(2026, 1, 27, 12, 0, 0);
  const agora = new Date();
  const diff = agora - dataInicio;
  const totalSegundos = Math.floor(diff / 1000);

  const segundos = totalSegundos % 60;
  const minutos = Math.floor(totalSegundos / 60) % 60;
  const horas = Math.floor(totalSegundos / 3600) % 24;
  const dias = Math.floor(totalSegundos / (3600 * 24));

  document.getElementById("contador").innerText =
    `Estamos juntos há ${dias} dias ⏱ ${horas}h ${minutos}m ${segundos}s ❤️`;
}

setInterval(Aura, 1000);
Aura();

function criarRosa() {
  const rosa = document.createElement("img");
  rosa.src = "rosa.png";
  rosa.className = "rosa";
  rosa.style.left = Math.random() * 100 + "vw";
  rosa.style.animationDuration = (Math.random() * 3 + 3) + "s";
  document.body.appendChild(rosa);
  setTimeout(() => rosa.remove(), 11000);
}

setInterval(criarRosa, 800);

function criarHeart() {
  const heart = document.createElement("img");
  heart.src = "heart.png";
  heart.className = "heart";
    heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = (Math.random() * 3 + 3) + "s";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 11000);
}

setInterval(criarHeart, 1200);

const audio = document.getElementById("musica");
const bolinha = document.getElementById("bolinha");
const playBtn = document.getElementById("playBtn");
const barra = document.querySelector(".barra");

function tocarpausa() {
  if (audio.paused) {
    audio.play();
    playBtn.src = "pause.png";
  } else {
    audio.pause();
    playBtn.src = "tocando.png";
  }
}

function voltar() {
  audio.currentTime = Math.max(0, audio.currentTime - 10);
}

function proximo() {
  audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
}

audio.addEventListener("timeupdate", () => {
  const progresso = audio.currentTime / audio.duration;
  const larguraBarra = barra.offsetWidth;
  bolinha.style.left = (progresso * (larguraBarra - bolinha.offsetWidth)) + "px";
});

barra.addEventListener("click", (e) => {
  const rect = barra.getBoundingClientRect();
  const posicaoClick = e.clientX - rect.left;
  const porcentagem = posicaoClick / rect.width;
  audio.currentTime = porcentagem * audio.duration;
});

function Verificar() {
  document.getElementById("resultado").innerHTML =
    "Eu te amo ❤️<br>" +
    "I love you ❤️<br>" +
    "Te amo ❤️<br>" +
    "Je t'aime ❤️<br>" +
    "Ti amo ❤️<br>" +
    "Ich liebe dich ❤️<br>" +
    "Te quiero ❤️<br>" +
    "Ik hou van jou ❤️<br>" +
    "Jeg elsker deg ❤️<br>" +
    "Jag älskar dig ❤️<br>" +
    "Seni seviyorum ❤️<br>" +
    "Σ' αγαπώ ❤️<br>" +
    "Я тебя люблю ❤️<br>" +
    "사랑해 ❤️<br>" +
    "愛してる ❤️<br>" +
    "我爱你 ❤️";
}

function entrarArea() {
  const senha = prompt("Digite a senha ❤️");
  if (!senha) return;

  fetch("https://servidor-production-905b.up.railway.app/verificar-senha", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ senha })
  })
  .then(res => res.json())
  .then(data => {
    if (data.ok) {
      window.location.href = "areasecreta.html";
    } else {
      alert("Senha errada 😢");
    }
  });
}
