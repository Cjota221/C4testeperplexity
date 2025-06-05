C4App.modules.sales = {
  salesList: [],

  async init() {
    await this.loadSales();
    this.render();
  },

  async loadSales() {
    const response = await C4App.database.read('sales', { user_id: C4App.auth.user.id });
    if (response.success) {
      this.salesList = response.data;
    } else {
      this.salesList = [];
    }
  },

  render() {
    const container = document.querySelector('#sales-page .grid-container');
    container.innerHTML = '';

    this.salesList.forEach(sale => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="card-header">Venda: ${sale.id}</div>
        <div class="card-content">
          <p>Total: R$ ${sale.total_amount.toFixed(2)}</p>
          <p>Forma de pagamento: ${sale.payment_method}</p>
          <p>Desconto: R$ ${sale.discount.toFixed(2)}</p>
          <p>Custo de envio: R$ ${sale.shipping_cost.toFixed(2)}</p>
          <p>Notas: ${sale.notes || '-'}</p>
        </div>
      `;
      container.appendChild(card);
    });
  }
};
