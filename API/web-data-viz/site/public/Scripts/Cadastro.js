
var classObj;
var nome;
var sobrenome; 
var CPF; 
var dtNasc; 
var telCel; 
var empresa; 
var email; 
var senha; 

function validacaoCadastro() {
    nome = inputNome.value
    sobrenome = inputSobrenome.value;
    CPF = inputCPF.value;
    dtNasc = inputDtNasc.value;
    telCel = inputTelefoneCel.value;
    empresa = inputEmpresa.value;
    email = inputEmail.value;
    senha = inputSenha.value;

    if (nome == "") {
        classObj = document.getElementById("inputNome")
        classObj.classList.remove("inputNome")
        classObj.classList.add("inputError")
        alert("Insira seu nome")
    } else {
        classObj = document.getElementById("inputNome")
        classObj.classList.remove("inputError")
        classObj.classList.add("inputNome")
    };

    if (sobrenome == "") {
        classObj = document.getElementById("inputSobrenome")
        classObj.classList.remove("inputSobrenome")
        classObj.classList.add("inputError")
        alert("Insira seu sobrenome")
    } else {
        classObj = document.getElementById("inputSobrenome")
        classObj.classList.remove("inputError")
        classObj.classList.add("inputSobrenome")
    };

    if (CPF == "") {
        classObj = document.getElementById("inputCPF")
        classObj.classList.remove("inputCPF")
        classObj.classList.add("inputError")
        alert("Insira seu CPF")
    } else {
        classObj = document.getElementById("inputCPF")
        classObj.classList.add("inputCPF")
        classObj.classList.remove("inputError")
    };

    if (CPF[3] != "." || CPF[7] != "." || CPF[11] != "-") {
        classObj = document.getElementById("inputCPF")
        classObj.classList.remove("inputCPF")
        classObj.classList.add("inputError")
        alert("Insira a pontuação no CPF")
    } else {
        classObj = document.getElementById("inputCPF")
        classObj.classList.add("inputCPF")
        classObj.classList.remove("inputError")
    };

    if (dtNasc == "") {
        classObj = document.getElementById("inputDtNasc")
        classObj.classList.remove("inputDtNasc")
        classObj.classList.add("inputError")
        alert("Insira sua data de nascimento")
    } else {
        classObj = document.getElementById("inputDtNasc")
        classObj.classList.add("inputDtNasc")
        classObj.classList.remove("inputError")
    };

    if (telCel == "") {
        classObj = document.getElementById("inputTelefoneCel")
        classObj.classList.remove("inputTelefoneCel")
        classObj.classList.add("inputError")
        alert("Insira seu celular")
    } else {
        classObj = document.getElementById("inputTelefoneCel")
        classObj.classList.add("inputTelefoneCel")
        classObj.classList.remove("inputError")
    };

    if (telCel[0] != "(" && telCel[2] != ")" && telCel[9] != "-") {
        classObj = document.getElementById("inputTelefoneCel")
        classObj.classList.remove("inputTelefoneCel")
        classObj.classList.add("inputError")
        alert("Insira os caracteres no número")
    } else {
        classObj = document.getElementById("inputTelefoneCel")
        classObj.classList.add("inputTelefoneCel")
        classObj.classList.remove("inputError")
    };

    if (telCel.length != 14) {
        classObj = document.getElementById("inputTelefoneCel")
        classObj.classList.remove("inputTelefoneCel")
        classObj.classList.add("inputError")
        alert("Celular inserido incorretamente")
    } else {
        classObj = document.getElementById("inputTelefoneCel")
        classObj.classList.add("inputTelefoneCel")
        classObj.classList.remove("inputError")
    };

    // if (empresa == "") {
    //     classObj = document.getElementById("inputEmpresa")
    //     classObj.classList.remove("inputEmpresa")
    //     classObj.classList.add("inputError")
    //     alert("Insira a empresa na qual você trabalha")
    // } else {
    //     classObj = document.getElementById("inputEmpresa")
    //     classObj.classList.add("inputEmpresa")
    //     classObj.classList.remove("inputError")
    // };

    if (email == "") {
        classObj = document.getElementById("inputEmail")
        classObj.classList.remove("inputEmail")
        classObj.classList.add("inputError")
        alert("Insira seu E-mail!")
    } else {
        classObj = document.getElementById("inputEmail")
        classObj.classList.add("inputEmail")
        classObj.classList.remove("inputError")
    };

    if (senha == "") {
        classObj = document.getElementById("inputSenha")
        classObj.classList.remove("inputSenha")
        classObj.classList.add("inputError")
        alert("Crie uma senha!")
    } else {
        classObj = document.getElementById("inputSenha")
        classObj.classList.add("inputSenha")
        classObj.classList.remove("inputError")
    };

    if (senha.length < 8) {
        classObj = document.getElementById("inputSenha")
        classObj.classList.remove("inputSenha")
        classObj.classList.add("inputError")
        alert("Sua senha deve ter no mínimo 8 carecteres")
    } else {
        classObj = document.getElementById("inputSenha")
        classObj.classList.add("inputSenha")
        classObj.classList.remove("inputError")
    };

    if (document.getElementsByClassName("inputError").length > 0) {
        
    } else{
        window.location = "../Pages/Login.html"
    }
}

function cadastrar() {
    validacaoCadastro();



    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    nome = inputNome.value
    sobrenome = inputSobrenome.value;
    CPF = inputCPF.value;
    dtNasc = inputDtNasc.value;
    telCel = inputTelefoneCel.value;
    // empresa = inputEmpresa.value;
    email = inputEmail.value;
    senha = inputSenha.value;


    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            nomeServer: nome,
            sobrenomeServer: sobrenome,
            emailServer: email,
            senhaServer: senha,
            cpfServer: CPF,
            dtNascServer: dtNasc,
            telCelServer: telCel,
            // empresaServer: empresa
        })
    }).then(function (resposta) {

        console.log("resposta: ", resposta);

        if (resposta.ok) {
            
            console.log(resposta);

            setTimeout(() => {
                window.location = "../Pages/Login.html";
            }, "2000")

            limparFormulario();
            finalizarAguardar();
        } else {
            throw ("Houve um erro ao tentar realizar o cadastro!");
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
    });

    return false;
}

