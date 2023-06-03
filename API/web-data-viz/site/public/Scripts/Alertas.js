var alertas = [];

function obterdados(idAquario) {
    fetch(`/medidas/tempo-real/${idAquario}`)
        .then(resposta => {

            if (resposta.ok) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                });
            } else {

                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });

}

function alertar(resposta, idAquario) {
    var Luminosidade = resposta[0]["round(avg(leitura))"];

    
    
    var grauDeAviso ='';



    if (Luminosidade <= 500) {
    alertaMensagemId.innerHTML = `<div class="alertaCritc">Crítico (abaixo)</div>`
    exibirAlerta(Luminosidade, idAquario)
  } else if (Luminosidade > 500 && Luminosidade <= 700) {
    alertaMensagemId.innerHTML = `<div class="alertaAjustavel1">Ajustável</div>`
    exibirAlerta(Luminosidade, idAquario)
  } else if (Luminosidade > 800 && Luminosidade <= 900) {
    alertaMensagemId.innerHTML = `<div class="alertaAjustavel">Ajustável</div>`
    exibirAlerta(Luminosidade, idAquario)
  } else if (Luminosidade > 900) {
    alertaMensagemId.innerHTML = `<div class="alertaCritico">Crítico (Acima)</div>`
    exibirAlerta(Luminosidade, idAquario)
  } else {
    document.querySelector(".mensagensAlertas").style.display = "none";
  }

    var card;

    if (idAquario == 1) {
        temp_aquario_1.innerHTML = Luminosidade + " Lux";
        card = card_1
    } else if (idAquario == 2) {
        temp_aquario_2.innerHTML = Luminosidade + " Lux";
        card = card_2
    }
    // } else if (idAquario == 3) {
    //     temp_aquario_3.innerHTML = temp + "°C";
    //     card = card_3
    // } else if (idAquario == 4) {
    //     temp_aquario_4.innerHTML = temp + "°C";
    //     card = card_4
    // }

    card.className = classeLuminosidade;
}

function exibirAlerta(Luminosidade, idAquario) {
    var indice = alertas.findIndex(item => item.idAquario == idAquario);

    if (indice >= 0) {
        alertas[indice] = { idAquario, Luminosidade}
    } else {
        alertas.push({ idAquario, Luminosidade});
    }

    exibirCards();
    
// Dentro da div com classe grauDeAvisoCor há um caractere "invisível", 
// que pode ser inserido clicando com o seu teclado em alt+255 ou pelo código adicionado acima.
}

function removerAlerta(idAquario) {
    alertas = alertas.filter(item => item.idAquario != idAquario);
    exibirCards();
}
 
function exibirCards() {
    mensagensAlertas.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        mensagensAlertas.innerHTML += transformarEmDiv(mensagem);
    }
}

function transformarEmDiv(idAquario, Luminosidade) {
    return `<div class="mensagensAlertas">
    <div class="alerta">
      <div class="alertaTitulo">
        <h1>Checar ${idAquario}, ${Luminosidade}</h1>
      </div>
      <div class="alertaMensagem" id="alertaMensagemId">

      </div>
      <div class="alertaBotoes">
        <button class="alertaBotao" onclick="sumirAlerta()">Ok</button>
        <a href="locais.html"><button class="alertaBotao">Acessar Locais</button></a>
      </div>
    </div>
  </div>`;
}
