// Flag para usar Strict Mode
"use strict"

// Use camalCase na nomenclatura

// URL completa: protocolo + endereço + porta + endpoint

const protocolo = "http://" // Protocolo: HTTP
const baseURL = "localhost:3000"
const filmesEndpoint = "/filmes" // Endpoint para consultar filmes: "/filmes"

/** Função para obter filmes
 * Função assíncrona: não vai esperar carregar tudo para montar a página.
 * Vai montando a página e quando carregar o elemento, insere ele nela.
 */
async function obterFilmes() {
  // Montar URL completa usando templates de strings
  const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`
  // Requisição assíncrona (pode esperar: palavra await)
  const filmes = (await axios.get(URLcompleta)).data

  let tabela = document.querySelector(".filmes")
  // Selecionar o elemento <tbody> que será uma lista de linhas (<tr>)
  let corpoTabela = tabela.getElementsByTagName("tbody")[0]

  // For de iteração (aprimorado) que adiciona linhas na tabela
  for (let filme of filmes) {
    // Usar método insertRow
    // Param 1: 0 para inserir no início
    let linha = corpoTabela.insertRow(0)

    let celulaTitulo = linha.insertCell(0) // Inserir título na 1º célula da linho
    let celularSinopse = linha.insertCell(1) // Inserir sinopse na 2º célula da linha

    celulaTitulo.innerHTML = filme.titulo
    celularSinopse.innerHTML = filme.sinopse
  }
}
