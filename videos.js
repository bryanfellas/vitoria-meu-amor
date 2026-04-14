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

function removerVideo(nome) {
  if (!confirm(`Remover "${nome}"?`)) return;
  fetch("https://servidor-production-905b.up.railway.app/deletar/" + encodeURIComponent(nome), {
    method: "DELETE"
  })
  .then(res => {
    if (res.ok) {
      document.getElementById("player").innerHTML = "";
      carregarVideos();
    } else {
      alert("Erro ao remover o vídeo.");
    }
  });
}

function carregarVideos() {
  fetch("https://servidor-production-905b.up.railway.app/listar-videos")
    .then(res => res.json())
    .then(files => {
      const lista = document.getElementById("lista");
      lista.innerHTML = "";
      files.forEach(nome => {
        const item = document.createElement("div");
        item.className = "video-item";

        const botao = document.createElement("button");
        botao.innerText = nome;
        botao.className = "video-btn";
        botao.onclick = () => tocarVideo(nome);

        const btnRemover = document.createElement("button");
        btnRemover.innerText = "🗑️";
        btnRemover.className = "btn-remover";
        btnRemover.onclick = () => removerVideo(nome);

        item.appendChild(botao);
        item.appendChild(btnRemover);
        lista.appendChild(item);
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
