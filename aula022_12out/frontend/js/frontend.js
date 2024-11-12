// Flag para usar Strict Mode
"use strict"

// Use camalCase na nomenclatura

// URL completa: protocolo + endereço + porta + endpoint

/** Protocolo: HTTP */
const protocolo = "http://"
/** URL base: localhost:3000 */
const baseURL = "localhost:3000"

/**
 * Lista os filmes em uma tabela.
 */
function listarFilmes(filmes) {
  // Exibir filmes na tabela
  let tabela = document.querySelector(".filmes")

  // Apagar conteúdo da 1ª linha
  let corpoTabela = tabela.getElementsByTagName("tbody")[0]
  corpoTabela.innerHTML = ""

  // Adicionar filmes na tabela
  // Usando for aprimorado
  for (let filme of filmes) {
    // Método insertRow: adiciona uma nova linha
    // Método insertCell: adiciona uma nova célula (coluna)

    // Inserir linha no início da tabela
    let linha = corpoTabela.insertRow(0)

    // Inserir título na 1º célula da linha
    let celulaTitulo = linha.insertCell(0)
    celulaTitulo.innerHTML = filme.titulo

    // Inserir sinopse na 2º célula da linha
    let celularSinopse = linha.insertCell(1)
    celularSinopse.innerHTML = filme.sinopse
  }
}

/** Função para obter filmes.
 * Função assíncrona: não vai esperar carregar tudo para montar a página.
 * Vai montando a página e quando carregar o elemento, insere ele nela.
 */
async function obterFilmes() {
  /** Endpoint para consultar filmes: "/filmes" */
  const filmesEndpoint = "/filmes"

  // Montar URL completa usando templates de strings
  const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`
  // Requisição assíncrona (pode esperar: palavra await)
  const filmes = (await axios.get(URLcompleta)).data

  listarFilmes(filmes)
}

/**
 * Cadastra um filme no servidor.
 * É uma função assíncrona.
 */
async function cadastrarFilme() {
  /** Endpoint para consultar filmes: "/filmes" */
  const filmesEndpoint = "/filmes"

  // Construir URL completa
  const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`

  // Obter dados que usuário digitou usando DOM
  let tituloInput = document.querySelector("#tituloInput")
  let sinopseInput = document.querySelector("#sinopseInput")

  // Armazenar valor dos inputs em variáveis
  let titulo = tituloInput.value
  let sinopse = sinopseInput.value

  // Se título e sinopse forem verdadeiro, ou seja, tiverem conteúdo.
  if (titulo && sinopse) {
    // Apagar campos do formulário (atribuir string vazia)
    tituloInput.value = ""
    sinopseInput.value = ""

    // Enviar JSON com informações do filme
    const filmes = (await axios.post(URLcompleta, { titulo, sinopse })).data

    // Listar os filmes
    listarFilmes(filmes)
  } else {
    let alert = document.querySelector(".alert")
    // Exibir mensagem de alerta
    alert.classList.add("show")
    alert.classList.remove("d-none")

    // Sumir após 5 segundos
    setTimeout(
      // ação (função)
      () => {
        alert.classList.remove("show")
        alert.classList.add("d-none")
      },
      5000 // Tempo em ms
    )
  }
}

/**
 * Cadastra um usuário no servidor.
 */
async function cadastrarUsuario() {
  // Obter dados do form
  let usuarioCadastroInput = document.querySelector("#usuarioCadastroInput")
  let passwordCadastroInput = document.querySelector("#passwordCadastroInput")
  // Armazenar entrada em variáveis
  let usuarioCadastro = usuarioCadastroInput.value
  let passwordCadastro = passwordCadastroInput.value

  // Validação
  if (usuarioCadastro && passwordCadastro) {
    /* Se ambos os campos estiverem preenchidos
     * Cadastrar o usuário no servidor
     */
    try {
      const cadastroEndpoint = "/signup"
      const URLcompleta = `${protocolo}${baseURL}${cadastroEndpoint}`

      await axios.post(
        URLcompleta,
        // Objeto JSON
        {
          login: usuarioCadastro,
          password: passwordCadastro,
        }
      )

      // Limpar os campos depois de enviar
      usuarioCadastroInput.value = ""
      passwordCadastroInput.value = ""

      // Mensagem
      // Obter elemento DOM alert-modal-cadastro
      let alert = document.querySelector(".alert-modal-cadastro")
      // Mensagem de erro
      alert.innerHTML = "Usuário cadastrado com sucesso!"
      // Exibir alert
      alert.classList.add("show", "alert-success")
      alert.classList.remove("d-none")
      // Alert desaparecer após 3s
      setTimeout(() => {
        alert.classList.remove("show", "alert-success")
        alert.classList.add("d-none")

        /* ocultar o modal */
        // Obter instância a partir do bootstrap
        let modalCadastro = bootstrap.Modal.getInstance(document.querySelector("#modalCadastro"))
        modalCadastro.hide()
      }, 3000)
    } catch (e) {
      /* tratamento de erro */
      // Obter elemento DOM alert-modal-cadastro
      let alert = document.querySelector(".alert-modal-cadastro")
      // Mensagem de erro
      alert.innerHTML = "Não foi possível realizar o cadastros!"
      // Exibir alert
      alert.classList.add("show", "alert-danger")
      alert.classList.remove("d-none")
      // Alert desaparecer após 3s
      setTimeout(() => {
        alert.classList.remove("show", "alert-danger")
        alert.classList.add("d-none")
      }, 3000)
    }
  } else {
    /* Se um dos campos não está preenchido:
     * Exibir mensagem de erro
     */
    // Obter elemento DOM alert-modal-cadastro
    let alert = document.querySelector(".alert-modal-cadastro")
    // Mensagem de erro
    alert.innerHTML = "Preencha todos os campos!"
    // Exibir alert
    alert.classList.add("show", "alert-danger")
    alert.classList.remove("d-none")
    // Alert desaparecer após 3s
    setTimeout(() => {
      alert.classList.remove("show", "alert-danger")
      alert.classList.add("d-none")
    }, 3000)
  }
}
