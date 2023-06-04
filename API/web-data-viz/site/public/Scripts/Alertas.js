var alertas = [];

function obterdados(idAquario) {
    fetch(`/medidas/buscarMedidasLocal/${idAquario}`)
        .then(resposta => {

            if (resposta.ok) {
                resposta.json().then(resposta => {

                    console.log(`Dados Pro alerta: ${JSON.stringify(resposta)}`);

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
    var temp = resposta[0]["round(avg(leitura))"];
    var local = resposta[0].localEmpresa

    console.log(local)
    console.log(temp)
    
    var grauDeAviso ='';


    var limites = {
        muito_quente: 900,
        quente: 800,
        ideal: 700,
        frio: 600,
        muito_frio: 500
    };

    var classe_temperatura = 'cor-alerta';

    if (temp > limites.muito_quente) {
        classe_temperatura = 'cor-alerta perigo-quente';
        grauDeAviso = 'perigo quente'
        grauDeAvisoCor = 'cor-alerta perigo-quente'
        exibirAlerta(temp, local, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.muito_quente && temp >= limites.quente) {
        classe_temperatura = 'cor-alerta alerta-quente';
        grauDeAviso = 'alerta quente'
        grauDeAvisoCor = 'cor-alerta alerta-quente'
        exibirAlerta(temp, local, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp < limites.quente && temp > limites.frio) {
        classe_temperatura = 'cor-alerta ideal';
        removerAlerta(local);
    }
    else if (temp <= limites.frio && temp > limites.muito_frio) {
        classe_temperatura = 'cor-alerta alerta-frio';
        grauDeAviso = 'alerta frio'
        grauDeAvisoCor = 'cor-alerta alerta-frio'
        exibirAlerta(temp, local, grauDeAviso, grauDeAvisoCor)
    }
    else if (temp <= limites.muito_frio) {
        classe_temperatura = 'cor-alerta perigo-frio';
        grauDeAviso = 'perigo frio'
        grauDeAvisoCor = 'cor-alerta perigo-frio'
        exibirAlerta(temp, local, grauDeAviso, grauDeAvisoCor)
    }

    var card;

    // if (idAquario == 1) {
    //     temp_aquario_1.innerHTML = temp + "°C";
    //     card = card_1}
    // } else if (idAquario == 2) {
    //     temp_aquario_2.innerHTML = temp + "°C";
    //     card = card_2
    // } else if (idAquario == 3) {
    //     temp_aquario_3.innerHTML = temp + "°C";
    //     card = card_3
    // } else if (idAquario == 4) {
    //     temp_aquario_4.innerHTML = temp + "°C";
    //     card = card_4
    // }

    // card.class = classe_temperatura;
}

function exibirAlerta(temp, local, grauDeAviso, grauDeAvisoCor) {
    var indice = alertas.findIndex(item => item.local == local);

    if (indice >= 0) {
        alertas[indice] = { local, temp, grauDeAviso, grauDeAvisoCor }
    } else {
        alertas.push({ local, temp, grauDeAviso, grauDeAvisoCor });
    }

    exibirCards(temp, local);
    
// Dentro da div com classe grauDeAvisoCor há um caractere "invisível", 
// que pode ser inserido clicando com o seu teclado em alt+255 ou pelo código adicionado acima.
}

function removerAlerta(local) {
    alertas = alertas.filter(item => item.local != local);
    exibirCards();
}
 
function exibirCards(temp, local) {
    alerta.innerHTML = '';

    for (var i = 0; i < alertas.length; i++) {
        var mensagem = alertas[i];
        alerta.innerHTML += transformarEmDiv(temp, local);
    }
}

function transformarEmDiv( local, temp, grauDeAviso, grauDeAvisoCor ) {
    return `<div class="mensagem-alarme">
    <div class="informacao">
    <div class="${grauDeAvisoCor}">&#12644;</div> 
     <h3>Aquário ${local} está em estado de ${grauDeAviso}!</h3>
    <small>Luminisidade ${temp}.</small>   
    </div>
    <div class="alarme-sino"></div>
    </div>`;
}
