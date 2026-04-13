const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors({ origin: "*" }));

const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const nome = Date.now() + "-" + file.originalname;
    cb(null, nome);
  }
});

const upload = multer({ storage });


app.post("/upload", upload.single("video"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ erro: "Nenhum arquivo enviado" });
  }

  res.json({
    mensagem: "vídeo enviado!",
    filename: req.file.filename
  });
});

app.use("/videos", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Servidor funcionando 🔥");
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://127.0.0.1:3000");

  const fs = require("fs");

app.get("/listar-videos", (req, res) => {
  const fs = require("fs");

  fs.readdir("uploads", (err, files) => {
    if (err) return res.status(500).send("Erro");

    res.json(files);
  });
});

});