// assets/js/modules/reports.js
C4App.modules.reports = {
  async init() {
    await this.render();
  },
  async render() {
    const container = document.querySelector('#reports-page .grid-container');
    container.innerHTML = `
      <canvas id="salesChart" width="300" height="200"></canvas>
      <div id="report-summary"></div>
    `;
    // Buscar dados de vendas
    const resp = await C4App.database.read('sales', { user_id: C4App.auth.user.id });
    if (!resp.success) return;
    // Agrupar vendas por mês
    const months = Array(12).fill(0).map((_,i)=>`${i+1}`.padStart(2,'0'));
    const salesByMonth = months.map(m => (
      resp.data.filter(sale => new Date(sale.created_at).getMonth()+1 === Number(m))
        .reduce((sum, sale) => sum + Number(sale.total_amount), 0)
    ));
    C4App.chart.renderBarChart('salesChart', months, salesByMonth, 'Vendas por mês');
    // Resumo
    document.getElementById('report-summary').innerHTML = `
      <p>Total vendido: R$ ${salesByMonth.reduce((a,b)=>a+b,0).toFixed(2)}</p>
    `;
  }
};
