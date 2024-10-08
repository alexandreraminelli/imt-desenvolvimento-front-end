// Flag para usar Strict Mode
"use strict"

// Use camalCase na nomenclatura

// URL completa: protocolo + endereço + porta + endpoint

const protocolo = "http://" // Protocolo: HTTP
const baseURL = "localhost:3000"
const filmesEndpoint = "/filmes" // Endpoint para consultar filmes: "/filmes"

/**Função para obter filmes
 * Função assíncrona: não vai esperar carregar tudo para montar a página.
 * Vai montando a página e quando carregar o elemento, insere ele nela.
 */
async function obterFilmes() {
  const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`
  // Requisição assíncrona (pode esperar: palavra await)
  const filmes = (await axios.get(URLcompleta)).data

  console.log(filmes)
}
