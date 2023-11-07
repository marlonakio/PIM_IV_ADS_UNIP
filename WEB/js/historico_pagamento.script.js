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

var rowData = [];

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
      let selectedMes = $('#selectMes').val();
      if (selectedEmpresaId === '' || selectedMes === '') {
        $("#selectEmpresaModal").modal("show");
        return;
      }
      $("#selectEmpresaModal").modal("hide");
      carregarTabelaFuncionarios(selectedEmpresaId, selectedMes);
    });
  }
  
  function carregarTabelaFuncionarios(empresaId, mes) {
      var table = $('#funcionarioTable').DataTable({
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/pt-BR.json',
        },
        "ajax": {
            "url": 'http://localhost:3333/historico/empresa/' + empresaId  + '/' + mes,
            "dataSrc": ""
        },
        "columns": [
            {
                "data": "funcionario_id",
                "render": function (data, type, row) {
                    return '<input type="radio" name="empresaRadio" value="' + data + '">';
                },
                "orderable": false
            },
            { "data": "funcionario_id" },
            { "data": "funcionario.nome" },
            { "data": "funcionario.cpf" },
            { "data": "empresa.nome" },
            {   
                "data": "hora_trabalhada",
                "render": function (data, type, row) {
                  return data+'Hrs' ;
                },
            },
            {   
                "data": "salario_bruto",
                "render": function (data, type, row) {
                  return 'R$'+data ;
                },
            },
        ],
        "order": [[0, "desc"]],
        "initComplete": function() {
            $('#funcionarioTable tbody tr').find('td:eq(3)').inputmask('999.999.999-99', { placeholder: '' }); 
        }
    }); 

    $('#funcionarioTable').on('change', 'input[type="radio"]', function () {
      if (this.checked) {
        rowData = table.row($(this).parents('tr')).data();
      }
    });
    
    }
    getEmpresas();
  

  //PESQUISAR NOVA EMRPESA
  $("#pesquisar").on("click", function() {
    window.location.reload();
  });
  $("#fechar_modal").on("click", function() {
    window.location.reload();
  });
  $("#fecharModal").on("click", function() {
    window.location.reload();
  });

  $("#visualizar_pagamento").on("click", function() {
    if(rowData.length == 0){
      toastr.error("Selecione um funcionário!");
          setTimeout(function () {
            window.location.reload();
          }, 3000)
    }else{
      $("#viewPagamentoModal").modal("show");
      // console.log(rowData);
      $("#viewNome").val(rowData.funcionario.nome)
      $("#viewCPF").val(rowData.funcionario.cpf)
      $("#viewEmpresa").val(rowData.empresa.nome)
      $("#viewCNPJ").val(rowData.empresa.cnpj)
      $("#viewValor_Hora").val('R$'+rowData.valor_hora)
      $("#viewCargo").val(rowData.funcionario.cargo)
      $("#viewHoras_Trabalhadas").val(rowData.hora_trabalhada+'Hrs')
      $("#viewSalario_Bruto").val('R$'+rowData.salario_bruto)
      $("#viewDesconto_INSS").val('R$'+rowData.desc_inss)
      $("#viewSalario_Liquido").val('R$'+rowData.salario_liqui)
      $("#viewDesconto_IR").val('R$'+ rowData.desc_ir)
      $("#viewData").val(rowData.data)
    }
  });
});
