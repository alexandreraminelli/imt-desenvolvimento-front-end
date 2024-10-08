const express = require("express")

const app = express()
app.use(express.json())

app.get("/oi", (req, res) => {
  res.send("Olá")
})

let filmes = [
  // Objeto filme 1
  {
    titulo: "Deadpool & Wolverine",
    sinopse: "Wolverine está se recuperando quando cruza seu caminho com Deadpool. Juntos, eles formam uma equipe e enfrentam um inimigo em comum.",
  },
  // Objeto filme 2
  {
    titulo: "Oppenheimer",
    sinopse: "O físico J. Robert Oppenheimer trabalha com uma equipe de cientistas durante o Projeto Manhattan, levando ao desenvolvimento da bomba atômica.",
  },
]

app.get("/filmes", (req, res) => {})

app.post("/filmes", (req, res) => {
  // captura o que usuário enviou
  const titulo = req.body.titulo
  const sinopse = req.body.sinopse

  const filme = {
    titulo: titulo,
    sinopse: sinopse,
  }
  filmes.push(filme)
  res.json(filmes)
})

app.listen(3000, () => console.log("up and running"))
