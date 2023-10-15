const usuariosRH = [
    {
        login: 'zeca',
        pass: '1111'
    },
    {
        login: 'marlon',
        pass: '4444'
    },

]

const usuariosFuncionarios = [
    {
        login: 'belo',
        pass: '2222'
    },
    {
        login: 'caua',
        pass: '3333'
    },

]

function logar(){
    let login = document.getElementById('usuario').value;
    let senha = document.getElementById('senha').value;
    let alert = document.getElementById('alert');
    let validarRH = false;
    let validarFuncionarios = false;

    for (let i in usuariosRH) {
        if(login == usuariosRH[i].login && senha == usuariosRH[i].pass){
            validarRH = true
            
            break
        }else{
            validarRH = false
            alert.classList.add("show");
            break
        }
      }

      for (let i in usuariosFuncionarios) {
        if(login == usuariosFuncionarios[i].login && senha == usuariosFuncionarios[i].pass){
            validarFuncionarios = true
            
            break
        }else{
            validarFuncionarios = false
            
        }
      }
    
}

function windowLocationReload(){
    window.location.reload()
}

function AReceber(){
    location.href = "a_receber.html"
}

function historicoHolerite(){
    location.href = "historico_holerite.html"
}

function historicoSalario(){
    location.href = "em_desenvolvimento.html"
}

function pontoEletronico(){
    location.href = "em_desenvolvimento.html"
}

function ferias(){
    location.href = "em_desenvolvimento.html"
}

function documentos(){
    location.href = "em_desenvolvimento.html"
}

function homeFuncionario(){
    location.href = "homeFuncionario.html"
}