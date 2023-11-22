function GFuncionarios(){
    location.href = "../gestaoFuncionarios/"
}

function GEmpresas(){
    location.href = "../gestaoEmpresa/"
}

function APagamento(){
    location.href = "../agendarPagamento/"
}

function HPagamento(){
    location.href = "../historicoPagamento/"
}

function desemvolvimento(){
    location.href = "../emDesenvolvimento/"
}

function homeRh(){
    location.href = "../homeRh/"
}

document.addEventListener("DOMContentLoaded", function(){
  const sairButton = document.getElementById('logout');
  sairButton.addEventListener("click", function () {
      
    window.location.href = window.location.protocol + '//' + window.location.host + '/PIM/WEB/'
  });
});