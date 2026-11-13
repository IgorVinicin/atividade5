const form = document.getElementById("cep-form");
const campoCep = document.getElementById("cep");
const mensagem = document.getElementById("mensagem");
const resultado = document.getElementById("resultado");

const valorCep = document.getElementById("valor-cep");
const valorLogradouro = document.getElementById("valor-logradouro");
const valorBairro = document.getElementById("valor-bairro");
const valorCidade = document.getElementById("valor-cidade");
const valorUf = document.getElementById("valor-uf");
const valorIbge = document.getElementById("valor-ibge");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  resultado.hidden = true;

  const cep = campoCep.value.trim();

  if (!/^\d{5}-?\d{3}$/.test(cep)) {
    mensagem.textContent = "CEP inválido. Digite 12328070 ou 12328-070.";
    return;
  }

  mensagem.textContent = "Consultando...";
  campoCep.disabled = true;

  const cepNumeros = cep.replace("-", "");

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${cepNumeros}/json/`);

    if (!resposta.ok) {
      mensagem.textContent = "Erro ao consultar o serviço ViaCEP.";
      return;
    }

    const dados = await resposta.json();

    if (dados.erro) {
      mensagem.textContent = "CEP não encontrado.";
      return;
    }

    valorCep.textContent = dados.cep;
    valorLogradouro.textContent = dados.logradouro || "Não informado";
    valorBairro.textContent = dados.bairro || "Não informado";
    valorCidade.textContent = dados.localidade;
    valorUf.textContent = dados.uf;
    valorIbge.textContent = dados.ibge;

    resultado.hidden = false;
    mensagem.textContent = "Resposta do ViaCEP:";
  } catch (erro) {
    mensagem.textContent = "Falha de conexão. Tente novamente.";
  } finally {
    campoCep.disabled = false;
    campoCep.focus();
  }
});
