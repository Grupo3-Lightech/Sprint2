var menuItem = document.querySelectorAll('.item-menu');
var expandirList = document.querySelector('#expandir-list');
var menuSite = document.querySelector('.menu-lateral');

function selectLink() {
    menuItem.forEach((item) =>
        item.classList.remove('ativo')
    );
    this.classList.add('ativo');
}

menuItem.forEach((item) =>
    item.addEventListener('click', selectLink)
);

// EXPANDIR o menu list

expandirList.addEventListener('click', function () {
    menuSite.classList.toggle('expandir');
    // expandirList.classList.toggle('expandir');
})
let proximaAtualizacao;

window.onload = obterDadosGraficos();

function obterDadosGraficos() {
    obterDadosGrafico(1)
    //obterDadosGrafico(2)
    // obterDadosGrafico(3)
    // obterDadosGrafico(4)
}

function obterDadosGraficos(idAquario) {

    // alterarTitulo(idAquario)

    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/medidas/buscarMedidasLocal/${idAquario}`, { cache: 'no-store' }).then(function(response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico(resposta, idAquario);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}


function plotarGrafico(resposta, idAquario) {

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];
    var cor = [];

    

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [
            {
                label: "Locais",
                data: [],
                borderWidth: 1,
                backgroundColor: cor
            }
        ],
    };

    

    

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        var valor = registro["round(avg(leitura))"]
        labels.push(registro.localEmpresa);
        dados.datasets[0].data.push(valor);

        if (valor >= 1000) {
            cor.push('#FF0000') 
        } else if (valor >= 800 && valor < 1000) {
            cor.push('#EB9B0D')
        } else if (valor >= 700 && valor < 800) {
            cor.push('#0CA80C')
        } else if (valor > 500 && valor < 700) {
            cor.push('#FFFF00')
        } else if (valor <= 500) {
            cor.push('#FC7A46') 
        }
    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: 'bar',
        data: dados,
    };

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        document.getElementById(`myChart1`),
        config
    );

    setTimeout(() => atualizarGrafico(idAquario, dados, myChart), 2000);
}

// function atualizarGrafico(idAquario, dados, myChart) {
// console.log(idAquario)


//     fetch(`/medidas/tempo-real/${idAquario}`, { cache: 'no-store' }).then(function (response) {
//         if (response.ok) {
//             response.json().then(function (novoRegistro) {

//                 console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
//                 console.log(`Dados atuais do gráfico:`);
//                 console.log(dados);

//                 // let avisoCaptura = document.getElementById(`avisoCaptura${idAquario}`)
//                 // avisoCaptura.innerHTML = ""


//                 if (novoRegistro[0]["DATE_FORMAT(dataHora,'%d/%c/%Y %H:%i:%s')"] == dados.labels[dados.labels.length - 1]) {
//                     console.log("---------------------------------------------------------------")
//                     console.log("Como não há dados novos para captura, o gráfico não atualizará.")
//                     // avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
//                     console.log("Horário do novo dado capturado:")
//                     console.log(novoRegistro[0]["DATE_FORMAT(dataHora,'%d/%c/%Y %H:%i:%s')"])
//                     console.log("Horário do último dado capturado:")
//                     console.log(dados.labels[dados.labels.length - 1])
//                     console.log("---------------------------------------------------------------")
//                 } else {
//                     // tirando e colocando valores no gráfico
//                     dados.labels.shift(novoRegistro); // apagar o primeiro
//                     dados.labels.push(novoRegistro[0]["DATE_FORMAT(dataHora,'%d/%c/%Y %H:%i:%s')"]); // incluir um novo momento

//                     dados.datasets[0].data.shift(novoRegistro);  // apagar o primeiro de umidade
//                     dados.datasets[0].data.push(novoRegistro[0].leitura); // incluir uma nova medida de umidade
                    
//                     if (idAquario == 1) {
//                         if (novoRegistro[0].leitura < 500) {
//                             graphic1.innerHTML = `<div class="alertaCritc">Crítico (abaixo)</div>`
//                         } else if (novoRegistro[0].leitura >= 500 && novoRegistro[0].leitura <= 700) {
//                             graphic1.innerHTML = `<div class="alertaAjustavel1">Ajustável</div>`
//                         } else if (novoRegistro[0].leitura > 700 && novoRegistro[0].leitura <= 800) {
//                             graphic1.innerHTML = `<div class="alertaIdeal">Ideal</div>`
//                         } else if (novoRegistro[0].leitura > 800 && novoRegistro[0].leitura <= 900) {
//                             graphic1.innerHTML = `<div class="alertaAjustavel">Ajustável</div>`
//                         } else if (novoRegistro[0].leitura > 800) {
//                             graphic1.innerHTML = `<div class="alertaCritico">Crítico (Acima)</div>`
//                         }
//                     }
//                     if (idAquario == 2) {
//                         if (novoRegistro[0].leitura < 500) {
//                             graphic2.innerHTML = `<div class="alertaCritc">Crítico (abaixo)</div>`
//                         } else if (novoRegistro[0].leitura >= 500 && novoRegistro[0].leitura <= 700) {
//                             graphic2.innerHTML = `<div class="alertaAjustavel1">Ajustável</div>`
//                         } else if (novoRegistro[0].leitura > 700 && novoRegistro[0].leitura <= 800) {
//                             graphic2.innerHTML = `<div class="alertaIdeal">Ideal</div>`
//                         } else if (novoRegistro[0].leitura > 800 && novoRegistro[0].leitura <= 900) {
//                             graphic2.innerHTML = `<div class="alertaAjustavel">Ajustável</div>`
//                         } else if (novoRegistro[0].leitura > 800) {
//                             graphic2.innerHTML = `<div class="alertaCritico">Crítico (Acima)</div>`
//                         }
//                     }

//                     // dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
//                     // dados.datasets[1].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

//                     myChart.update();
//                 }



//                 // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
//                 proximaAtualizacao = setTimeout(() => atualizarGrafico(idAquario, dados, myChart), 2000);
//             });
//         } else {
//             console.error('Nenhum dado encontrado ou erro na API');
//             // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
//             proximaAtualizacao = setTimeout(() => atualizarGrafico(idAquario, dados, myChart), 2000);
//         }
//     })
//         .catch(function (error) {
//             console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
//         });

// }