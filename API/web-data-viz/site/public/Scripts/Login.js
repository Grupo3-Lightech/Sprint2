function redirecionar() {

  var emailVar = inputEmail.value;
  var senhaVar = inputSenha.value;

  console.log("FORM LOGIN: ", emailVar);
  console.log("FORM SENHA: ", senhaVar);

  fetch("/usuarios/autenticar", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          emailServer: emailVar,
          senhaServer: senhaVar
      })
  }).then(function (resposta) {
      console.log("ESTOU NO THEN DO entrar()!")

      if (resposta.ok) {
          console.log(resposta);

          resposta.json().then(json => {
              console.log(json);
              console.log(JSON.stringify(json));

              sessionStorage.EMAIL_USUARIO = json.email;
              sessionStorage.NOME_USUARIO = json.nome;
              sessionStorage.ID_USUARIO = json.idUsuario;
              sessionStorage.EMPRESA_USUARIO = json.fkEmpresa;

              window.location = "../Pages/Dashboard/Dashboard.html";

          });

      } else {
        alert("Email ou senha estão incorretos.")
      }

  }).catch(function (erro) {
      console.log(erro);
  })

  return false;
}