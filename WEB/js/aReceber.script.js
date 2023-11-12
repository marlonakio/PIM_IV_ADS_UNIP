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

var id_func = localStorage.getItem("id_func");
var id_empresa = localStorage.getItem("id_empresa");

$(document).ready(function () {
  $.ajax({
    url: 'http://localhost:3333/historico/funcionario/' + id_func + '/ultimo',
    method: "GET",
    success: function (data) {
      $("#viewNome").val(data[0].funcionario.nome);
      $("#viewCPF").val(data[0].funcionario.cpf).inputmask('999.999.999-99', { placeholder: '' });
      $("#viewEmpresa").val(data[0].empresa.nome);
      $("#viewCNPJ").val(data[0].empresa.cnpj).inputmask('99.999.999/9999-99', { placeholder: '' });
      $("#viewValor_Hora").val('R$'+data[0].valor_hora);
      $("#viewCargo").val(data[0].funcionario.cargo);
      $("#viewHoras_Trabalhadas").val(data[0].hora_trabalhada+'Hrs');
      $("#viewSalario_Bruto").val('R$'+data[0].salario_bruto);
      $("#viewDesconto_INSS").val('R$'+data[0].desc_inss);
      $("#viewSalario_Liquido").val('R$'+data[0].salario_liqui);
      $("#viewDesconto_IR").val('R$'+ data[0].desc_ir);
      $("#viewData").val(formatarData(data[0].data))
    },
    error: function (error) {
      toastr.error("Não possui pagamento");
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