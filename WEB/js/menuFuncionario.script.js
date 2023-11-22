function homeFuncionario(){
    location.href = "../home/"
}

function AReceber(){
    location.href = "../aReceber/"
}

function historicoHolerite(){
    location.href = "../historicoHolerite/"
}

function historicoSalarial(){
    location.href = "../historicoSalarial/"
}

function desemvolvimento(){
    location.href = "../emDesenvolvimento/"
}

document.addEventListener("DOMContentLoaded", function(){
  const sairButton = document.getElementById('logout');
  sairButton.addEventListener("click", function () {
      
    window.location.href = window.location.protocol + '//' + window.location.host + '/PIM/WEB/'
  });
}); 