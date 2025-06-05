C4App.modules.products = {
  productsList: [],

  async init() {
    await this.loadProducts();
    this.render();
  },

  async loadProducts() {
    const response = await C4App.database.read('products', { user_id: C4App.auth.user.id });
    if (response.success) {
      this.productsList = response.data;
    } else {
      this.productsList = [];
    }
  },

  render() {
    const container = document.querySelector('#products-page .grid-container');
    container.innerHTML = '';

    this.productsList.forEach(product => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="card-header">${product.name}</div>
        <div class="card-content">
          <p>Preço custo: R$ ${product.cost_price.toFixed(2)}</p>
          <p>Preço venda: R$ ${product.sale_price.toFixed(2)}</p>
          <p>Categoria: ${product.category}</p>
          <p>Estoque: ${product.stock_quantity}</p>
        </div>
      `;
      container.appendChild(card);
    });
  }
};
