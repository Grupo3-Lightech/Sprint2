var alertas = [];

function obterdados(idAquario) {
    fetch(`/medidas/tempo-real/${idAquario}`)
        .then(resposta => {

            if (resposta.ok) {
                resposta.json().then(resposta => {

                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    alertar(resposta, idAquario);
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
    var Luminosidade = resposta[0].leitura;

    console.log(idAquario === resposta[0].fk_aquario)
    
    var grauDeAviso ='';


    var limites = {
        criticoAcima: 900,
        ajustavelAcima: 800,
        ideal: 700,
        ajustavelAbaixo: 500,
        criticoAbaixo: 500
    };

    var classeLuminosidade = 'cor-alerta';

    if (Luminosidade >= limites.criticoAcima) {
        classeLuminosidade = 'cor-alerta perigo-quente';
        grauDeAviso = 'perigo quente'
        grauDeAvisoCor = 'cor-alerta perigo-quente'
        exibirAlerta(Luminosidade, idAquario, grauDeAviso, grauDeAvisoCor)
    }
    else if (Luminosidade < limites.criticoAcima && Luminosidade >= limites.ajustavelAcima) {
        classeLuminosidade = 'cor-alerta alerta-quente';
        grauDeAviso = 'alerta quente'
        grauDeAvisoCor = 'cor-alerta alerta-quente'
        exibirAlerta(Luminosidade, idAquario, grauDeAviso, grauDeAvisoCor)
    }
    else if (Luminosidade < limites.ajustavelAcima && Luminosidade >= limites.ideal) {
        classeLuminosidade = 'cor-alerta ideal';
        removerAlerta(idAquario);
    }
    else if (Luminosidade <= limites.ideal && Luminosidade > limites.ajustavelAbaixo) {
        classeLuminosidade = 'cor-alerta alerta-frio';
        grauDeAviso = 'alerta frio'
        grauDeAvisoCor = 'cor-alerta alerta-frio'
        exibirAlerta(Luminosidade, idAquario, grauDeAviso, grauDeAvisoCor)
    }
    else if (Luminosidade <= limites.criticoAbaixo) {
        classeLuminosidade = 'cor-alerta perigo-frio';
        grauDeAviso = 'perigo frio'
        grauDeAvisoCor = 'cor-alerta perigo-frio'
        exibirAlerta(Luminosidade, idAquario, grauDeAviso, grauDeAvisoCor)
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

function exibirAlerta(Luminosidade, idAquario, grauDeAviso, grauDeAvisoCor) {
    var indice = alertas.findIndex(item => item.idAquario == idAquario);

    if (indice >= 0) {
        alertas[indice] = { idAquario, Luminosidade, grauDeAviso, grauDeAvisoCor }
    } else {
        alertas.push({ idAquario, Luminosidade, grauDeAviso, grauDeAvisoCor });
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
    alerta.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        alerta.innerHTML += transformarEmDiv(mensagem);
    }
}

function transformarEmDiv({ idAquario, temp, grauDeAviso, grauDeAvisoCor }) {
    return `<div class="mensagem-alarme">
    <div class="informacao">
    <div class="${grauDeAvisoCor}">&#12644;</div> 
     <h3>Aquário ${idAquario} está em estado de ${grauDeAviso}!</h3>
    <small>Temperatura ${Luminosidade}.</small>   
    </div>
    <div class="alarme-sino"></div>
    </div>`;
}
