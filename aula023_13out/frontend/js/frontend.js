// Flag para usar Strict Mode
"use strict"

// Use camalCase na nomenclatura

// URL completa: protocolo + endereço + porta + endpoint

/** Protocolo: HTTP */
const protocolo = "http://"
/** URL base: localhost:3000 */
const baseURL = "localhost:3000"

/**
 * Montar a URL.
 */
function montarURL(endpoint) {
  return `${protocolo}${baseURL}${endpoint}`
}

/**
 * Exibe uma mensagem de alerta.
 *
 * @param {*} seletor Elemento que permite selecionar o modal
 * @param {*} innerHTML Conteúdo HTML exibido na mensagem.
 * @param {*} classesToAdd Classes para serem adicionadas e tornar o alerta visível.
 * @param {*} classesToRemove Classes para serem removidas que tornam o alerta invisível.
 * @param {*} timeout Tempo que a mensagem será exibida.
 */
function exibeAlerta(seletor, innerHTML, classesToAdd, classesToRemove, timeout) {
  // Obter elemento pelo DOM
  let alert = document.querySelector(seletor)
  // Mensagem
  alert.innerHTML = innerHTML

  // Adicionar classes informadas
  alert.classList.add(...classesToAdd)
  // Remover classes informadas
  alert.classList.remove(...classesToRemove)

  // Voltar ao estado anterior após um período
  setTimeout(() => {
    // Remover classes adicionadas
    alert.classList.remove(...classesToAdd)
    // Devolver classes removidas
    alert.classList.add(...classesToRemove)
  }, timeout)
}

/**
 * Oculta o modal.
 */
function escondeModal(idModal, timeout) {
  setTimeout(() => {
    let modal = bootstrap.Modal.getInstance(document.querySelector(idModal))
    modal.hide()
  }, timeout)
}

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
    // Exibir mensagem de alerta
    exibeAlerta(".alert-filme", "Preencha todos os campos!", ["alert-danger", "show"], ["d-none"], 5000)
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
      exibeAlerta(".alert-modal-cadastro", "Usuário cadastrado com sucesso!", ["show", "alert-success"], ["d-none"], 5000)
    } catch (e) {
      /* tratamento de erro */
      // Exibir mensagem de erro de sistema
      exibeAlerta(".alert-modal-cadastro", "Não foi possível realizar o cadastro!", ["show", "alert-danger"], ["d-none"], 5000)
    }
  } else {
    /* Se um dos campos não está preenchido:
     * Exibir mensagem de erro do usuário
     */
    exibeAlerta(".alert-modal-cadastro", "Preencha todos os campos!", ["show", "alert-warning"], ["d-none"], 5000)
  }
}

/* */
const fazerLogin = async () => {
  // Obter elementos DOM
  let usuarioLoginInput = document.querySelector("#usuarioLoginInput")
  let passwordLoginInput = document.querySelector("#passwordLoginInput")
  // Obter dados do formulário de login
  let usuarioLogin = usuarioLoginInput.value
  let passwordLogin = passwordLoginInput.value

  // Verificar se dados são válidos
  if (usuarioLogin && passwordLogin) {
    /* Se ambos os campos estiverem preenchidos */
    try {
      /* Realizar a autenticação */
      // Montar a URL completa
      const URLcompleta = montarURL("/login")
      //
      const response = await axios.post(
        URLcompleta, // URL completa
        { login: usuarioLogin, password: passwordLogin } // Objeto JSON
      )
      // Gerar token
      localStorage.setItem("token", response.data)

      // Limpar as caixas
      usuarioLoginInput.value = ""
      passwordLoginInput.value = ""

      // Exibir mensagem de login realizado com sucesso
      exibeAlertaLogin("Login realizado com sucesso!", "alert-success")

      // Ocultar o Modal
      // escondeModal("#modalLogin", 1000)

      // Alterar link de "Login" para "Logout"
      const loginLink = document.querySelector("#loginLink")
      loginLink.innerHTML = "Logout"

      // Habilitar botão
      const cadastrarFilmeButton = document.querySelector("#cadastrarFilmeButton")
      cadastrarFilmeButton.classList.remove("disabled")
    } catch (e) {
      /* Se houver um erro na autenticação */
      // Alerta de erro no login
      exibeAlertaLogin("Falha na autenticação!", "alert-danger")

      escondeModal("#modalLogin", 2000)
    }
  } else {
    /* Se um ou ambos os campos estiverem vazios */
    // Exibir alerta de preencha todos os campos
    exibeAlertaLogin("Preencha todos os campos!", "alert-warning")
  }
}

/** Exibe alerta de login.
 * @param {String} mensagem Mensagem a ser exibida
 * @param {String} tipo Tipo de alerta (classe do Bootstrap)
 */
function exibeAlertaLogin(mensagem, tipo) {
  // Lista de classes de outros tipos a remover
  let outrosTipos = ["alert-success", "alert-warning", "alert-danger"].filter((c) => c !== tipo)

  // Chamar a função exibeAlertaLogin
  exibeAlerta(
    ".alert-modal-login", // elemento
    mensagem, // mensagem do alerta
    ["show", tipo], // classes a serem adicionadas
    ["d-none", ...outrosTipos], // classes a serem removidas
    2000 // tempo de exibição
  )
}
