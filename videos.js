function enviar() {
  const input = document.getElementById("upload");
  const file = input.files[0];

  if (!file) {
    alert("Escolhe um vídeo!");
    return;
  }

  const formData = new FormData();
  formData.append("video", file);

  fetch("https://servidor-production-905b.up.railway.app/upload", {
    method: "POST",
    body: formData
  })
  .then(() => {
    alert("Vídeo enviado 🔥");
    carregarVideos();
  });
}

function carregarVideos() {
  fetch("https://servidor-production-905b.up.railway.app/listar-videos")
    .then(res => res.json())
    .then(files => {
      const lista = document.getElementById("lista");
      lista.innerHTML = "";

      files.forEach(nome => {
        const botao = document.createElement("button");
        botao.innerText = nome;
        botao.className = "video-btn";
        botao.onclick = () => tocarVideo(nome);
        lista.appendChild(botao);
      });
    });
}

function tocarVideo(nome) {
  const player = document.getElementById("player");
  player.innerHTML = "";

  const video = document.createElement("video");
  video.src = "https://servidor-production-905b.up.railway.app/videos/" + nome;
  video.controls = true;
  video.preload = "none";

  player.appendChild(video);
  video.scrollIntoView({ behavior: "smooth" });
}

window.onload = carregarVideos;
