document.addEventListener("DOMContentLoaded", function(){
  const entrarButton = document.querySelector('.btn.btn-outline-primary');

  entrarButton.addEventListener("click", function () {
    const email = $('#Email').val();
    const senha = $('#senha').val();

    const data = {
      email: email,
      senha: senha
    };

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
    fetch('http://localhost:3333/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Resposta do servidor:', data);
      if(data.autenticado === true){
        toastr.success("Login realizado!");
        if(data.rh === true){
          setTimeout(function () {
            console.log('logado');
            window.location.href = "./rh/";
          }, 3000)
        }
        if(data.rh === false){
          setTimeout(function () {
            console.log('logado');
            window.location.href = "./funcionario/";
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
});
