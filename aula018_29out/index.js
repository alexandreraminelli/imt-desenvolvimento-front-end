"use strict"

// String de conexão com o mongo:
// `mongodb+srv://alexandreraminelli9491:404IleAQURtU1QHp@cluster0.bmq1r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const express = require("express")
// Cross Origin:
const cors = require("cors")
// Mongoose:
const mongoose = require("mongoose")

const app = express()

app.use(express.json())
app.use(cors())

const Filme = mongoose.model(
  "Filme",
  mongoose.Schema({
    titulo: { type: String },
    sinopse: { type: String },
  })
)

// Conexão com o banco de dados
async function conectarAoMongo() {
  await mongoose.connect(`mongodb+srv://alexandreraminelli9491:404IleAQURtU1QHp@cluster0.bmq1r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
}

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

// Buscar filmes
app.get("/filmes", async (req, res) => {
  const filmes = await Filme.find()
  res.json(Filmes)
})

// Criar filmes
app.post("/filmes", async (req, res) => {
  // captura o que usuário enviou
  const titulo = req.body.titulo
  const sinopse = req.body.sinopse

  // Montar (instanciar) o objeto de acordo com o modelo filme
  const filme = new Filme({ titulo: titulo, sinopse: sinopse })
  // Salva o objeto
  await filme.save()

  // Buscar os filmes na classe (não no objeto)
  // Método find: método estático (de Classe)
  const filmes = await Filme.find()

  // Retornar lista nova de filmes
  res.json(filmes)
})

app.listen(3000, () => {
  try {
    conectarAoMongo()
    console.log("server up and running e conexão ok")
  } catch (e) {
    // Se houver um erro
    console.log("erro na conexão", e)
  }
})
