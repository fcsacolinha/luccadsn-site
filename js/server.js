const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Configuração do Multer para armazenar os arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.use(express.static('public'));

app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file || !req.body.title) {
    return res.status(400).send('Imagem e título são obrigatórios!');
  }
  
  const imagePath = req.file.path;
  const title = req.body.title;
  
  // Aqui você pode salvar o caminho da imagem e o título em um banco de dados
  
  res.send(`Imagem enviada com sucesso! Título: ${title}`);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});