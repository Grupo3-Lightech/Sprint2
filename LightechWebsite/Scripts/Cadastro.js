function validacaoCadastro() {
    var classObj;
    var nome = inputNome.value;
    var sobrenome = inputSobrenome.value;
    var CPF = inputCPF.value;
    var dtNasc = inputDtNasc.value;
    var telCel = inputTelefoneCel.value;
    var empresa = inputEmpresa.value;
    var email = inputEmail.value;
    var senha = inputSenha.value;

    if (nome == "") {
        classObj = document.getElementById("inputNome")
        classObj.classList.remove("inputNome")
        classObj.classList.add("inputError")
    } else{
        classObj = document.getElementById("inputNome")
        classObj.classList.remove("inputError")
        classObj.classList.add("inputNome")
    };

    if (sobrenome == "") {
        classObj = document.getElementById("inputSobrenome")
        classObj.classList.remove("inputSobrenome")
        classObj.classList.add("inputError")
    } else{
        classObj = document.getElementById("inputSobrenome")
        classObj.classList.remove("inputError")
        classObj.classList.add("inputSobrenome")
    };

    if (CPF == "") {
        classObj = document.getElementById("inputCPF")
        classObj.classList.remove("inputCPF")
        classObj.classList.add("inputError")
        alert("Insira seu CPF")
    } else{
        classObj = document.getElementById("inputCPF")
        classObj.classList.add("inputCPF")
        classObj.classList.remove("inputError")
    }

    if (CPF.indexOf("-") == -1) {
        classObj = document.getElementById("inputCPF")
        classObj.classList.remove("inputCPF")
        classObj.classList.add("inputError")
        alert('Insira o "-" no CPF inserido')

    } else {
        classObj = document.getElementById("inputCPF")
        classObj.classList.remove("inputError")
        classObj.classList.add("inputCPF")
    };
    
    if (CPF.length != 9) {
        classObj = document.getElementById("inputCPF")
        classObj.classList.remove("inputCPF")
        classObj.classList.add("inputError")
        alert("CPF inserido incorretamente!")
    } else {
        classObj = document.getElementById("inputCPF")
        classObj.classList.remove("inputError")
        classObj.classList.add("inputCPF")
    };
    
    if (CPF[5] != "-") {
        classObj = document.getElementById("inputCPF")
        classObj.classList.remove("inputCPF")
        classObj.classList.add("inputError")
        alert("CPF inserido incorretamente!")
    } else{
        classObj = document.getElementById("inputCPF")
        classObj.classList.remove("inputError")
        classObj.classList.add("inputCPF")
    };

    if (dtNasc == "") {
        classObj = document.getElementById("inputDtNasc")
        classObj.classList.remove("inputDtNasc")
        classObj.classList.add("inputError")
        alert("Insira sua data de nascimento")
    } else{
        classObj = document.getElementById("inputDtNasc")
        classObj.classList.add("inputDtNasc")
        classObj.classList.remove("inputError")
    };

    if (telCel == "") {
        classObj = document.getElementById("inputTelefoneCel")
        classObj.classList.remove("inputTelefoneCel")
        classObj.classList.add("inputError")
        alert("Insira seu celular")
    } else{
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

    if (empresa == "") {
        classObj = document.getElementById("inputEmpresa")
        classObj.classList.remove("inputEmpresa")
        classObj.classList.add("inputError")
        alert("Insira a empresa na qual você trabalha")
    } else{
        classObj = document.getElementById("inputEmpresa")
        classObj.classList.add("inputEmpresa")
        classObj.classList.remove("inputError")
    };

    if (email == "") {
        classObj = document.getElementById("inputEmail")
        classObj.classList.remove("inputEmail")
        classObj.classList.add("inputError")
        alert("Insira seu E-mail!")
    } else{
        classObj = document.getElementById("inputEmail")
        classObj.classList.add("inputEmail")
        classObj.classList.remove("inputError")
    };

    if (senha == "") {
        classObj = document.getElementById("inputSenha")
        classObj.classList.remove("inputSenha")
        classObj.classList.add("inputError")
        alert("Crie uma senha!")
    } else{
        classObj = document.getElementById("inputSenha")
        classObj.classList.add("inputSenha")
        classObj.classList.remove("inputError")
    };

    if (senha.length < 8) {
        classObj = document.getElementById("inputSenha")
        classObj.classList.remove("inputSenha")
        classObj.classList.add("inputError")
        alert("Sua senha deve ter no mínimo 8 carecteres")
    } else{
        classObj = document.getElementById("inputSenha")
        classObj.classList.add("inputSenha")
        classObj.classList.remove("inputError")
    };
}