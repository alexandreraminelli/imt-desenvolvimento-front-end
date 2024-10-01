// Código do servidor
// index = chamado ao iniciar a aplicação

// Variável local que traz biblioteca Express pro contexto
const express = require("express")

// Variável que é uma instância do express (utilizando construtor express)
const app = express()

//
app.use(express.json())

/*
 * URL que ao ser chamada executa determinada ação
 * requisição GET (consultar)
 * http://localhost:3000/oi | porta: 3000 | endpoint: 'oi'
 *  1º parâmetro do get: endpoint
 *  2º parâmetro do get: função
 *     1º parâmetro da arrow function: parâmetro de requisição
 *     2º parâmetro da arrow function: parâmetro de resposta
 */
app.get("/oi", (req, res) => {
  // Envia uma mensagem pro servidor
  res.send("Olá")
})

// variável filmes com escopo de bloco e lista de objetos JSON
let filmes = [
  // Objeto filme 1
  {
    titulo: "Deadpool & Wolverine",
    sinopse: "Wolverine está se recuperando quando cruza seu caminho com Deadpool. Juntos, eles formam uma equipe e enfrentam um inimigo em comum.",
  },
  //   Objeto filme 2
  {
    titulo: "Oppenheimer",
    sinopse: "O físico J. Robert Oppenheimer trabalha com uma equipe de cientistas durante o Projeto Manhattan, levando ao desenvolvimento da bomba atômica.",
  },
]
// Aspas nas chaves: depende do cliente

app.listen(
  3000, // porta usada pela aplicação
  () => console.log("up and running") // função (arrow function | função sem nome executada automaticamente; sem {} pois só há um comando)
)
