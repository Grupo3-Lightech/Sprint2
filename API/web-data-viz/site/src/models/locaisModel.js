var database = require("../database/config");

function listar(idEmpresa) {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    
    var instrucao = `
    select LE.localEmpresa, ROUND(AVG(leitura.leitura)) as leitura from localEmpresa as LE
join sensor on idLocalEmpresa = fkLocalEmpresa
join leitura on idSensor = fkSensor
join empresa on fkEmpresa = idEmpresa
where idEmpresa = ${idEmpresa}
group by LE.localEmpresa
;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}


module.exports = {
    listar
}
