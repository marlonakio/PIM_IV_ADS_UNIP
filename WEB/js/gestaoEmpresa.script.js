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

$(function()  {
  // DATATABLE
  var table = $('#empresaTable').DataTable({
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/pt-BR.json',
        },
        "ajax": {
            "url": "http://localhost:3333/empresas",
            "dataSrc": ""
        },
        "columns": [
            {
                "data": "id",
                "render": function (data, type, row) {
                    return '<input type="radio" name="empresaRadio" value="' + data + '">';
                },
                "orderable": false
            },
            { "data": "id" },
            { "data": "nome" },
            {
                "data": "cnpj",
                "render": function (data, type, row) {
                    return data ? data : '';
                }
            },
            { "data": "email" },
            {
                "data": "telefone",
                "render": function (data, type, row) {
                    return data ? data : ''; 
                }
            }
        ],
        "order": [[1, "desc"]],
        "initComplete": function() {
            $('#empresaTable tbody tr').find('td:eq(3)').inputmask('99.999.999/9999-99', { placeholder: '' }); 
            $('#empresaTable tbody tr').find('td:eq(5)').inputmask('(99) 99999-9999', { placeholder: '' });
        }
    });  

      $('#empresaTable tbody').on('click', 'tr', function () {
      selectedRowData = null;
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            selectedRowData = table.row(this).data();
            $("#editar").on("click", function() {
              $("#editNome").val(selectedRowData.nome);
              $("#editCnpj").val(selectedRowData.cnpj);
              $("#editEmail").val(selectedRowData.email);
              $("#editTelefone").val(selectedRowData.telefone);
              $("#editCnpj").mask("00.000.000/0000-00");
              $("#editTelefone").mask("(00) 00000-0000");
              $("#editEmpresaModal").modal("show");
           });
        }
    });

  //ADICIONAR EMPRESA
    $("#cnpj").mask("00.000.000/0000-00");
    $("#telefone").mask("(00) 00000-0000");

    var $nome = $("#nome");
    var $cnpj = $("#cnpj");
    var $email = $("#email");
    var $telefone = $("#telefone");
    var $addEmpresaButton = $("#addEmpresaButton");

    function checkFormValidity() {
        var nomeValue = $nome.val().trim();
        var cnpjValue = $cnpj.val().replace(/[^0-9]/g, '');
        var emailValue = $email.val().trim();
        var telefoneValue = $telefone.val().replace(/[^0-9]/g, '');

        $addEmpresaButton.prop("disabled", !(nomeValue && cnpjValue && emailValue && telefoneValue));
    }

    $nome.on("input", checkFormValidity);
    $cnpj.on("input", checkFormValidity);
    $email.on("input", checkFormValidity);
    $telefone.on("input", checkFormValidity);

    $addEmpresaButton.on("click", function() {
    var nome = $nome.val();
    var cnpj = $cnpj.val().replace(/[^0-9]/g, '');
    var email = $email.val();
    var telefone = $telefone.val().replace(/[^0-9]/g, '');

    var empresaData = {
        "nome": nome,
        "cnpj": cnpj,
        "email": email,
        "telefone": telefone
    };

    $.ajax({
        type: "POST",
        url: "http://localhost:3333/empresas",
        data: JSON.stringify(empresaData),
        contentType: "application/json",
        success: function(response) {
          $("#addEmpresaModal").modal("hide");
          toastr.success("Empresa cadastrada!");
          setTimeout(function () {
            window.location.reload();
          }, 3000)
        },
        error: function(xhr, status, error) {
            toastr.error("Erro ao cadastrar empresa.");
        }
    });
  });

  //EDITAR EMRPESA
    $("#saveEdit").on("click", function() {
    var id = $("input[name='empresaRadio']:checked").val();
    var nome = $("#editNome").val();
    var cnpj = $("#editCnpj").val().replace(/[^0-9]/g, '');
    var email = $("#editEmail").val();
    var telefone = $("#editTelefone").val().replace(/[^0-9]/g, '');

    var data = {
        "nome": nome,
        "cnpj": cnpj,
        "email": email,
        "telefone": telefone
    };

    $.ajax({
        type: "PATCH",
        url: "http://localhost:3333/empresas/" + id,
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(response) {
          $("#editEmpresaModal").modal("hide");
          toastr.success("Dados atualizados!");
          setTimeout(function () {
            window.location.reload();
          }, 3000)
        },
        error: function(xhr, status, error) {
            toastr.error("Não foi possível atualizar!");
        }
    });
  });


  //EXCLUIR EMRPESA
    $("#excluir").on("click", function() {
    var id = $("input[name='empresaRadio']:checked").val();

    var data = {
        "id": id
    };

    $.ajax({
        type: "DELETE",
        url: "http://localhost:3333/empresas/" + id,
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(response) {
          $("#editEmpresaModal").modal("hide");
          toastr.success("Empresa excluida!");
          setTimeout(function () {
            window.location.reload();
          }, 3000)
        },
        error: function(xhr, status, error) {
            toastr.error("Não foi possível excluir!");
        }
    });
  });



});
  