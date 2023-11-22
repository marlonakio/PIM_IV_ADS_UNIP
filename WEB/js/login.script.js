history.pushState(null, null, document.URL);
window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
});

toastr.options = {
  "closeButton": true,
  "progressBar": true,
  "positionClass": "toast-top-center",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "3000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
};

function eye(){
 let inputPass = document.getElementById("senha")
 let btnShowPass = document.getElementById("eye")
 
 if(inputPass.type === 'password'){
    inputPass.setAttribute('type', 'text')
    btnShowPass.classList.replace('bi-eye-fill', 'bi-eye-slash-fill')
 }else{
    inputPass.setAttribute('type', 'password')
    btnShowPass.classList.replace('bi-eye-slash-fill', 'bi-eye-fill')
 }

}

document.addEventListener("DOMContentLoaded", function(){
  
  const entrarButton = document.querySelector('.btn.btn-outline-primary');

  entrarButton.addEventListener("click", function () {
    const email = $('#Email').val();
    const senha = $('#senha').val();

    if (email == '' || senha == '') {
      return toastr.error("Login incorreto!");
    }

    const data = {
      email: email,
      senha: senha
    };

    fetch('http://localhost:3333/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => { 
      if(data.autenticado === true){
        localStorage.setItem("id_func", data.id_func);
        localStorage.setItem("id_empresa", data.id_empresa);
        toastr.success("Login realizado!");
        if(data.rh === true){
          setTimeout(function () {
            window.location.href = "./rh/home/";
          }, 3000)
        }
        if(data.rh === false){
          setTimeout(function () {
            window.location.href = "./funcionario/home/";
          }, 3000)
        }
      }
      if(data.autenticado === false){
        toastr.error("Login incorreto!");
      }
      })
      .catch(error => {
        console.error('Erro na solicitação:', error);
        toastr.warning("Servidor offline");
    });
  });

  document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      entrarButton.click();
    }
  });
});
