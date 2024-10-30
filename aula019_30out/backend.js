"use strict"

// String de conexão com o mongo:
// `mongodb+srv://alexandreraminelli9491:404IleAQURtU1QHp@cluster0.bmq1r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const express = require("express")
const cors = require("cors") // Cross Origin
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const uniqueValidator = require("mongoose-unique-validator")

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

//
const usuarioSchema = mongoose.Schema({
  login: {
    type: String, // tipo de dado: String
    require: true, // Obrigatório: sim
    unique: true, // Único: sim
  },
  password: { type: String, require: true },
})
usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model("usuario", usuarioSchema)

// Conexão com o banco de dados
async function conectarAoMongo() {
  await mongoose.connect(`mongodb+srv://alexandreraminelli9491:404IleAQURtU1QHp@cluster0.bmq1r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  // await mongoose.connect(`mongodb+srv://pro_mac:mongo123@cluster0.skf8n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
}

// Buscar filmes
app.get("/filmes", async (req, res) => {
  const filmes = await Filme.find()
  res.json(filmes)
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

app.post("/signup", async (req, res) => {
  try {
    // Obter a entrada do usuário
    const login = req.body.login
    const password = req.body.password
    // Hashear a senha
    const senhaCriptografada = await bcrypt.hash(password, 10)

    const usuario = new Usuario({
      login: login,
      password: senhaCriptografada,
    })
    const respMongo = await usuario.save()
    console.log(respMongo)

    // Finalizar requisição e evitar timeout
    res.status(201).end()
  } catch (e) {
    console.log(e) // Exibir mensagem de erro
    res.status(409).end()
  }
})

// Verificar o login
app.post("/login", async (req, res) => {
  // Obter dados do formulário
  const login = req.body.login
  const password = req.body.password

  // Verificar se o usuário existe
  const usuarioExiste = await Usuario.findOne({ login: login })
  // Se usuário não existir
  if (!usuarioExiste) {
    return res.status(404).json({ mensagem: "login inválido" })
  }

  // Verificar se a senha está correta
  const senhaValida = await bcrypt.compare(password, usuarioExiste.password)
  // Se senha for inválida
  if (!senhaValida) {
    return res.status(401).json({ mensagem: "senha inválida" })
  }

  // Gerar o token
  const token = jwt.sign(
    { login: login }, // objeto JSON com login do usuário
    "chave-secreta",
    { expiresIn: "1h" } // tempo de expiração: 1 hora
  )
  // Retornar status
  res.status(200).json({ token: token })
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
