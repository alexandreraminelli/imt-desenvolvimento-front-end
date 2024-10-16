"use strict"

// String de conexão com o mongo
// "mongodb+srv://[USUÁRIO MONGO]:<[SENHA]>@cluster0.bmq1r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const express = require("express")
// Cross Origin:
const cors = require("cors")
// Mongoose:
const mongoose = require("mongoose")

const app = express()

app.use(express.json())
app.use(cors())

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

app.get("/filmes", (req, res) => {
  res.json(filmes)
})

app.post("/filmes", (req, res) => {
  // captura o que usuário enviou
  const titulo = req.body.titulo
  const sinopse = req.body.sinopse

  // Montar objeto que representa um novo filme
  const filme = {
    titulo: titulo,
    sinopse: sinopse,
  }
  // Adicionar novo filme a base
  filmes.push(filme)
  // //responde ao cliente. Aqui, optamos por devolver a base inteira ao cliente, embora não seja obrigatório
  res.json(filmes)
})

app.listen(3000, () => console.log("up and running"))
