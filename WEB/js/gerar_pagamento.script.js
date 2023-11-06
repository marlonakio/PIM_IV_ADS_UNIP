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
    
    
    // $('#funcionarioTable tbody').on('click', 'tr', function () {
    // selectedRowData = null;
    //   if ($(this).hasClass('selected')) {
    //       $(this).removeClass('selected');
    //   } else {
    //       table.$('tr.selected').removeClass('selected');
    //       $(this).addClass('selected');
    //       selectedRowData = table.row(this).data();
    //       // console.log(selectedRowData);
    //       $("#editar").on("click", function() {
    //       //  console.log(selectedRowData)
    //         $("#editNome").val(selectedRowData.nome);
    //         $("#editCpf").val(selectedRowData.cpf);
    //         $("#editEmail").val(selectedRowData.email);
    //         $("#editTelefone").val(selectedRowData.telefone);
    //         $("#editCargo").val(selectedRowData.cargo);
    //         $("#editHoraPrevista").val(selectedRowData.hora_prevista);
    //         $("#editSalario").val(selectedRowData.salario);
    //         $("#editFuncionarioModal").modal("show");
    //       });
    //     }
    //   })
    }
    getEmpresas();



//   //ADICIONAR funcionario
//   $("#cpf").mask("000.000.000-00");
//   $("#telefone").mask("(00) 00000-0000");
  
//   var $nome = $("#nome");
//   var $cpf = $("#cpf");
//   var $email = $("#email");
//   var $telefone = $("#telefone");
//   var $cargo = $("#cargo");
//   var $horasPrevistas = $("#horasPrevistas");
//   var $salario = $("#salario");
//   var $addFuncionarioButton = $("#addFuncionarioButton");
//   function checkFormValidity() {
//     var nomeValue = $nome.val().trim();
//     var cpfValue = $cpf.val().replace(/[^0-9]/g, '');
//     var emailValue = $email.val().trim();
//     var telefoneValue = $telefone.val().replace(/[^0-9]/g, '');
//     var cargoValue = $cargo.val().trim();
//     var horasPrevistaseValue = $horasPrevistas.val().replace(/[^0-9]/g, '');
//     var salarioValue = $salario.val().replace(/[^0-9]/g, '');
//     $addFuncionarioButton.prop("disabled", !(nomeValue && cpfValue && emailValue && telefoneValue && cargoValue && horasPrevistaseValue && salarioValue));
//   }
//   $nome.on("input", checkFormValidity);
//   $cpf.on("input", checkFormValidity);
//   $email.on("input", checkFormValidity);
//   $telefone.on("input", checkFormValidity);
//   $cargo.on("input", checkFormValidity);
//   $horasPrevistas.on("input", checkFormValidity);
//   $salario.on("input", checkFormValidity);
//   $addFuncionarioButton.on("click", function() {
//     let nome = $nome.val();
//     let cpf = $cpf.val().replace(/[^0-9]/g, '');
//     cpf = parseInt(cpf);
//     let email = $email.val();
//     let telefone = $telefone.val().replace(/[^0-9]/g, '');
//     telefone = parseInt(telefone);
//     let empresa_id = parseInt($('#selectEmpresa').val());
//     let cargo = $cargo.val();
//     let horasPrevistas = parseFloat($horasPrevistas.val());
//     let salario = parseFloat($salario.val()); 
//     let FuncionarioData = {
//         "nome": nome,
//         "cpf": cpf,
//         "email": email,
//         "telefone": telefone,
//         "empresa_id": empresa_id,
//         "cargo": cargo,
//         "hora_prevista": horasPrevistas,
//         "salario": salario
//     };
//     // console.log(FuncionarioData);
//     $.ajax({
//       type: "POST",
//       url: "http://localhost:3333/funcionarios",
//       data: JSON.stringify(FuncionarioData),
//       contentType: "application/json",
//       success: function(response) {
//         $("#addFuncionarioModal").modal("hide");
//           toastr.success("Funcionario cadastrada!");
//           setTimeout(function () {
//             window.location.reload();
//           }, 3000)
//         },
//       error: function(xhr, status, error) {
//           toastr.error("Erro ao cadastrar funcionario.");
//       }
//     });
//   });


//   // EDITAR EMRPESA
//   $("#saveEdit").on("click", function() {
//     var id = $("input[name='empresaRadio']:checked").val();
//     var nome = $("#editNome").val();
//     var cpf = $("#editCpf").val().replace(/[^0-9]/g, '');
//     var email = $("#editEmail").val();
//     var telefone = $("#editTelefone").val().replace(/[^0-9]/g, '');
//     var cargo = $("#editCargo").val();
//     var hora_prevista = $("#editHoraPrevista").val();
//     var salario = $("#editSalario").val();

//     var data = {
//       "nome": nome,
//       "cpf": cpf,
//       "email": email,
//       "telefone": telefone,
//       "cargo": cargo,
//       "hora_prevista": parseFloat(hora_prevista),
//       "salario": parseFloat(salario)
//     };
  
//     $.ajax({
//       type: "PATCH",
//       url: "http://localhost:3333/funcionarios/" + id,
//       data: JSON.stringify(data),
//       contentType: "application/json",
//       success: function(response) {
//         $("#editFuncionarioModal").modal("hide");
//         toastr.success("Dados atualizados!");
//         setTimeout(function () {
//           window.location.reload();
//         }, 3000)
//       },
//       error: function(xhr, status, error) {
//         toastr.error("Não foi possível atualizar!");
//       }
//     });
//   });


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
