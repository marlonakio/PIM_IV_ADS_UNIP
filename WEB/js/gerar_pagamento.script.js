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

let selectedEmpresaId = $('#selectEmpresa').val()

$(document).ready(function(){
  $("#selectEmpresaModal").modal("show");

  async function getEmpresas() {
    const empresaSelect = $('#selectEmpresa');
    
    try {
      const response = await fetch('http://localhost:3333/empresas');
      const empresas = await response.json();
      empresaSelect.empty();
      empresaSelect.append('<option value="" disabled selected>Selecione uma empresa</option>');
      empresas.forEach((empresa) => {
        empresaSelect.append(`<option value="${empresa.id}">${empresa.nome}</option>`);
      });
    } catch (error) {
      // console.error('Erro ao buscar empresas:', error);
    }

    $('#selecionarEmpresa').on('click', function() {
      let selectedEmpresaId = $('#selectEmpresa').val();
      if (selectedEmpresaId === '') {
        $("#selectEmpresaModal").modal("show");
        return;
      }
      $("#selectEmpresaModal").modal("hide");
      carregarTabelaFuncionarios(selectedEmpresaId);
    });
  }
  
  function carregarTabelaFuncionarios(empresaId) {
      var table = $('#funcionarioTable').DataTable({
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/pt-BR.json',
        },
        "ajax": {
            "url": 'http://localhost:3333/empresas/' + empresaId  + '/pagamento',
            "dataSrc": ""
        },
        "columns": [
            { "data": "funcionario_id" },
            { "data": "funcionario_nome" },
            {
                "data": "funcionario_cpf",
                "render": function (data, type, row) {
                    return data ? data : '';
                }
            },
            { "data": "nome_empresa" },
            {   
                "data": "funcionario_hora_prevista",
                "render": function (data, type, row) {
                  // return data ;
                  return '<input id="ht_'+row.funcionario_id+'" style="width:60px; border: none;" value="' + data + '">';
                },
                "orderable": false
            }
        ],
        "order": [[0, "desc"]],
    }); 
    
    }
    getEmpresas();


  //GERAR PAGAMENTO
  $("#gerar_pagamento").on("click", function() {
    var dataPost = [];
    var table = $('#funcionarioTable').DataTable();

    table.rows().every(function() {
        var data = this.data();
        var funcionarioId = data.funcionario_id;
        var htInput = $('#ht_' + funcionarioId);
        var horaTrabalhada = htInput.val();

        dataPost.push({
            "funcionario_id": funcionarioId,
            "hora_trabalhada": parseFloat(horaTrabalhada)
        });
    });

    console.log(dataPost);
    $.ajax({
      type: "POST",
      url: "http://localhost:3333/pagamentos",
      data: JSON.stringify(dataPost),
      contentType: "application/json",
      success: function(response) {
        $("#editFuncionarioModal").modal("hide");
        toastr.success("Pagamento gerado!");
        setTimeout(function () {
          window.location.reload();
        }, 3000)
      },
      error: function(xhr, status, error) {
        toastr.error("Não gerar o pagamento!");
      }
    });
  });
  

  //PESQUISAR NOVA EMRPESA
  $("#pesquisar").on("click", function() {
    window.location.reload();
  });
});
