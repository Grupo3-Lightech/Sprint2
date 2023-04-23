  function redirecionar() {
    var login = inputEmail.value;
    var senha = inputSenha.value;
    
    if (login == "admin@lighttech.com" && senha == "@Lighttech") {
      window.location = "../Pages/Dashboard.html"
    } else{
      alert("Seu email ou senha não estão corretos!")
    }
  }