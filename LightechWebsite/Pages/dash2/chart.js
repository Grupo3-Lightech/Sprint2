const ctx = document.getElementById('myChart1');
      
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
            datasets: [
            {
                label: 'Temperatura',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [30, 29, 28, 25, 22, 23],
                borderWidth: 2
            },

            {
                label: 'Umidade',
                backgroundColor: 'rgb(10, 90, 160)',
                borderColor: 'rgb(10, 90, 160)',
                data: [80, 82, 80, 85, 80, 83],
                borderWidth: 1
            }],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

        const ctxx = document.getElementById('myChart2');
  
        new Chart(ctxx, {
          type: 'bar',
          data: {
            labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',],
            datasets: [
                {
                    label: 'Temperatura Média',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 88, 132)',
                    data: [22, 24, 27, 23, 20, 18],
                    borderWidth: 1
                },
    
                {
                    label: 'Umidade Média',
                    backgroundColor: 'rgb(10, 90, 160)',
                    borderColor: 'rgb(10, 90, 160)',
                    data: [90, 89, 93, 87, 88, 82],
                    borderWidth: 1
                }],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

        const myChart = new Chart(
            document.getElementById("myChart1"),
            config
        );

        const myChart2 = new Chart(
            document.getElementById("myChart2"),
            config
        );