// assets/js/chart.js
C4App.chart = {
  renderBarChart(containerId, labels, data, label) {
    const ctx = document.getElementById(containerId).getContext('2d');
    if (window.myChart) window.myChart.destroy();
    window.myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label,
          data,
          backgroundColor: '#ec4899'
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });
  }
};
