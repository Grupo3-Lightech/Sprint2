var menuItem = document.querySelectorAll('.item-menu');
var expandirList = document.querySelector('#expandir-list');
var menuSite = document.querySelector('.menu-lateral');

function selectLink() {
    menuItem.forEach((item) => 
        item.classList.remove('ativo')
    );
    this.classList.add('ativo');
}

menuItem.forEach((item) => 
    item.addEventListener('click', selectLink)
);

// EXPANDIR o menu list

expandirList.addEventListener('click', function(){
    menuSite.classList.toggle('expandir');
    // expandirList.classList.toggle('expandir');
})



/**
 * 
 * <script>
  const ctx = document.getElementById("myChart");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:59"],
      datasets: [
        {
          label: "Luminosidade por Hora em Lux",
          data: [400, 400, 400, 400, 450, 600, 600, 700, 700, 750, 850, 1020, 1030, 1050, 1000, 950, 900, 800, 700, 600, 550, 450, 400],
          borderWidth: 1,
          backgroundColor: "RGB(45, 156, 219)",
          borderColor: "RGB(45, 156, 219)",
        },
        {
          label: "Mínimo de lux por Hora",
          data: [500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500],
          borderWidth: 1,
          backgroundColor: "#FF2D19",
          borderColor: "#FF2D19",
        },
        {
          label: "Maxímo de lux por Hora",
          data: [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
          borderWidth: 1,
          fill: false,
          backgroundColor: "#FF2D19",
          borderColor: "#FF2D19",
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  const ctx2 = document.getElementById("myChart2");

  new Chart(ctx2, {
    type: "bar",
    data: {
      labels: ["Verão", "Outono", "Inverno", "Primavera"],
      datasets: [
        {
          label: "Luminosidade por Hora em Lux",
          data: [770, 850, 800, 867],
          borderWidth: 1,
          backgroundColor: "#33F076",
          borderColor: "#00A41A",

        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  const ctx3 = document.getElementById('myChart3');
  new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro" ,"dezembro"],
      datasets: [{
        label: 'lux mensal',
        data: [560,750,900,800,900,850,900,950,700,900,950,990],
        borderWidth: 1,
        backgroundColor: "#268FA6",
        borderColor: "#268FA6"
      }]
    },

    options: {
      indexAxis: 'y',
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

</script>
 */

