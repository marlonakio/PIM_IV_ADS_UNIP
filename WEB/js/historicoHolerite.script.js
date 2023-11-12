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

localStorage.setItem("id_func", 1);
localStorage.setItem("id_empresa", 1);
var id_func = localStorage.getItem("id_func");
var id_empresa = localStorage.getItem("id_empresa");

var rowData = [];

$(document).ready(function(){  
  var table = $('#funcionarioTable').DataTable({
    language: {
        url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/pt-BR.json',
    },
    "ajax": {
        "url": 'http://localhost:3333/historico/funcionario/' + id_func,
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
          "data": "data",
          "render": function (data, type, row) {
           const dataFormatada = formatarData(data);
           return dataFormatada;
          },
      },
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
    "order": [[5, "desc"]],
    "initComplete": function() {
        $('#funcionarioTable tbody tr').find('td:eq(3)').inputmask('999.999.999-99', { placeholder: '' }); 
    }
  });
  
  $('#funcionarioTable').on('change', 'input[type="radio"]', function () {
    if (this.checked) {
      rowData = table.row($(this).parents('tr')).data();
    }
  });
    
  $("#fecharModal").on("click", function() {
    window.location.reload();
  });

  $("#fechar_modal").on("click", function() {
    window.location.reload();
  });


  $("#visualizar_pagamento").on("click", function() {
    if(rowData.length == 0){
      toastr.error("Selecione um mês!");
          setTimeout(function () {
            window.location.reload();
          }, 3000)
    }else{
      $("#viewPagamentoModal").modal("show");
      console.log('Dados da linha selecionada:', rowData);
      $("#viewNome").val(rowData.funcionario.nome);
      $("#viewCPF").val(rowData.funcionario.cpf).inputmask('999.999.999-99', { placeholder: '' });
      $("#viewEmpresa").val(rowData.empresa.nome);
      $("#viewCNPJ").val(rowData.empresa.cnpj).inputmask('99.999.999/9999-99', { placeholder: '' });
      $("#viewValor_Hora").val('R$'+rowData.valor_hora);
      $("#viewCargo").val(rowData.funcionario.cargo);
      $("#viewHoras_Trabalhadas").val(rowData.hora_trabalhada+'Hrs');
      $("#viewSalario_Bruto").val('R$'+rowData.salario_bruto);
      $("#viewDesconto_INSS").val('R$'+rowData.desc_inss);
      $("#viewSalario_Liquido").val('R$'+rowData.salario_liqui);
      $("#viewDesconto_IR").val('R$'+ rowData.desc_ir);
      $("#viewData").val(formatarData(rowData.data));
    }
  });
});


function formatarData(data) {
  const dataObj = new Date(data);
  const dia = String(dataObj.getDate()).padStart(2, '0');
  const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
  const ano = dataObj.getFullYear();

  return `${dia}/${mes}/${ano}`;
}