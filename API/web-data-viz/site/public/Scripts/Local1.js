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
    obterDadosGrafico(2)
    obterDadosGrafico(3)
    // obterDadosGrafico(4)
}

function obterDadosGrafico(idAquario) {

    // alterarTitulo(idAquario)

    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/medidas/ultimas/${idAquario}`, { cache: 'no-store' }).then(function (response) {
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
fetch(`/medidas/buscarMedidasLocal/${idAquario}`, { cache: 'no-store' }).then(function (response) {
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


function plotarGrafico(resposta, idAquario) {

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [
            {
                label: `${idAquario}`,
                data: [],
                borderWidth: 1,
            }
        ],
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro["DATE_FORMAT(dataHora,'%d/%c/%Y %H:%i:%s')"]);
        dados.datasets[0].data.push(registro.leitura);

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
        type: 'line',
        data: dados,
    };

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        document.getElementById(`myChart${idAquario}`),
        config
    );

    setTimeout(() => atualizarGrafico(idAquario, dados, myChart), 2000);
}

function atualizarGrafico(idAquario, dados, myChart) {
console.log(idAquario)


    fetch(`/medidas/tempo-real/${idAquario}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dados);

                // let avisoCaptura = document.getElementById(`avisoCaptura${idAquario}`)
                // avisoCaptura.innerHTML = ""


                if (novoRegistro[0]["DATE_FORMAT(dataHora,'%d/%c/%Y %H:%i:%s')"] == dados.labels[dados.labels.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
                    // avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0]["DATE_FORMAT(dataHora,'%d/%c/%Y %H:%i:%s')"])
                    console.log("Horário do último dado capturado:")
                    console.log(dados.labels[dados.labels.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {
                    // tirando e colocando valores no gráfico
                    dados.labels.shift(novoRegistro); // apagar o primeiro
                    dados.labels.push(novoRegistro[0]["DATE_FORMAT(dataHora,'%d/%c/%Y %H:%i:%s')"]); // incluir um novo momento

                    dados.datasets[0].data.shift(novoRegistro);  // apagar o primeiro de umidade
                    dados.datasets[0].data.push(novoRegistro[0].leitura); // incluir uma nova medida de umidade
                    
                    if (idAquario == 1) {
                        if (novoRegistro[0].leitura < 500) {
                            graphic1.innerHTML = `<div class="alertaCritc">Crítico (abaixo)</div>`
                        } else if (novoRegistro[0].leitura >= 500 && novoRegistro[0].leitura <= 700) {
                            graphic1.innerHTML = `<div class="alertaAjustavel1">Ajustável</div>`
                        } else if (novoRegistro[0].leitura > 700 && novoRegistro[0].leitura <= 800) {
                            graphic1.innerHTML = `<div class="alertaIdeal">Ideal</div>`
                        } else if (novoRegistro[0].leitura > 800 && novoRegistro[0].leitura <= 900) {
                            graphic1.innerHTML = `<div class="alertaAjustavel">Ajustável</div>`
                        } else if (novoRegistro[0].leitura > 800) {
                            graphic1.innerHTML = `<div class="alertaCritico">Crítico (Acima)</div>`
                        }
                    }
                    if (idAquario == 2) {
                        if (novoRegistro[0].leitura < 500) {
                            graphic2.innerHTML = `<div class="alertaCritc">Crítico (abaixo)</div>`
                        } else if (novoRegistro[0].leitura >= 500 && novoRegistro[0].leitura <= 700) {
                            graphic2.innerHTML = `<div class="alertaAjustavel1">Ajustável</div>`
                        } else if (novoRegistro[0].leitura > 700 && novoRegistro[0].leitura <= 800) {
                            graphic2.innerHTML = `<div class="alertaIdeal">Ideal</div>`
                        } else if (novoRegistro[0].leitura > 800 && novoRegistro[0].leitura <= 900) {
                            graphic2.innerHTML = `<div class="alertaAjustavel">Ajustável</div>`
                        } else if (novoRegistro[0].leitura > 800) {
                            graphic2.innerHTML = `<div class="alertaCritico">Crítico (Acima)</div>`
                        }
                    }

                    if (idAquario == 3) {
                        if (novoRegistro[0].leitura < 500) {
                            graphic3.innerHTML = `<div class="alertaCritc">Crítico (abaixo)</div>`
                        } else if (novoRegistro[0].leitura >= 500 && novoRegistro[0].leitura <= 700) {
                            graphic3.innerHTML = `<div class="alertaAjustavel1">Ajustável</div>`
                        } else if (novoRegistro[0].leitura > 700 && novoRegistro[0].leitura <= 800) {
                            graphic3.innerHTML = `<div class="alertaIdeal">Ideal</div>`
                        } else if (novoRegistro[0].leitura > 800 && novoRegistro[0].leitura <= 900) {
                            graphic3.innerHTML = `<div class="alertaAjustavel">Ajustável</div>`
                        } else if (novoRegistro[0].leitura > 800) {
                            graphic3.innerHTML = `<div class="alertaCritico">Crítico (Acima)</div>`
                        }
                    }

                    // dados.datasets[1].data.shift();  // apagar o primeiro de temperatura
                    // dados.datasets[1].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

                    myChart.update();
                }



                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGrafico(idAquario, dados, myChart), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGrafico(idAquario, dados, myChart), 2000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function adicionarLocal(local) {
    local = document.getElementById("graficosLocais");

    local.innerHTML =
    `
    <div class="grafics">
    <div class="type_line1" id>
      <div class="alertasgrafc1" id="typeLine1">
      <!-- <div class="alertaCritc">Crítico (abaixo)</div>
      <div class="alertaCritico">Crítico (Acima)</div> -->
    </div>
    <div class="line1">
        <div id="graphic1"></div>
           <p style="display: flex; align-items: center; justify-content: center;"><b>Monitoramento na Sala 3</b></p>
           <canvas id="myChart1"></canvas>
         </div>
    </div>
</div>
  `

    obterDadosGraficos(1)
    plotarGrafico()
    atualizarGrafico()

  //   local.innerHTML =
  //     `
  //       <div class="type_line2">
  //         <div class="alertaAjustavel">  Ajustável </div>
  //         <div class="lineThree">
  //           <p><b>Sala de Reuniões 12º andar - Luminosidade Ajustável nas ultimas 24h</b></p>
  //           <canvas id="myChart3"></canvas>
  //         </div>
  //   `

  //   const ctx3 = document.getElementById("myChart3");

  //   new Chart(ctx3, {
  //     type: "line",
  //     data: {
  //       labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00",
  //         "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
  //       ],
  //       datasets: [
  //         {
  //           label: " Sala 3",
  //           data: [
  //             500, 550, 620, 644, 666, 680, 690, 700, 850, 850, 820, 650, 500,
  //             600, 800, 850, 590, 750, 800, 780, 450, 500, 500, 500,
  //           ],
  //           borderWidth: 1,
  //           backgroundColor: "rgb(235, 155, 13)",
  //           borderColor: "rgb(235, 155, 13)",
  //         },
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   });
  };

  function adicionarLocal2(local) {
    local = document.getElementById("graficosLocais");

    local.innerHTML =
    `
    <div class="grafics">
    <div class="type_line2" id="typeLine2">
      <!-- <div class="alertaAjustavel">Ajustável</div> -->
      <div class="line2">
        <div id="graphic2"></div>
        <p style="display: flex; align-items: center; justify-content: center;"><b>Monitoramento Sala de reunião</b></p>
        <canvas id="myChart2"></canvas>
      </div>
    </div>
</div>
  `

    obterDadosGraficos(2)
    plotarGrafico()
    atualizarGrafico()

  //   local.innerHTML =
  //     `
  //       <div class="type_line2">
  //         <div class="alertaAjustavel">  Ajustável </div>
  //         <div class="lineThree">
  //           <p><b>Sala de Reuniões 12º andar - Luminosidade Ajustável nas ultimas 24h</b></p>
  //           <canvas id="myChart3"></canvas>
  //         </div>
  //   `

  //   const ctx3 = document.getElementById("myChart3");

  //   new Chart(ctx3, {
  //     type: "line",
  //     data: {
  //       labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00",
  //         "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
  //       ],
  //       datasets: [
  //         {
  //           label: " Sala 3",
  //           data: [
  //             500, 550, 620, 644, 666, 680, 690, 700, 850, 850, 820, 650, 500,
  //             600, 800, 850, 590, 750, 800, 780, 450, 500, 500, 500,
  //           ],
  //           borderWidth: 1,
  //           backgroundColor: "rgb(235, 155, 13)",
  //           borderColor: "rgb(235, 155, 13)",
  //         },
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   });
  };

  function adicionarLocal3(local) {
    local = document.getElementById("graficosLocais");

    local.innerHTML =
    `
    <div class="grafics">
    <div class="type_line3" id="typeLine3">
      <!-- <div class="alertaAjustavel">Ajustável</div> -->
      <div class="line3">
        <div id="graphic3"></div>
        <p style="display: flex; align-items: center; justify-content: center;"><b>Monitoramento Escritório</b></p>
        <canvas id="myChart3"></canvas>
      </div>
    </div>
</div>
  `

    obterDadosGraficos(2)
    plotarGrafico()
    atualizarGrafico()

  //   local.innerHTML =
  //     `
  //       <div class="type_line2">
  //         <div class="alertaAjustavel">  Ajustável </div>
  //         <div class="lineThree">
  //           <p><b>Sala de Reuniões 12º andar - Luminosidade Ajustável nas ultimas 24h</b></p>
  //           <canvas id="myChart3"></canvas>
  //         </div>
  //   `

  //   const ctx3 = document.getElementById("myChart3");

  //   new Chart(ctx3, {
  //     type: "line",
  //     data: {
  //       labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00",
  //         "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
  //       ],
  //       datasets: [
  //         {
  //           label: " Sala 3",
  //           data: [
  //             500, 550, 620, 644, 666, 680, 690, 700, 850, 850, 820, 650, 500,
  //             600, 800, 850, 590, 750, 800, 780, 450, 500, 500, 500,
  //           ],
  //           borderWidth: 1,
  //           backgroundColor: "rgb(235, 155, 13)",
  //           borderColor: "rgb(235, 155, 13)",
  //         },
  //       ],
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //         },
  //       },
  //     },
  //   });
  };