function getDataFromAPI() {
  return $.ajax({
    url: 'http://localhost:3333/historico/funcionario/1/chart',
    method: 'GET',
    dataType: 'json',
  });
}

function renderAreaChart(apiData) {
  var labels = apiData.map(function (entry) {
    return new Date(entry.data).toLocaleString('default', { month: 'short', year: 'numeric' });
  });

  var dataValues = apiData.map(function (entry) {
    return entry.salario_liqui;
  });

  var ctx = document.getElementById("chart_pagamentos");
  var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: "Valor",
        lineTension: 0.3,
        backgroundColor: "rgba(78, 115, 223, 0.05)",
        borderColor: "rgba(78, 115, 223, 1)",
        pointRadius: 3,
        pointBackgroundColor: "rgba(78, 115, 223, 1)",
        pointBorderColor: "rgba(78, 115, 223, 1)",
        pointHoverRadius: 3,
        pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
        pointHoverBorderColor: "rgba(78, 115, 223, 1)",
        pointHitRadius: 10,
        pointBorderWidth: 2,
        data: dataValues,
      }],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            maxTicksLimit: 5,
            padding: 10,
            callback: function(value, index, values) {
              return 'R$: ' + value;
            }
          },
        }],
      },
    },
  });
}

function renderPieChart(data) {
  var lastData = data[data.length - 1];
  var labels = Object.keys(lastData).filter(label => label !== 'data');
  var values = labels.map(label => lastData[label]);

  var labelMappings = {
    salario_liqui: 'Salario Liquido',
    desc_inss: 'Desconto INSS',
    desc_ir: 'Desconto IR',
  };

  var renamedLabels = labels.map(label => labelMappings[label]);

  var ctx = document.getElementById("chart_ultimo_pagamento");
  var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: renamedLabels,
      datasets: [{
        data: values,
        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc'],
        hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
      },
      cutoutPercentage: 80,
    },
  });
}


// Chamada AJAX usando jQuery e renderização do gráfico
getDataFromAPI().done(function(apiData) {
  renderAreaChart(apiData);
  renderPieChart(apiData);
}).fail(function(error) {
  console.error('Erro ao obter dados da API:', error);
});
